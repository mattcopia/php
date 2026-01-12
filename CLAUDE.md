# CLAUDE.md

This file provides guidance to Claude Code when working with this codebase.

## Project Overview

This is a Rust project.

## Common Commands

```bash
# Build the project
cargo build

# Build in release mode
cargo build --release

# Run tests
cargo test

# Run the project
cargo run

# Check for errors without building
cargo check

# Format code
cargo fmt

# Run linter
cargo clippy
```

## Code Style

- Follow standard Rust conventions and idioms
- Use `cargo fmt` to format code before committing
- Address `cargo clippy` warnings
- Write tests for new functionality
- Use meaningful variable and function names
- Prefer explicit error handling over `.unwrap()` in production code
