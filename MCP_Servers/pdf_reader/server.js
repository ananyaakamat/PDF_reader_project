#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ErrorCode, ListToolsRequestSchema, McpError, } from "@modelcontextprotocol/sdk/types.js";
import fs from "fs/promises";
import path from "path";
import { z } from "zod";
// Import pdf-parse with proper typing
const pdfParse = require("pdf-parse");
// Define Zod schemas for input validation
const ExtractTextSchema = z.object({
    filePath: z.string().min(1, "File path is required"),
});
const ExtractMetadataSchema = z.object({
    filePath: z.string().min(1, "File path is required"),
});
class PDFReaderServer {
    server;
    constructor() {
        this.server = new Server({
            name: "pdf-reader",
            version: "1.0.0",
        }, {
            capabilities: {
                tools: {},
            },
        });
        this.setupToolHandlers();
        // Error handling
        this.server.onerror = (error) => console.error("[MCP Error]", error);
        process.on("SIGINT", async () => {
            await this.server.close();
            process.exit(0);
        });
    }
    setupToolHandlers() {
        // List available tools
        this.server.setRequestHandler(ListToolsRequestSchema, async () => {
            return {
                tools: [
                    {
                        name: "extract_pdf_text",
                        description: "Extract text content from a PDF file",
                        inputSchema: {
                            type: "object",
                            properties: {
                                filePath: {
                                    type: "string",
                                    description: "Path to the PDF file to extract text from",
                                },
                            },
                            required: ["filePath"],
                        },
                    },
                    {
                        name: "extract_pdf_metadata",
                        description: "Extract metadata information from a PDF file",
                        inputSchema: {
                            type: "object",
                            properties: {
                                filePath: {
                                    type: "string",
                                    description: "Path to the PDF file to extract metadata from",
                                },
                            },
                            required: ["filePath"],
                        },
                    },
                ],
            };
        });
        // Handle tool calls
        this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
            const { name, arguments: args } = request.params;
            try {
                switch (name) {
                    case "extract_pdf_text":
                        return await this.extractPDFText(args);
                    case "extract_pdf_metadata":
                        return await this.extractPDFMetadata(args);
                    default:
                        throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
                }
            }
            catch (error) {
                if (error instanceof McpError) {
                    throw error;
                }
                const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
                throw new McpError(ErrorCode.InternalError, `Error executing tool ${name}: ${errorMessage}`);
            }
        });
    }
    async extractPDFText(args) {
        const parsed = ExtractTextSchema.safeParse(args);
        if (!parsed.success) {
            throw new McpError(ErrorCode.InvalidParams, `Invalid parameters: ${parsed.error.message}`);
        }
        const { filePath } = parsed.data;
        try {
            // Validate file path and prevent directory traversal
            const normalizedPath = path.resolve(filePath);
            if (!normalizedPath.startsWith(path.resolve(".")) &&
                !path.isAbsolute(filePath)) {
                throw new McpError(ErrorCode.InvalidParams, "Invalid file path");
            }
            // Check if file exists and is accessible
            await fs.access(normalizedPath, fs.constants.F_OK | fs.constants.R_OK);
            // Check if file has PDF extension
            if (!normalizedPath.toLowerCase().endsWith(".pdf")) {
                throw new McpError(ErrorCode.InvalidParams, "File must have a .pdf extension");
            }
            // Read and parse PDF
            const dataBuffer = await fs.readFile(normalizedPath);
            const data = await pdfParse(dataBuffer);
            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify({
                            success: true,
                            filePath: filePath,
                            text: data.text,
                            pageCount: data.numpages,
                            extractedAt: new Date().toISOString(),
                        }, null, 2),
                    },
                ],
            };
        }
        catch (error) {
            if (error instanceof McpError) {
                throw error;
            }
            if (error instanceof Error) {
                if (error.message.includes("ENOENT")) {
                    throw new McpError(ErrorCode.InvalidParams, `File not found: ${filePath}`);
                }
                if (error.message.includes("EACCES")) {
                    throw new McpError(ErrorCode.InvalidParams, `Permission denied: ${filePath}`);
                }
            }
            throw new McpError(ErrorCode.InternalError, `Failed to extract text from PDF: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
    }
    async extractPDFMetadata(args) {
        const parsed = ExtractMetadataSchema.safeParse(args);
        if (!parsed.success) {
            throw new McpError(ErrorCode.InvalidParams, `Invalid parameters: ${parsed.error.message}`);
        }
        const { filePath } = parsed.data;
        try {
            // Validate file path and prevent directory traversal
            const normalizedPath = path.resolve(filePath);
            if (!normalizedPath.startsWith(path.resolve(".")) &&
                !path.isAbsolute(filePath)) {
                throw new McpError(ErrorCode.InvalidParams, "Invalid file path");
            }
            // Check if file exists and is accessible
            await fs.access(normalizedPath, fs.constants.F_OK | fs.constants.R_OK);
            // Check if file has PDF extension
            if (!normalizedPath.toLowerCase().endsWith(".pdf")) {
                throw new McpError(ErrorCode.InvalidParams, "File must have a .pdf extension");
            }
            // Read and parse PDF
            const dataBuffer = await fs.readFile(normalizedPath);
            const data = await pdfParse(dataBuffer);
            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify({
                            success: true,
                            filePath: filePath,
                            metadata: {
                                pageCount: data.numpages,
                                pdfVersion: data.info.PDFFormatVersion,
                                hasAcroForm: data.info.IsAcroFormPresent,
                                hasXFA: data.info.IsXFAPresent,
                                title: data.info.Title || null,
                                author: data.info.Author || null,
                                subject: data.info.Subject || null,
                                keywords: data.info.Keywords || null,
                                creator: data.info.Creator || null,
                                producer: data.info.Producer || null,
                                creationDate: data.info.CreationDate?.toISOString() || null,
                                modificationDate: data.info.ModDate?.toISOString() || null,
                            },
                            extractedAt: new Date().toISOString(),
                        }, null, 2),
                    },
                ],
            };
        }
        catch (error) {
            if (error instanceof McpError) {
                throw error;
            }
            if (error instanceof Error) {
                if (error.message.includes("ENOENT")) {
                    throw new McpError(ErrorCode.InvalidParams, `File not found: ${filePath}`);
                }
                if (error.message.includes("EACCES")) {
                    throw new McpError(ErrorCode.InvalidParams, `Permission denied: ${filePath}`);
                }
            }
            throw new McpError(ErrorCode.InternalError, `Failed to extract metadata from PDF: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
    }
    async run() {
        const transport = new StdioServerTransport();
        await this.server.connect(transport);
        console.error("PDF Reader MCP server running on stdio");
    }
}
// Start the server
const server = new PDFReaderServer();
server.run().catch(console.error);
//# sourceMappingURL=server.js.map