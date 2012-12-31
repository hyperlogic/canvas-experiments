define(function () {

    /**
     * Intended to be used on a Constructor prototype to provide getter's and setter attributes.
     * Yay meta programming.
     *
     * @param {Object} obj Object to add the getters and setters to
     * @param {String} attrKey name of getter setter
     * @param {String} Mode string: "r" for getter only, "w" for setter only and "rw" for getter and setter.
     * @param {String} [internalKey] name of internal property to store value. If not present, attrKey is used with an underscore prefix.
     * @param {String} [dirtyFlagName] name of property to set to true on set.  If not present, no flag is set.
     */
    var attr = function (obj, attrKey, mode, internalKey, dirtyFlagName) {
        if (mode[0] === "r" || mode[1] === "r") {
            internalKey = internalKey || ("_" + attrKey);
            obj.__defineGetter__(attrKey, function () {
                return this[internalKey];
            });
        }
        if (mode[0] === "w" || mode[1] === "w") {
            if (dirtyFlagName) {
                obj.__defineSetter__(attrKey, function (value) {
                    this[internalKey] = value;
                    this[dirtyFlagName] = true;
                });
            } else {
                obj.__defineSetter__(attrKey, function (value) {
                    this[internalKey] = value;
                });
            }
        }
    };

    /**
     * Useful within object constructors for initialization, 
     * Any keys in data which are are also present in attrKeys will be set on obj.
     *
     * @param {Object} obj Object to set values upon.
     * @param {Array} attrKeys Array of string keys to search for in the data obj.
     * @apram {Object} data Object with values which may or may not be added to obj.
     */
    var initAttrsFromData = function (obj, attrKeys, data) {
        if (data) {
            for (var i = 0; i < attrKeys.length; i++) {
                var value = data[attrKeys[i]];
                if (value)
                    obj[attrKeys[i]] = value;
            }
        }
    };

    return {attr: attr,
            initAttrsFromData: initAttrsFromData};
});
