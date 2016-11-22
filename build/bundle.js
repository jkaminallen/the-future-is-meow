/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}

/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "4ceaef4d3b43f29bcd77"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };

/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("var Felid = __webpack_require__(1);\nvar HouseCat = __webpack_require__(2);\nvar Lion = __webpack_require__(3);\n\n// Code ensuring Felid is working\nvar jaxsonDeVille = new Felid('JaxsonDeVille', 'See-food');\n\nif (jaxsonDeVille.name !== 'JaxsonDeVille') {\n  console.error('Felid.name is broken');\n}\n\nif (jaxsonDeVille.favoriteFood !== 'See-food') {\n  console.error('Felid.favoriteFood is broken');\n}\n\nif (jaxsonDeVille.groom() !== 'Licks its coat') {\n  console.error('Felid.prototype.groom is broken');\n}\n\n// Code ensuring HouseCat is working\nvar garfield = new HouseCat('Garfield', 'lasagna', 'Jon');\n\nif (garfield.name !== 'Garfield') {\n  console.error('HouseCat.name is broken');\n}\n\nif (garfield.favoriteFood !== 'lasagna') {\n  console.error('HouseCat.favoriteFood is broken');\n}\n\nif (garfield.ownerName !== 'Jon') {\n  console.error('HouseCat.ownerName is broken');\n}\n\nif (garfield.groom() !== 'Licks its coat') {\n  console.error('HouseCat.prototype.groom is broken');\n}\n\nif (garfield.huntForFood() !== 'Goes to kitchen, knocks over bowl containing lasagna and eats it from the floor') {\n  console.error('HouseCat.prototype.huntForFood is broken');\n}\n\nif (garfield.showAffectionToOwner() !== 'Brings dead mouse to Jon') {\n  console.error('HouseCat.prototype.showAffetionToOwner is broken');\n}\n\n// Code ensuring Lion is working\nvar mufasa = new Lion('Mufasa', 'antelope');\n\nif (mufasa.name !== 'Mufasa') {\n  console.error('Lion.name is broken');\n}\n\nif (mufasa.favoriteFood !== 'antelope') {\n  console.error('Lion.favoriteFood is broken');\n}\n\nif (!Array.isArray(mufasa.cubs)) {\n  console.error('Lion.cubs is broken');\n}\n\nif (mufasa.cubs.length !== 0) {\n  console.error('Lion.cubs is broken');\n}\n\nif (mufasa.groom() !== 'Licks its coat') {\n  console.error('Lion.prototype.groom is broken');\n}\n\nif (mufasa.huntForFood() !== 'Goes over to the antelope killed by the lionesses and eats it') {\n  console.error('Lion.prototype.huntForFood is broken');\n}\n\nif (mufasa.namesOfCubs() !== 'Mufasa has no cubs!') {\n  console.error('Lion.prototype.namesOfCubs is broken');\n}\n\nif (mufasa.procreate('Simba') !== 'Nants ingonyama bagithi Baba\\nSithi uhm ingonyama\\nSimba is hoisted at the top of Pride Rock') {\n  console.error('Lion.prototype.procreate is broken');\n}\n\nvar simba = mufasa.cubs[0];\n\nif (simba.name !== 'Simba') {\n  console.error('Lion.prototype.procreate is broken');\n}\n\nif (simba.favoriteFood !== 'antelope') {\n  console.error('Lion.prototype.procreate is broken');\n}\n\nif (mufasa.namesOfCubs() !== 'Simba') {\n  console.error('Lion.prototype.namesOfCubs is broken');\n}\n\nsimba.procreate('Kiara');\nsimba.procreate('Kion');\n\nif (simba.namesOfCubs() !== 'Kiara, and Kion') {\n  console.error('Lion.prototype.namesOfCubs is broken');\n}\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi5qcz8zNDc5Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBIiwiZmlsZSI6IjAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgRmVsaWQgPSByZXF1aXJlKCcuL0ZlbGlkJyk7XG52YXIgSG91c2VDYXQgPSByZXF1aXJlKCcuL0hvdXNlQ2F0Jyk7XG52YXIgTGlvbiA9IHJlcXVpcmUoJy4vTGlvbicpO1xuXG4vLyBDb2RlIGVuc3VyaW5nIEZlbGlkIGlzIHdvcmtpbmdcbnZhciBqYXhzb25EZVZpbGxlID0gbmV3IEZlbGlkKCdKYXhzb25EZVZpbGxlJywgJ1NlZS1mb29kJyk7XG5cbmlmIChqYXhzb25EZVZpbGxlLm5hbWUgIT09ICdKYXhzb25EZVZpbGxlJykge1xuICBjb25zb2xlLmVycm9yKCdGZWxpZC5uYW1lIGlzIGJyb2tlbicpO1xufVxuXG5pZiAoamF4c29uRGVWaWxsZS5mYXZvcml0ZUZvb2QgIT09ICdTZWUtZm9vZCcpIHtcbiAgY29uc29sZS5lcnJvcignRmVsaWQuZmF2b3JpdGVGb29kIGlzIGJyb2tlbicpO1xufVxuXG5pZiAoamF4c29uRGVWaWxsZS5ncm9vbSgpICE9PSAnTGlja3MgaXRzIGNvYXQnKSB7XG4gIGNvbnNvbGUuZXJyb3IoJ0ZlbGlkLnByb3RvdHlwZS5ncm9vbSBpcyBicm9rZW4nKTtcbn1cblxuLy8gQ29kZSBlbnN1cmluZyBIb3VzZUNhdCBpcyB3b3JraW5nXG52YXIgZ2FyZmllbGQgPSBuZXcgSG91c2VDYXQoJ0dhcmZpZWxkJywgJ2xhc2FnbmEnLCAnSm9uJyk7XG5cbmlmIChnYXJmaWVsZC5uYW1lICE9PSAnR2FyZmllbGQnKSB7XG4gIGNvbnNvbGUuZXJyb3IoJ0hvdXNlQ2F0Lm5hbWUgaXMgYnJva2VuJyk7XG59XG5cbmlmIChnYXJmaWVsZC5mYXZvcml0ZUZvb2QgIT09ICdsYXNhZ25hJykge1xuICBjb25zb2xlLmVycm9yKCdIb3VzZUNhdC5mYXZvcml0ZUZvb2QgaXMgYnJva2VuJyk7XG59XG5cbmlmIChnYXJmaWVsZC5vd25lck5hbWUgIT09ICdKb24nKSB7XG4gIGNvbnNvbGUuZXJyb3IoJ0hvdXNlQ2F0Lm93bmVyTmFtZSBpcyBicm9rZW4nKTtcbn1cblxuaWYgKGdhcmZpZWxkLmdyb29tKCkgIT09ICdMaWNrcyBpdHMgY29hdCcpIHtcbiAgY29uc29sZS5lcnJvcignSG91c2VDYXQucHJvdG90eXBlLmdyb29tIGlzIGJyb2tlbicpO1xufVxuXG5pZiAoZ2FyZmllbGQuaHVudEZvckZvb2QoKSAhPT0gJ0dvZXMgdG8ga2l0Y2hlbiwga25vY2tzIG92ZXIgYm93bCBjb250YWluaW5nIGxhc2FnbmEgYW5kIGVhdHMgaXQgZnJvbSB0aGUgZmxvb3InKSB7XG4gIGNvbnNvbGUuZXJyb3IoJ0hvdXNlQ2F0LnByb3RvdHlwZS5odW50Rm9yRm9vZCBpcyBicm9rZW4nKTtcbn1cblxuaWYgKGdhcmZpZWxkLnNob3dBZmZlY3Rpb25Ub093bmVyKCkgIT09ICdCcmluZ3MgZGVhZCBtb3VzZSB0byBKb24nKSB7XG4gIGNvbnNvbGUuZXJyb3IoJ0hvdXNlQ2F0LnByb3RvdHlwZS5zaG93QWZmZXRpb25Ub093bmVyIGlzIGJyb2tlbicpO1xufVxuXG4vLyBDb2RlIGVuc3VyaW5nIExpb24gaXMgd29ya2luZ1xudmFyIG11ZmFzYSA9IG5ldyBMaW9uKCdNdWZhc2EnLCAnYW50ZWxvcGUnKTtcblxuaWYgKG11ZmFzYS5uYW1lICE9PSAnTXVmYXNhJykge1xuICBjb25zb2xlLmVycm9yKCdMaW9uLm5hbWUgaXMgYnJva2VuJyk7XG59XG5cbmlmIChtdWZhc2EuZmF2b3JpdGVGb29kICE9PSAnYW50ZWxvcGUnKSB7XG4gIGNvbnNvbGUuZXJyb3IoJ0xpb24uZmF2b3JpdGVGb29kIGlzIGJyb2tlbicpO1xufVxuXG5pZiAoIUFycmF5LmlzQXJyYXkobXVmYXNhLmN1YnMpKSB7XG4gIGNvbnNvbGUuZXJyb3IoJ0xpb24uY3VicyBpcyBicm9rZW4nKTtcbn1cblxuaWYgKG11ZmFzYS5jdWJzLmxlbmd0aCAhPT0gMCkge1xuICBjb25zb2xlLmVycm9yKCdMaW9uLmN1YnMgaXMgYnJva2VuJyk7XG59XG5cbmlmIChtdWZhc2EuZ3Jvb20oKSAhPT0gJ0xpY2tzIGl0cyBjb2F0Jykge1xuICBjb25zb2xlLmVycm9yKCdMaW9uLnByb3RvdHlwZS5ncm9vbSBpcyBicm9rZW4nKTtcbn1cblxuaWYgKG11ZmFzYS5odW50Rm9yRm9vZCgpICE9PSAnR29lcyBvdmVyIHRvIHRoZSBhbnRlbG9wZSBraWxsZWQgYnkgdGhlIGxpb25lc3NlcyBhbmQgZWF0cyBpdCcpIHtcbiAgY29uc29sZS5lcnJvcignTGlvbi5wcm90b3R5cGUuaHVudEZvckZvb2QgaXMgYnJva2VuJyk7XG59XG5cbmlmIChtdWZhc2EubmFtZXNPZkN1YnMoKSAhPT0gJ011ZmFzYSBoYXMgbm8gY3VicyEnKSB7XG4gIGNvbnNvbGUuZXJyb3IoJ0xpb24ucHJvdG90eXBlLm5hbWVzT2ZDdWJzIGlzIGJyb2tlbicpO1xufVxuXG5pZiAobXVmYXNhLnByb2NyZWF0ZSgnU2ltYmEnKSAhPT0gJ05hbnRzIGluZ29ueWFtYSBiYWdpdGhpIEJhYmFcXG5TaXRoaSB1aG0gaW5nb255YW1hXFxuU2ltYmEgaXMgaG9pc3RlZCBhdCB0aGUgdG9wIG9mIFByaWRlIFJvY2snKSB7XG4gIGNvbnNvbGUuZXJyb3IoJ0xpb24ucHJvdG90eXBlLnByb2NyZWF0ZSBpcyBicm9rZW4nKTtcbn1cblxudmFyIHNpbWJhID0gbXVmYXNhLmN1YnNbMF07XG5cbmlmIChzaW1iYS5uYW1lICE9PSAnU2ltYmEnKSB7XG4gIGNvbnNvbGUuZXJyb3IoJ0xpb24ucHJvdG90eXBlLnByb2NyZWF0ZSBpcyBicm9rZW4nKTtcbn1cblxuaWYgKHNpbWJhLmZhdm9yaXRlRm9vZCAhPT0gJ2FudGVsb3BlJykge1xuICBjb25zb2xlLmVycm9yKCdMaW9uLnByb3RvdHlwZS5wcm9jcmVhdGUgaXMgYnJva2VuJyk7XG59XG5cbmlmIChtdWZhc2EubmFtZXNPZkN1YnMoKSAhPT0gJ1NpbWJhJykge1xuICBjb25zb2xlLmVycm9yKCdMaW9uLnByb3RvdHlwZS5uYW1lc09mQ3VicyBpcyBicm9rZW4nKTtcbn1cblxuc2ltYmEucHJvY3JlYXRlKCdLaWFyYScpO1xuc2ltYmEucHJvY3JlYXRlKCdLaW9uJyk7XG5cbmlmIChzaW1iYS5uYW1lc09mQ3VicygpICE9PSAnS2lhcmEsIGFuZCBLaW9uJykge1xuICBjb25zb2xlLmVycm9yKCdMaW9uLnByb3RvdHlwZS5uYW1lc09mQ3VicyBpcyBicm9rZW4nKTtcbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvbWFpbi5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 1 */
/***/ function(module, exports) {

	eval("var Felid = function(name, favoriteFood) {\n  this.name = name;\n  this.favoriteFood = favoriteFood;\n};\n\nFelid.prototype.groom = function() {\n  return 'Licks its coat';\n};\n\nmodule.exports = Felid;\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvRmVsaWQuanM/NzM3NSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEiLCJmaWxlIjoiMS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBGZWxpZCA9IGZ1bmN0aW9uKG5hbWUsIGZhdm9yaXRlRm9vZCkge1xuICB0aGlzLm5hbWUgPSBuYW1lO1xuICB0aGlzLmZhdm9yaXRlRm9vZCA9IGZhdm9yaXRlRm9vZDtcbn07XG5cbkZlbGlkLnByb3RvdHlwZS5ncm9vbSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gJ0xpY2tzIGl0cyBjb2F0Jztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRmVsaWQ7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL0ZlbGlkLmpzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	eval("var Felid = __webpack_require__(1);\n\nvar HouseCat = function(name, favoriteFood, ownerName) {\n  Felid.call(this, name, favoriteFood);\n  this.ownerName = ownerName;\n};\n\nHouseCat.prototype = Object.create(Felid.prototype);\nHouseCat.prototype.constructor = HouseCat;\n\nHouseCat.prototype.huntForFood = function() {\n  return 'Goes to kitchen, knocks over bowl containing ' + this.favoriteFood + ' and eats it from the floor';\n};\n\nHouseCat.prototype.showAffectionToOwner = function() {\n  return 'Brings dead mouse to ' + this.ownerName;\n};\n\nmodule.exports = HouseCat;\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvSG91c2VDYXQuanM/OGNhMSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEiLCJmaWxlIjoiMi5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBGZWxpZCA9IHJlcXVpcmUoJy4vRmVsaWQnKTtcblxudmFyIEhvdXNlQ2F0ID0gZnVuY3Rpb24obmFtZSwgZmF2b3JpdGVGb29kLCBvd25lck5hbWUpIHtcbiAgRmVsaWQuY2FsbCh0aGlzLCBuYW1lLCBmYXZvcml0ZUZvb2QpO1xuICB0aGlzLm93bmVyTmFtZSA9IG93bmVyTmFtZTtcbn07XG5cbkhvdXNlQ2F0LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRmVsaWQucHJvdG90eXBlKTtcbkhvdXNlQ2F0LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEhvdXNlQ2F0O1xuXG5Ib3VzZUNhdC5wcm90b3R5cGUuaHVudEZvckZvb2QgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICdHb2VzIHRvIGtpdGNoZW4sIGtub2NrcyBvdmVyIGJvd2wgY29udGFpbmluZyAnICsgdGhpcy5mYXZvcml0ZUZvb2QgKyAnIGFuZCBlYXRzIGl0IGZyb20gdGhlIGZsb29yJztcbn07XG5cbkhvdXNlQ2F0LnByb3RvdHlwZS5zaG93QWZmZWN0aW9uVG9Pd25lciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gJ0JyaW5ncyBkZWFkIG1vdXNlIHRvICcgKyB0aGlzLm93bmVyTmFtZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSG91c2VDYXQ7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL0hvdXNlQ2F0LmpzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	eval("var Felid = __webpack_require__(1);\n\nvar Lion = function(name, favoriteFood) {\n  Felid.call(this, name, favoriteFood);\n  this.cubs = [];\n};\n\nLion.prototype = Object.create(Felid.prototype);\nLion.prototype.constructor = Lion;\n\nLion.prototype.huntForFood = function(nameOfCub) {\n  return 'Goes over to the ' + this.favoriteFood + ' killed by the lionesses and eats it';\n};\n\nLion.prototype.procreate = function(nameOfCub) {\n  var newCub = new Lion(nameOfCub, this.favoriteFood);\n  this.cubs.push(newCub);\n  return 'Nants ingonyama bagithi Baba\\nSithi uhm ingonyama\\n' + newCub.name + ' is hoisted at the top of Pride Rock';\n};\n\nLion.prototype.namesOfCubs = function() {\n  var namesOfCubs;\n  if (this.cubs.length === 0) {\n    namesOfCubs = this.name + ' has no cubs!';\n  } else if (this.cubs.length === 1) {\n    namesOfCubs = this.cubs[0].name;\n  } else {\n    namesOfCubs = this.cubs.map(function(cub) {\n      return cub.name;\n    });\n    namesOfCubs = namesOfCubs\n      .slice(0, -1)\n      .concat('and ' + namesOfCubs.slice(-1));\n    namesOfCubs = namesOfCubs.join(', ');\n  }\n\n  return namesOfCubs;\n};\n\nmodule.exports = Lion;\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvTGlvbi5qcz9lODliIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEiLCJmaWxlIjoiMy5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBGZWxpZCA9IHJlcXVpcmUoJy4vRmVsaWQnKTtcblxudmFyIExpb24gPSBmdW5jdGlvbihuYW1lLCBmYXZvcml0ZUZvb2QpIHtcbiAgRmVsaWQuY2FsbCh0aGlzLCBuYW1lLCBmYXZvcml0ZUZvb2QpO1xuICB0aGlzLmN1YnMgPSBbXTtcbn07XG5cbkxpb24ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShGZWxpZC5wcm90b3R5cGUpO1xuTGlvbi5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBMaW9uO1xuXG5MaW9uLnByb3RvdHlwZS5odW50Rm9yRm9vZCA9IGZ1bmN0aW9uKG5hbWVPZkN1Yikge1xuICByZXR1cm4gJ0dvZXMgb3ZlciB0byB0aGUgJyArIHRoaXMuZmF2b3JpdGVGb29kICsgJyBraWxsZWQgYnkgdGhlIGxpb25lc3NlcyBhbmQgZWF0cyBpdCc7XG59O1xuXG5MaW9uLnByb3RvdHlwZS5wcm9jcmVhdGUgPSBmdW5jdGlvbihuYW1lT2ZDdWIpIHtcbiAgdmFyIG5ld0N1YiA9IG5ldyBMaW9uKG5hbWVPZkN1YiwgdGhpcy5mYXZvcml0ZUZvb2QpO1xuICB0aGlzLmN1YnMucHVzaChuZXdDdWIpO1xuICByZXR1cm4gJ05hbnRzIGluZ29ueWFtYSBiYWdpdGhpIEJhYmFcXG5TaXRoaSB1aG0gaW5nb255YW1hXFxuJyArIG5ld0N1Yi5uYW1lICsgJyBpcyBob2lzdGVkIGF0IHRoZSB0b3Agb2YgUHJpZGUgUm9jayc7XG59O1xuXG5MaW9uLnByb3RvdHlwZS5uYW1lc09mQ3VicyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbmFtZXNPZkN1YnM7XG4gIGlmICh0aGlzLmN1YnMubGVuZ3RoID09PSAwKSB7XG4gICAgbmFtZXNPZkN1YnMgPSB0aGlzLm5hbWUgKyAnIGhhcyBubyBjdWJzISc7XG4gIH0gZWxzZSBpZiAodGhpcy5jdWJzLmxlbmd0aCA9PT0gMSkge1xuICAgIG5hbWVzT2ZDdWJzID0gdGhpcy5jdWJzWzBdLm5hbWU7XG4gIH0gZWxzZSB7XG4gICAgbmFtZXNPZkN1YnMgPSB0aGlzLmN1YnMubWFwKGZ1bmN0aW9uKGN1Yikge1xuICAgICAgcmV0dXJuIGN1Yi5uYW1lO1xuICAgIH0pO1xuICAgIG5hbWVzT2ZDdWJzID0gbmFtZXNPZkN1YnNcbiAgICAgIC5zbGljZSgwLCAtMSlcbiAgICAgIC5jb25jYXQoJ2FuZCAnICsgbmFtZXNPZkN1YnMuc2xpY2UoLTEpKTtcbiAgICBuYW1lc09mQ3VicyA9IG5hbWVzT2ZDdWJzLmpvaW4oJywgJyk7XG4gIH1cblxuICByZXR1cm4gbmFtZXNPZkN1YnM7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IExpb247XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL0xpb24uanNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ }
/******/ ]);