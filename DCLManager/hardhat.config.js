"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var config_1 = require("hardhat/config");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("hardhat-deploy-ethers");
require("hardhat-deploy");
require("@symfoni/hardhat-react");
require("hardhat-typechain");
require("@typechain/ethers-v5");
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
config_1.task("accounts", "Prints the list of accounts", function (args, hre) { return __awaiter(void 0, void 0, void 0, function () {
    var accounts, _i, accounts_1, account;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, hre.ethers.getSigners()];
            case 1:
                accounts = _a.sent();
                for (_i = 0, accounts_1 = accounts; _i < accounts_1.length; _i++) {
                    account = accounts_1[_i];
                    console.log(account.address);
                }
                return [2 /*return*/];
        }
    });
}); });
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
var config = {
    react: {
        providerPriority: ["web3modal", "hardhat"]
    },
    paths: {
        "tests": "./frontend/test/"
    },
    networks: {
        hardhat: {
            chainId: 1337,
            accounts: [
                {
                    balance: "10000000000000000000000",
                    privateKey: "0xe87d780e4c31c953a68aef2763df56599c9cfe73df4740fc24c2d0f5acd21bae"
                },
                {
                    balance: "10000000000000000000000",
                    privateKey: "0x7f8ecae56a570cb3746d0ff03ad020a06cc30c6c223515e6c1e5c9e95c3b1672"
                }
            ]
        }
    },
    solidity: {
        compilers: [
            {
                version: "0.8.4",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 50
                    }
                }
            }
        ]
    }
};
exports["default"] = config;
//# sourceMappingURL=hardhat.config.js.map