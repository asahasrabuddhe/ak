"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var botbuilder_1 = require("botbuilder");
var moment = require("moment-timezone");
var USERNAME = 'username';
var Akbot = /** @class */ (function () {
    /**
     *
     * @param conversationState
     */
    function Akbot(conversationState) {
        this.userNameAccessor = conversationState.createProperty(USERNAME);
        this.conversationState = conversationState;
        this.loop = true;
    }
    Akbot.prototype.onTurn = function (turnContext) {
        return __awaiter(this, void 0, void 0, function () {
            var utterance, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(turnContext.activity.type === botbuilder_1.ActivityTypes.Message)) return [3 /*break*/, 7];
                        utterance = turnContext.activity.text;
                        _a = utterance;
                        switch (_a) {
                            case 'thamb': return [3 /*break*/, 1];
                            case 'tham': return [3 /*break*/, 1];
                            case 'kha': return [3 /*break*/, 2];
                            case 'khao': return [3 /*break*/, 2];
                        }
                        return [3 /*break*/, 5];
                    case 1:
                        this.loop = false;
                        return [3 /*break*/, 7];
                    case 2:
                        this.loop = true;
                        return [4 /*yield*/, turnContext.sendActivity(Akbot.greeter() + " " + turnContext.activity.from.name + "!")];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.chabaao(turnContext)];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, turnContext.sendActivity("You said " + utterance)];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Akbot.prototype.chabaao = function (turnContext) {
        return __awaiter(this, void 0, void 0, function () {
            var d, dialogs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.loop) return [3 /*break*/, 3];
                        d = moment.tz('Asia/Kolkata');
                        dialogs = [
                            "Have you updated the work log?",
                            "What is the status?",
                            turnContext.activity.from.name + ", please come to MR" + Akbot.getRandomInt(1, 4) + " for scrum",
                            "Hi team, let's meet in MR" + Akbot.getRandomInt(1, 4) + " for a discussion with ajitem",
                            turnContext.activity.from.name + ", we can sit at " + d.format('hh:kk') + " for the same"
                        ];
                        return [4 /*yield*/, turnContext.sendActivity(dialogs[Akbot.getRandomInt(0, dialogs.length)])];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.sleep(Akbot.getRandomInt(10000, 1000000))];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 0];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Akbot.prototype.sleep = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    Akbot.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    Akbot.greeter = function () {
        var d = moment.tz('Asia/Kolkata');
        var t = parseInt(d.format('HH'), 10);
        if (t < 12)
            return 'Good Morning';
        else if (t < 17)
            return 'Good Afternoon';
        else
            return 'Good Evening';
    };
    return Akbot;
}());
exports.Akbot = Akbot;
