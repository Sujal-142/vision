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
exports.id = "app/api/llama/route";
exports.ids = ["app/api/llama/route"];
exports.modules = {

/***/ "(rsc)/./app/api/llama/route.ts":
/*!********************************!*\
  !*** ./app/api/llama/route.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\nasync function POST(req) {\n    try {\n        // Check if this is a video upload (multipart/form-data)\n        const contentType = req.headers.get('content-type') || '';\n        if (contentType.includes('multipart/form-data')) {\n            // Forward the form-data to the Python FastAPI backend\n            const formData = await req.formData();\n            const video = formData.get('video');\n            const prompt = formData.get('prompt') || 'Describe this video.';\n            if (!video || typeof video === 'string') {\n                // No video file present\n                return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                    error: 'No video file provided.'\n                }, {\n                    status: 400\n                });\n            }\n            const backendForm = new FormData();\n            backendForm.append('video', video);\n            if (prompt) backendForm.append('prompt', prompt);\n            const response = await fetch('http://localhost:8000/analyze-video', {\n                method: 'POST',\n                body: backendForm\n            });\n            let data;\n            if (!response.ok) {\n                // Try to parse error details from backend\n                let errorText = await response.text();\n                try {\n                    data = JSON.parse(errorText);\n                } catch  {\n                    data = {\n                        error: errorText || 'Unknown error from backend'\n                    };\n                }\n                console.error('FastAPI backend error:', data.error, 'Status:', response.status);\n                return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                    error: data.error || 'Failed to process video',\n                    status: response.status\n                }, {\n                    status: response.status\n                });\n            }\n            data = await response.json();\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(data);\n        } else {\n            // Text prompt (JSON)\n            const { message } = await req.json();\n            // Optionally, you can still use Ollama for text\n            const response = await fetch('http://localhost:3001/generate', {\n                method: 'POST',\n                headers: {\n                    'Content-Type': 'application/json'\n                },\n                body: JSON.stringify({\n                    prompt: message\n                })\n            });\n            const data = await response.json();\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(data);\n        }\n    } catch (error) {\n        console.error('API route error:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: error?.message || 'Failed to connect to backend'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2xsYW1hL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQTJDO0FBRXBDLGVBQWVDLEtBQUtDLEdBQVk7SUFDckMsSUFBSTtRQUNGLHdEQUF3RDtRQUN4RCxNQUFNQyxjQUFjRCxJQUFJRSxPQUFPLENBQUNDLEdBQUcsQ0FBQyxtQkFBbUI7UUFDdkQsSUFBSUYsWUFBWUcsUUFBUSxDQUFDLHdCQUF3QjtZQUMvQyxzREFBc0Q7WUFDdEQsTUFBTUMsV0FBVyxNQUFNTCxJQUFJSyxRQUFRO1lBQ25DLE1BQU1DLFFBQVFELFNBQVNGLEdBQUcsQ0FBQztZQUMzQixNQUFNSSxTQUFTRixTQUFTRixHQUFHLENBQUMsYUFBYTtZQUN6QyxJQUFJLENBQUNHLFNBQVMsT0FBT0EsVUFBVSxVQUFVO2dCQUN2Qyx3QkFBd0I7Z0JBQ3hCLE9BQU9SLHFEQUFZQSxDQUFDVSxJQUFJLENBQUM7b0JBQUVDLE9BQU87Z0JBQTBCLEdBQUc7b0JBQUVDLFFBQVE7Z0JBQUk7WUFDL0U7WUFDQSxNQUFNQyxjQUFjLElBQUlDO1lBQ3hCRCxZQUFZRSxNQUFNLENBQUMsU0FBU1A7WUFDNUIsSUFBSUMsUUFBUUksWUFBWUUsTUFBTSxDQUFDLFVBQVVOO1lBQ3pDLE1BQU1PLFdBQVcsTUFBTUMsTUFBTSx1Q0FBdUM7Z0JBQ2xFQyxRQUFRO2dCQUNSQyxNQUFNTjtZQUVSO1lBQ0EsSUFBSU87WUFDSixJQUFJLENBQUNKLFNBQVNLLEVBQUUsRUFBRTtnQkFDaEIsMENBQTBDO2dCQUMxQyxJQUFJQyxZQUFZLE1BQU1OLFNBQVNPLElBQUk7Z0JBQ25DLElBQUk7b0JBQ0ZILE9BQU9JLEtBQUtDLEtBQUssQ0FBQ0g7Z0JBQ3BCLEVBQUUsT0FBTTtvQkFDTkYsT0FBTzt3QkFBRVQsT0FBT1csYUFBYTtvQkFBNkI7Z0JBQzVEO2dCQUNBSSxRQUFRZixLQUFLLENBQUMsMEJBQTBCUyxLQUFLVCxLQUFLLEVBQUUsV0FBV0ssU0FBU0osTUFBTTtnQkFDOUUsT0FBT1oscURBQVlBLENBQUNVLElBQUksQ0FBQztvQkFBRUMsT0FBT1MsS0FBS1QsS0FBSyxJQUFJO29CQUEyQkMsUUFBUUksU0FBU0osTUFBTTtnQkFBQyxHQUFHO29CQUFFQSxRQUFRSSxTQUFTSixNQUFNO2dCQUFDO1lBQ2xJO1lBQ0FRLE9BQU8sTUFBTUosU0FBU04sSUFBSTtZQUMxQixPQUFPVixxREFBWUEsQ0FBQ1UsSUFBSSxDQUFDVTtRQUMzQixPQUFPO1lBQ0wscUJBQXFCO1lBQ3JCLE1BQU0sRUFBRU8sT0FBTyxFQUFFLEdBQUcsTUFBTXpCLElBQUlRLElBQUk7WUFDbEMsZ0RBQWdEO1lBQ2hELE1BQU1NLFdBQVcsTUFBTUMsTUFBTSxrQ0FBa0M7Z0JBQzdEQyxRQUFRO2dCQUNSZCxTQUFTO29CQUFFLGdCQUFnQjtnQkFBbUI7Z0JBQzlDZSxNQUFNSyxLQUFLSSxTQUFTLENBQUM7b0JBQUVuQixRQUFRa0I7Z0JBQVE7WUFDekM7WUFDQSxNQUFNUCxPQUFPLE1BQU1KLFNBQVNOLElBQUk7WUFDaEMsT0FBT1YscURBQVlBLENBQUNVLElBQUksQ0FBQ1U7UUFDM0I7SUFDRixFQUFFLE9BQU9ULE9BQVk7UUFDbkJlLFFBQVFmLEtBQUssQ0FBQyxvQkFBb0JBO1FBQ2xDLE9BQU9YLHFEQUFZQSxDQUFDVSxJQUFJLENBQUM7WUFBRUMsT0FBT0EsT0FBT2dCLFdBQVc7UUFBK0IsR0FBRztZQUFFZixRQUFRO1FBQUk7SUFDdEc7QUFDRiIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxESElSQUpcXERlc2t0b3BcXHJpZGhpbWEgdmlzaW9uIGNoYXRcXHYwIHZpc2lvbiBjaGF0XFxhcHBcXGFwaVxcbGxhbWFcXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcTogUmVxdWVzdCkge1xyXG4gIHRyeSB7XHJcbiAgICAvLyBDaGVjayBpZiB0aGlzIGlzIGEgdmlkZW8gdXBsb2FkIChtdWx0aXBhcnQvZm9ybS1kYXRhKVxyXG4gICAgY29uc3QgY29udGVudFR5cGUgPSByZXEuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpIHx8ICcnO1xyXG4gICAgaWYgKGNvbnRlbnRUeXBlLmluY2x1ZGVzKCdtdWx0aXBhcnQvZm9ybS1kYXRhJykpIHtcclxuICAgICAgLy8gRm9yd2FyZCB0aGUgZm9ybS1kYXRhIHRvIHRoZSBQeXRob24gRmFzdEFQSSBiYWNrZW5kXHJcbiAgICAgIGNvbnN0IGZvcm1EYXRhID0gYXdhaXQgcmVxLmZvcm1EYXRhKCk7XHJcbiAgICAgIGNvbnN0IHZpZGVvID0gZm9ybURhdGEuZ2V0KCd2aWRlbycpO1xyXG4gICAgICBjb25zdCBwcm9tcHQgPSBmb3JtRGF0YS5nZXQoJ3Byb21wdCcpIHx8ICdEZXNjcmliZSB0aGlzIHZpZGVvLic7XHJcbiAgICAgIGlmICghdmlkZW8gfHwgdHlwZW9mIHZpZGVvID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIC8vIE5vIHZpZGVvIGZpbGUgcHJlc2VudFxyXG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnTm8gdmlkZW8gZmlsZSBwcm92aWRlZC4nIH0sIHsgc3RhdHVzOiA0MDAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgYmFja2VuZEZvcm0gPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgYmFja2VuZEZvcm0uYXBwZW5kKCd2aWRlbycsIHZpZGVvIGFzIEJsb2IpO1xyXG4gICAgICBpZiAocHJvbXB0KSBiYWNrZW5kRm9ybS5hcHBlbmQoJ3Byb21wdCcsIHByb21wdCBhcyBzdHJpbmcpO1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwOi8vbG9jYWxob3N0OjgwMDAvYW5hbHl6ZS12aWRlbycsIHtcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICBib2R5OiBiYWNrZW5kRm9ybSxcclxuICAgICAgICAvLyBOb3RlOiBEbyBOT1Qgc2V0IENvbnRlbnQtVHlwZSBoZWFkZXIgZm9yIEZvcm1EYXRhOyBicm93c2VyL05vZGUgd2lsbCBzZXQgaXQgd2l0aCBib3VuZGFyeVxyXG4gICAgICB9KTtcclxuICAgICAgbGV0IGRhdGE7XHJcbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcclxuICAgICAgICAvLyBUcnkgdG8gcGFyc2UgZXJyb3IgZGV0YWlscyBmcm9tIGJhY2tlbmRcclxuICAgICAgICBsZXQgZXJyb3JUZXh0ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShlcnJvclRleHQpO1xyXG4gICAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgICAgZGF0YSA9IHsgZXJyb3I6IGVycm9yVGV4dCB8fCAnVW5rbm93biBlcnJvciBmcm9tIGJhY2tlbmQnIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Zhc3RBUEkgYmFja2VuZCBlcnJvcjonLCBkYXRhLmVycm9yLCAnU3RhdHVzOicsIHJlc3BvbnNlLnN0YXR1cyk7XHJcbiAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IGRhdGEuZXJyb3IgfHwgJ0ZhaWxlZCB0byBwcm9jZXNzIHZpZGVvJywgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMgfSwgeyBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyB9KTtcclxuICAgICAgfVxyXG4gICAgICBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oZGF0YSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBUZXh0IHByb21wdCAoSlNPTilcclxuICAgICAgY29uc3QgeyBtZXNzYWdlIH0gPSBhd2FpdCByZXEuanNvbigpO1xyXG4gICAgICAvLyBPcHRpb25hbGx5LCB5b3UgY2FuIHN0aWxsIHVzZSBPbGxhbWEgZm9yIHRleHRcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cDovL2xvY2FsaG9zdDozMDAxL2dlbmVyYXRlJywge1xyXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgcHJvbXB0OiBtZXNzYWdlIH0pLFxyXG4gICAgICB9KTtcclxuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKGRhdGEpO1xyXG4gICAgfVxyXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ0FQSSByb3V0ZSBlcnJvcjonLCBlcnJvcik7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogZXJyb3I/Lm1lc3NhZ2UgfHwgJ0ZhaWxlZCB0byBjb25uZWN0IHRvIGJhY2tlbmQnIH0sIHsgc3RhdHVzOiA1MDAgfSk7XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJQT1NUIiwicmVxIiwiY29udGVudFR5cGUiLCJoZWFkZXJzIiwiZ2V0IiwiaW5jbHVkZXMiLCJmb3JtRGF0YSIsInZpZGVvIiwicHJvbXB0IiwianNvbiIsImVycm9yIiwic3RhdHVzIiwiYmFja2VuZEZvcm0iLCJGb3JtRGF0YSIsImFwcGVuZCIsInJlc3BvbnNlIiwiZmV0Y2giLCJtZXRob2QiLCJib2R5IiwiZGF0YSIsIm9rIiwiZXJyb3JUZXh0IiwidGV4dCIsIkpTT04iLCJwYXJzZSIsImNvbnNvbGUiLCJtZXNzYWdlIiwic3RyaW5naWZ5Il0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/llama/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fllama%2Froute&page=%2Fapi%2Fllama%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fllama%2Froute.ts&appDir=C%3A%5CUsers%5CDHIRAJ%5CDesktop%5Cridhima%20vision%20chat%5Cv0%20vision%20chat%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CDHIRAJ%5CDesktop%5Cridhima%20vision%20chat%5Cv0%20vision%20chat&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fllama%2Froute&page=%2Fapi%2Fllama%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fllama%2Froute.ts&appDir=C%3A%5CUsers%5CDHIRAJ%5CDesktop%5Cridhima%20vision%20chat%5Cv0%20vision%20chat%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CDHIRAJ%5CDesktop%5Cridhima%20vision%20chat%5Cv0%20vision%20chat&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_DHIRAJ_Desktop_ridhima_vision_chat_v0_vision_chat_app_api_llama_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/llama/route.ts */ \"(rsc)/./app/api/llama/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/llama/route\",\n        pathname: \"/api/llama\",\n        filename: \"route\",\n        bundlePath: \"app/api/llama/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\DHIRAJ\\\\Desktop\\\\ridhima vision chat\\\\v0 vision chat\\\\app\\\\api\\\\llama\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_DHIRAJ_Desktop_ridhima_vision_chat_v0_vision_chat_app_api_llama_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZsbGFtYSUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGbGxhbWElMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZsbGFtYSUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNESElSQUolNUNEZXNrdG9wJTVDcmlkaGltYSUyMHZpc2lvbiUyMGNoYXQlNUN2MCUyMHZpc2lvbiUyMGNoYXQlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q0RISVJBSiU1Q0Rlc2t0b3AlNUNyaWRoaW1hJTIwdmlzaW9uJTIwY2hhdCU1Q3YwJTIwdmlzaW9uJTIwY2hhdCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDMEM7QUFDdkg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXERISVJBSlxcXFxEZXNrdG9wXFxcXHJpZGhpbWEgdmlzaW9uIGNoYXRcXFxcdjAgdmlzaW9uIGNoYXRcXFxcYXBwXFxcXGFwaVxcXFxsbGFtYVxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvbGxhbWEvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9sbGFtYVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvbGxhbWEvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxESElSQUpcXFxcRGVza3RvcFxcXFxyaWRoaW1hIHZpc2lvbiBjaGF0XFxcXHYwIHZpc2lvbiBjaGF0XFxcXGFwcFxcXFxhcGlcXFxcbGxhbWFcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fllama%2Froute&page=%2Fapi%2Fllama%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fllama%2Froute.ts&appDir=C%3A%5CUsers%5CDHIRAJ%5CDesktop%5Cridhima%20vision%20chat%5Cv0%20vision%20chat%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CDHIRAJ%5CDesktop%5Cridhima%20vision%20chat%5Cv0%20vision%20chat&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fllama%2Froute&page=%2Fapi%2Fllama%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fllama%2Froute.ts&appDir=C%3A%5CUsers%5CDHIRAJ%5CDesktop%5Cridhima%20vision%20chat%5Cv0%20vision%20chat%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CDHIRAJ%5CDesktop%5Cridhima%20vision%20chat%5Cv0%20vision%20chat&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();