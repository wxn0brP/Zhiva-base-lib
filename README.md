# Zhiva Base-Lib

This module provides the foundational components for building Zhiva applications.

## Role in the Zhiva Project

`base-lib` is a core TypeScript library that simplifies the process of creating the web-based part of a Zhiva application. It provides a pre-configured web server and helper functions to interact with the `native` host. It is the primary dependency for any web application intended to run within the Zhiva framework.

## Primary Responsibilities

-   **Web Server**: Offers a lightweight web server framework (`FalconFrame`) for serving the application's UI and handling API requests.
-   **Window Management**: Provides simple functions (`oneWindow`, `openWindow`) to create and manage application windows by communicating with the native `zhiva` executable.
-   **System Notifications**: Includes a cross-platform function (`showNotification`) for displaying desktop notifications.
-   **Application Lifecycle**: Helps manage the application's startup and shutdown, for example by automatically closing the application when the main window is closed.

## Technology

-   **TypeScript**: The library is written in TypeScript.
-   **FalconFrame**: A custom web server framework used for the backend.

## Vision

The goal for `base-lib` is to provide a minimal but powerful toolkit for Zhiva application development. Future development will focus on creating a simple and stable API for common desktop application needs, while keeping the library lightweight.