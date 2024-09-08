/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 128:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseInputs = void 0;
const parseInputs = (getInput) => {
    const inputMap = {};
    getInput.forEach((input) => {
        const [key, value] = input.split('=');
        inputMap[key.trim()] = value.trim();
    });
    if (!inputMap.action ||
        !inputMap.scan_type ||
        !inputMap.profile_name ||
        !inputMap.gitlab_token ||
        !inputMap.create_issue ||
        !inputMap.gitlab_project) {
        throw new Error('Invalid input. Please provide all required inputs.');
    }
    const action = inputMap.action;
    const scan_type = inputMap.scan_type;
    const profile_name = inputMap.profile_name;
    const gitlab_token = inputMap.gitlab_token;
    const gitlab_project = inputMap.gitlab_project;
    const create_issue = inputMap.create_issue === 'true';
    const scan_guid = '';
    return { action, scan_type, profile_name, scan_guid, gitlab_token, create_issue, gitlab_project };
};
exports.parseInputs = parseInputs;


/***/ }),

/***/ 698:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.run = void 0;
const policyResultsService = __importStar(__nccwpck_require__(505));
const inputs_1 = __nccwpck_require__(128);
async function run() {
    const myArgs = process.argv.slice(2);
    const inputs = (0, inputs_1.parseInputs)(myArgs);
    switch (inputs.action) {
        case 'processPolicyResults':
            await policyResultsService.preparePolicyResults(inputs);
            break;
        default:
            throw new Error('Invalid action');
    }
}
exports.run = run;


/***/ }),

/***/ 505:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.preparePolicyResults = void 0;
async function preparePolicyResults(inputs) {
    console.log(inputs);
}
exports.preparePolicyResults = preparePolicyResults;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const main_1 = __nccwpck_require__(698);
void (0, main_1.run)();

})();

module.exports = __webpack_exports__;
/******/ })()
;