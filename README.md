# PDF Reader MCP Server

A Model Context Protocol (MCP) server that provides PDF processing capabilities for AI assistants. This server allows you to extract text content and metadata from PDF files through a standardized interface.

## 🚀 Features

- **PDF Text Extraction**: Extract full text content from PDF files
- **PDF Metadata Extraction**: Get document properties, author, title, creation date, page count, and more
- **Robust Error Handling**: Comprehensive error handling with detailed error messages
- **Security**: Input validation and file path sanitization to prevent security issues
- **Type Safety**: Full TypeScript implementation with proper type definitions

## � Installation

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
          "path/to/PDF_reader_project/MCP_Servers/pdf_reader/index.js"
        ]
      }
    }
  }
}
```

Replace `path/to/` with the actual path to your project directory.

### Example Configuration (Windows)
```json
{
  "mcp": {
    "servers": {
      "pdf-reader": {
        "command": "node",
        "args": [
          "d:\\Anant\\VSCodeProjects\\PDF_reader_project\\MCP_Servers\\pdf_reader\\index.js"
        ]
      }
    }
  }
}
```

## 🔧 Usage

### Available Tools

#### 1. Extract PDF Text
Extracts the full text content from a PDF file.

**Parameters:**
- `filePath` (string): Path to the PDF file to extract text from

**Example:**
```
Extract text from: /path/to/document.pdf
```

#### 2. Extract PDF Metadata
Extracts metadata and document properties from a PDF file.

**Parameters:**
- `filePath` (string): Path to the PDF file to extract metadata from

**Returns:**
- Title
- Author
- Subject
- Creator
- Producer
- Creation Date
- Modification Date
- Page Count
- PDF Version

**Example:**
```
Extract metadata from: /path/to/document.pdf
```

## 🏗️ Project Structure

```
PDF_reader_project/
├── MCP_Servers/
│   └── pdf_reader/
│       ├── src/
│       │   └── server.ts          # Main server implementation
│       ├── package.json           # Dependencies and scripts
│       ├── tsconfig.json          # TypeScript configuration
│       └── index.js              # Compiled output (entry point)
├── docs/                         # Comprehensive documentation
│   ├── setup-guide.md
│   ├── python-best-practices.md
│   ├── html-js-css-best-practices.md
│   ├── playwright-testing-best-practices.md
│   ├── unit-testing-best-practices.md
│   ├── mcp-server-security-evaluator-best-practices.md
│   ├── prd-best-practices.md
│   └── commit-style.md
└── README.md                    # This file
```

## 🔧 Development

### Building the Project
```bash
npm run build
```

### Running in Development Mode
```bash
npm start
```

### Dependencies

**Core Dependencies:**
- `@modelcontextprotocol/sdk`: MCP protocol implementation
- `pdf-parse`: PDF parsing and text extraction
- `zod`: Runtime type validation
- `express`: Web server framework

**Development Dependencies:**
- `typescript`: TypeScript compiler
- `@types/node`: Node.js type definitions

## 📚 Documentation

The `docs/` folder contains comprehensive guides for:
- Project setup and configuration
- Best practices for various technologies
- Testing strategies and implementation
- Security guidelines
- Product requirement documentation
- Commit style standards

## 🔒 Security Features

- **Input Validation**: All file paths are validated using Zod schemas
- **Path Sanitization**: Prevents directory traversal attacks
- **Error Handling**: Comprehensive error handling without exposing sensitive information
- **Type Safety**: TypeScript ensures type safety throughout the application

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Model Context Protocol](https://github.com/modelcontextprotocol) for the MCP SDK
- [pdf-parse](https://github.com/modesty/pdf-parse) for PDF processing capabilities
- [Zod](https://github.com/colinhacks/zod) for runtime type validation

## 📞 Support

If you encounter any issues or have questions:
1. Check the documentation in the `docs/` folder
2. Create an issue in the GitHub repository
3. Refer to the MCP documentation for protocol-specific questions

## 🎯 Roadmap

- [ ] Add support for password-protected PDFs
- [ ] Implement OCR for scanned PDFs
- [ ] Add batch processing capabilities
- [ ] Support for additional document formats
- [ ] Enhanced metadata extraction features

---

**Created with ❤️ for the MCP ecosystem**
