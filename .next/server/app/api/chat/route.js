/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/chat/route";
exports.ids = ["app/api/chat/route"];
exports.modules = {

/***/ "(rsc)/./app/api/chat/route.ts":
/*!*******************************!*\
  !*** ./app/api/chat/route.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\n// REMOVE all mock/contextual video analysis logic and forward all chat requests to the Ollama backend\nasync function POST(req) {\n    try {\n        // Check if this is a video upload (multipart/form-data)\n        const contentType = req.headers.get(\"content-type\") || \"\";\n        if (contentType.includes(\"multipart/form-data\")) {\n            // Forward the form-data to the Ollama video backend\n            const formData = await req.formData();\n            const video = formData.get(\"video\");\n            const prompt = formData.get(\"prompt\") || \"Describe this video.\";\n            const backendForm = new FormData();\n            if (video && typeof video !== \"string\") backendForm.append(\"video\", video);\n            if (prompt) backendForm.append(\"prompt\", prompt);\n            const response = await fetch(\"http://localhost:3001/generate-video\", {\n                method: \"POST\",\n                body: backendForm\n            });\n            const data = await response.json();\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(data);\n        } else {\n            // Text prompt (JSON)\n            const { message } = await req.json();\n            const response = await fetch(\"http://localhost:3001/generate\", {\n                method: \"POST\",\n                headers: {\n                    \"Content-Type\": \"application/json\"\n                },\n                body: JSON.stringify({\n                    prompt: message\n                })\n            });\n            const data = await response.json();\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(data);\n        }\n    } catch (error) {\n        console.error(error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to connect to Ollama backend\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2NoYXQvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBMEM7QUFFMUMsc0dBQXNHO0FBQy9GLGVBQWVDLEtBQUtDLEdBQVk7SUFDckMsSUFBSTtRQUNGLHdEQUF3RDtRQUN4RCxNQUFNQyxjQUFjRCxJQUFJRSxPQUFPLENBQUNDLEdBQUcsQ0FBQyxtQkFBbUI7UUFDdkQsSUFBSUYsWUFBWUcsUUFBUSxDQUFDLHdCQUF3QjtZQUMvQyxvREFBb0Q7WUFDcEQsTUFBTUMsV0FBVyxNQUFNTCxJQUFJSyxRQUFRO1lBQ25DLE1BQU1DLFFBQVFELFNBQVNGLEdBQUcsQ0FBQztZQUMzQixNQUFNSSxTQUFTRixTQUFTRixHQUFHLENBQUMsYUFBYTtZQUN6QyxNQUFNSyxjQUFjLElBQUlDO1lBQ3hCLElBQUlILFNBQVMsT0FBT0EsVUFBVSxVQUFVRSxZQUFZRSxNQUFNLENBQUMsU0FBU0o7WUFDcEUsSUFBSUMsUUFBUUMsWUFBWUUsTUFBTSxDQUFDLFVBQVVIO1lBQ3pDLE1BQU1JLFdBQVcsTUFBTUMsTUFBTSx3Q0FBd0M7Z0JBQ25FQyxRQUFRO2dCQUNSQyxNQUFNTjtZQUNSO1lBQ0EsTUFBTU8sT0FBTyxNQUFNSixTQUFTSyxJQUFJO1lBQ2hDLE9BQU9sQixxREFBWUEsQ0FBQ2tCLElBQUksQ0FBQ0Q7UUFDM0IsT0FBTztZQUNMLHFCQUFxQjtZQUNyQixNQUFNLEVBQUVFLE9BQU8sRUFBRSxHQUFHLE1BQU1qQixJQUFJZ0IsSUFBSTtZQUNsQyxNQUFNTCxXQUFXLE1BQU1DLE1BQU0sa0NBQWtDO2dCQUM3REMsUUFBUTtnQkFDUlgsU0FBUztvQkFBRSxnQkFBZ0I7Z0JBQW1CO2dCQUM5Q1ksTUFBTUksS0FBS0MsU0FBUyxDQUFDO29CQUFFWixRQUFRVTtnQkFBUTtZQUN6QztZQUNBLE1BQU1GLE9BQU8sTUFBTUosU0FBU0ssSUFBSTtZQUNoQyxPQUFPbEIscURBQVlBLENBQUNrQixJQUFJLENBQUNEO1FBQzNCO0lBQ0YsRUFBRSxPQUFPSyxPQUFPO1FBQ2RDLFFBQVFELEtBQUssQ0FBQ0E7UUFDZCxPQUFPdEIscURBQVlBLENBQUNrQixJQUFJLENBQUM7WUFBRUksT0FBTztRQUFzQyxHQUFHO1lBQUVFLFFBQVE7UUFBSTtJQUMzRjtBQUNGIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXERISVJBSlxcRGVza3RvcFxccmlkaGltYSB2aXNpb24gY2hhdFxcdjAgdmlzaW9uIGNoYXRcXGFwcFxcYXBpXFxjaGF0XFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIlxuXG4vLyBSRU1PVkUgYWxsIG1vY2svY29udGV4dHVhbCB2aWRlbyBhbmFseXNpcyBsb2dpYyBhbmQgZm9yd2FyZCBhbGwgY2hhdCByZXF1ZXN0cyB0byB0aGUgT2xsYW1hIGJhY2tlbmRcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcTogUmVxdWVzdCkge1xuICB0cnkge1xuICAgIC8vIENoZWNrIGlmIHRoaXMgaXMgYSB2aWRlbyB1cGxvYWQgKG11bHRpcGFydC9mb3JtLWRhdGEpXG4gICAgY29uc3QgY29udGVudFR5cGUgPSByZXEuaGVhZGVycy5nZXQoXCJjb250ZW50LXR5cGVcIikgfHwgXCJcIlxuICAgIGlmIChjb250ZW50VHlwZS5pbmNsdWRlcyhcIm11bHRpcGFydC9mb3JtLWRhdGFcIikpIHtcbiAgICAgIC8vIEZvcndhcmQgdGhlIGZvcm0tZGF0YSB0byB0aGUgT2xsYW1hIHZpZGVvIGJhY2tlbmRcbiAgICAgIGNvbnN0IGZvcm1EYXRhID0gYXdhaXQgcmVxLmZvcm1EYXRhKClcbiAgICAgIGNvbnN0IHZpZGVvID0gZm9ybURhdGEuZ2V0KFwidmlkZW9cIilcbiAgICAgIGNvbnN0IHByb21wdCA9IGZvcm1EYXRhLmdldChcInByb21wdFwiKSB8fCBcIkRlc2NyaWJlIHRoaXMgdmlkZW8uXCJcbiAgICAgIGNvbnN0IGJhY2tlbmRGb3JtID0gbmV3IEZvcm1EYXRhKClcbiAgICAgIGlmICh2aWRlbyAmJiB0eXBlb2YgdmlkZW8gIT09IFwic3RyaW5nXCIpIGJhY2tlbmRGb3JtLmFwcGVuZChcInZpZGVvXCIsIHZpZGVvIGFzIEJsb2IpXG4gICAgICBpZiAocHJvbXB0KSBiYWNrZW5kRm9ybS5hcHBlbmQoXCJwcm9tcHRcIiwgcHJvbXB0IGFzIHN0cmluZylcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjMwMDEvZ2VuZXJhdGUtdmlkZW9cIiwge1xuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBib2R5OiBiYWNrZW5kRm9ybSxcbiAgICAgIH0pXG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oZGF0YSlcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVGV4dCBwcm9tcHQgKEpTT04pXG4gICAgICBjb25zdCB7IG1lc3NhZ2UgfSA9IGF3YWl0IHJlcS5qc29uKClcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjMwMDEvZ2VuZXJhdGVcIiwge1xuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgcHJvbXB0OiBtZXNzYWdlIH0pLFxuICAgICAgfSlcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihkYXRhKVxuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKVxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIkZhaWxlZCB0byBjb25uZWN0IHRvIE9sbGFtYSBiYWNrZW5kXCIgfSwgeyBzdGF0dXM6IDUwMCB9KVxuICB9XG59XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiUE9TVCIsInJlcSIsImNvbnRlbnRUeXBlIiwiaGVhZGVycyIsImdldCIsImluY2x1ZGVzIiwiZm9ybURhdGEiLCJ2aWRlbyIsInByb21wdCIsImJhY2tlbmRGb3JtIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJyZXNwb25zZSIsImZldGNoIiwibWV0aG9kIiwiYm9keSIsImRhdGEiLCJqc29uIiwibWVzc2FnZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJlcnJvciIsImNvbnNvbGUiLCJzdGF0dXMiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/chat/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Froute&page=%2Fapi%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Froute.ts&appDir=C%3A%5CUsers%5CDHIRAJ%5CDesktop%5Cridhima%20vision%20chat%5Cv0%20vision%20chat%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CDHIRAJ%5CDesktop%5Cridhima%20vision%20chat%5Cv0%20vision%20chat&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Froute&page=%2Fapi%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Froute.ts&appDir=C%3A%5CUsers%5CDHIRAJ%5CDesktop%5Cridhima%20vision%20chat%5Cv0%20vision%20chat%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CDHIRAJ%5CDesktop%5Cridhima%20vision%20chat%5Cv0%20vision%20chat&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_DHIRAJ_Desktop_ridhima_vision_chat_v0_vision_chat_app_api_chat_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/chat/route.ts */ \"(rsc)/./app/api/chat/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/chat/route\",\n        pathname: \"/api/chat\",\n        filename: \"route\",\n        bundlePath: \"app/api/chat/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\DHIRAJ\\\\Desktop\\\\ridhima vision chat\\\\v0 vision chat\\\\app\\\\api\\\\chat\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_DHIRAJ_Desktop_ridhima_vision_chat_v0_vision_chat_app_api_chat_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZjaGF0JTJGcm91dGUmcGFnZT0lMkZhcGklMkZjaGF0JTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGY2hhdCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNESElSQUolNUNEZXNrdG9wJTVDcmlkaGltYSUyMHZpc2lvbiUyMGNoYXQlNUN2MCUyMHZpc2lvbiUyMGNoYXQlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q0RISVJBSiU1Q0Rlc2t0b3AlNUNyaWRoaW1hJTIwdmlzaW9uJTIwY2hhdCU1Q3YwJTIwdmlzaW9uJTIwY2hhdCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDeUM7QUFDdEg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXERISVJBSlxcXFxEZXNrdG9wXFxcXHJpZGhpbWEgdmlzaW9uIGNoYXRcXFxcdjAgdmlzaW9uIGNoYXRcXFxcYXBwXFxcXGFwaVxcXFxjaGF0XFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9jaGF0L3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvY2hhdFwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvY2hhdC9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXERISVJBSlxcXFxEZXNrdG9wXFxcXHJpZGhpbWEgdmlzaW9uIGNoYXRcXFxcdjAgdmlzaW9uIGNoYXRcXFxcYXBwXFxcXGFwaVxcXFxjaGF0XFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Froute&page=%2Fapi%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Froute.ts&appDir=C%3A%5CUsers%5CDHIRAJ%5CDesktop%5Cridhima%20vision%20chat%5Cv0%20vision%20chat%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CDHIRAJ%5CDesktop%5Cridhima%20vision%20chat%5Cv0%20vision%20chat&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Froute&page=%2Fapi%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Froute.ts&appDir=C%3A%5CUsers%5CDHIRAJ%5CDesktop%5Cridhima%20vision%20chat%5Cv0%20vision%20chat%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CDHIRAJ%5CDesktop%5Cridhima%20vision%20chat%5Cv0%20vision%20chat&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();