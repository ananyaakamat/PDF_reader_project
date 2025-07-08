# PDF Reader MCP Server

A Model Context Protocol (MCP) server that provides PDF processing capabilities for AI assistants. This server allows you to extract text content and metadata from PDF files through a standardized interface.

## 🚀 Features

- **PDF Text Extraction**: Extract full text content from PDF files
- **PDF Metadata Extraction**: Get document properties, author, title, creation date, page count, and more
- **Robust Error Handling**: Comprehensive error handling with detailed error messages
- **Security**: Input validation and file path sanitization to prevent security issues
- **Type Safety**: Full TypeScript implementation with proper type definitions

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ananyaakamat/PDF_reader_project.git
   cd PDF_reader_project/MCP_Servers/pdf_reader
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Build the project**:
   ```bash
   npm run build
   ```

## 🛠️ Usage

### Running the Server

To start the MCP server:

```bash
npm start
```

Or run directly with Node.js:

```bash
node index.js
```

### Configuration in Claude Desktop

Add the following configuration to your Claude Desktop MCP settings:

```json
{
  "mcp": {
    "servers": {
      "pdf-reader": {
        "command": "node",
        "args": [
          "path/to/your/PDF_reader_project/MCP_Servers/pdf_reader/index.js"
        ]
      }
    }
  }
}
```

Replace `path/to/your/` with the actual path to your project directory.

## 🔧 Available Tools

### 1. extract_pdf_text

Extracts all text content from a PDF file.

**Parameters:**

- `filePath` (string): Path to the PDF file

**Example:**

```json
{
  "name": "extract_pdf_text",
  "arguments": {
    "filePath": "./documents/sample.pdf"
  }
}
```

**Response:**

```json
{
  "success": true,
  "filePath": "./documents/sample.pdf",
  "text": "Extracted text content...",
  "pageCount": 5,
  "extractedAt": "2025-07-08T10:30:00.000Z"
}
```

### 2. extract_pdf_metadata

Extracts metadata and document properties from a PDF file.

**Parameters:**

- `filePath` (string): Path to the PDF file

**Example:**

```json
{
  "name": "extract_pdf_metadata",
  "arguments": {
    "filePath": "./documents/sample.pdf"
  }
}
```

**Response:**

```json
{
  "success": true,
  "filePath": "./documents/sample.pdf",
  "metadata": {
    "pageCount": 5,
    "pdfVersion": "1.4",
    "hasAcroForm": false,
    "hasXFA": false,
    "title": "Sample Document",
    "author": "John Doe",
    "subject": "Example PDF",
    "keywords": "sample, test, pdf",
    "creator": "Microsoft Word",
    "producer": "PDF Creator",
    "creationDate": "2025-01-01T00:00:00.000Z",
    "modificationDate": "2025-07-08T10:00:00.000Z"
  },
  "extractedAt": "2025-07-08T10:30:00.000Z"
}
```

## 🛡️ Security Features

- **Path Validation**: Prevents directory traversal attacks
- **File Extension Validation**: Only accepts `.pdf` files
- **Access Control**: Checks file permissions before processing
- **Input Sanitization**: Validates all input parameters using Zod schemas

## 🏗️ Project Structure

```
PDF_reader_project/
├── MCP_Servers/
│   └── pdf_reader/
│       ├── src/
│       │   └── server.ts          # Main server implementation
│       ├── index.js               # Compiled JavaScript output
│       ├── package.json           # Dependencies and scripts
│       ├── tsconfig.json          # TypeScript configuration
│       └── node_modules/          # Dependencies
├── docs/                          # Documentation
│   ├── setup-guide.md
│   ├── python-best-practices.md
│   └── ...
└── README.md                      # This file
```

## 🔧 Development

### Building from Source

1. **Install TypeScript globally** (if not already installed):

   ```bash
   npm install -g typescript
   ```

2. **Compile TypeScript**:

   ```bash
   npm run build
   ```

3. **Run in development mode**:
   ```bash
   npm run dev
   ```

### Available Scripts

- `npm run build`: Compile TypeScript to JavaScript
- `npm start`: Start the MCP server
- `npm run dev`: Run in development mode with auto-restart

## 📚 Dependencies

### Production Dependencies

- `@modelcontextprotocol/sdk`: MCP SDK for server implementation
- `pdf-parse`: PDF parsing library
- `zod`: Runtime type validation

### Development Dependencies

- `typescript`: TypeScript compiler
- `@types/node`: Node.js type definitions

## 🐛 Troubleshooting

### Common Issues

1. **"File not found" error**:

   - Ensure the PDF file exists at the specified path
   - Check file permissions
   - Use absolute paths when in doubt

2. **"Permission denied" error**:

   - Verify read permissions for the PDF file
   - Check if the file is open in another application

3. **"Invalid file path" error**:
   - Ensure the file has a `.pdf` extension
   - Check for directory traversal attempts in the path

### Error Codes

- `InvalidParams`: Invalid input parameters or file issues
- `InternalError`: Server-side processing errors
- `MethodNotFound`: Unknown tool requested

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -am 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Model Context Protocol](https://modelcontextprotocol.io/) for the MCP specification
- [pdf-parse](https://www.npmjs.com/package/pdf-parse) for PDF processing capabilities
- [Zod](https://zod.dev/) for runtime type validation

## 📞 Support

If you encounter any issues or have questions:

1. Check the [troubleshooting section](#troubleshooting)
2. Review the [documentation](./docs/)
3. Open an issue on GitHub

---

Made with ❤️ for the MCP community
