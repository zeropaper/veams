'use strict';
/**
 * Represents a base constructor which supports
 * options merging and
 * saving of standard stuff.
 *
 * @module VeamsBase
 * @author Sebastian Fitzner
 */

/**
 * Imports
 */
import stringHelpers from '../utils/internal-helpers/string';
import mixinHelper from '../utils/helpers/mixin';
import extendHelper from '../utils/helpers/extend';
import makeIdHelper from '../utils/helpers/make-id';

class VeamsBase {
	/**
	 * Constructor
	 *
	 * to save standard elements like el and options and
	 * execute initialize as default method.
	 *
	 * @param {String} namespace - Add custom namespace to your class.
	 * @param {Object} el - Save element in class.
	 * @param {Object} options - Options passed by init process.
	 * @param {Object} opts [{}] - Object which contains options of the extended class.
	 */
	constructor({namespace, el, options}, opts = {}) {
		this.namespace = namespace || 'base';
		this.instanceId = this.namespace;
		this.options = opts;
		this._options = options;

		if (el) {
			this.el = el;
		}
	}

	// ----------------------------------------------------------
	// GETTER & SETTERS
	// ----------------------------------------------------------

	set namespace(namespace) {
		this._namespace = namespace;
	}

	get namespace() {
		return this._namespace;
	}

	get instanceId() {
		return this._instanceId;
	}

	set instanceId(id) {
		this._instanceId = `${id}_` + Date.now() + '_' + makeIdHelper();
	}

	get _options() {
		return this.options;
	}

	set _options(options) {
		this.options = extendHelper(this.options, options || {});
	}

	set el(element) {
		this._el = element;
	}

	get el() {
		return this._el;
	}

	/**
	 * Get module information
	 */
	get metaData() {
		return {
			name: typeof this.namespace === 'string' ? stringHelpers.capitalizeFirstLetter(stringHelpers.toCamelCase(this.namespace)) : ''
		};
	}
}

/**
 * Add mixin functionality to extend module class by using simple objects
 */
VeamsBase.mixin = mixinHelper;

export default VeamsBase;