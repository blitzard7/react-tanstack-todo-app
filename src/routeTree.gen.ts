/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as TodosNewImport } from './routes/todos/new'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const TodosNewRoute = TodosNewImport.update({
  id: '/todos/new',
  path: '/todos/new',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/todos/new': {
      id: '/todos/new'
      path: '/todos/new'
      fullPath: '/todos/new'
      preLoaderRoute: typeof TodosNewImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/todos/new': typeof TodosNewRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/todos/new': typeof TodosNewRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/todos/new': typeof TodosNewRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/todos/new'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/todos/new'
  id: '__root__' | '/' | '/todos/new'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  TodosNewRoute: typeof TodosNewRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  TodosNewRoute: TodosNewRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/todos/new"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/todos/new": {
      "filePath": "todos/new.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
