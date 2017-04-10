define([
        "dojo/_base/declare",
        "dojo/dom-construct",
        "dojo/text!./template/ResultFilterTemplate.html",
        "dijit/_WidgetBase",
        "dijit/_TemplatedMixin",
        "dijit/_WidgetsInTemplateMixin",
        "dojo/_base/lang",
        "dojo/dom-class",
        "dojo/dom-attr",
        "../../../BaseDiscoveryMixin" ,
        "dijit/form/HorizontalSlider",
        "dojox/form/RangeSlider",
        "dojo/on"
    ],
    function (declare, domConstruct, template, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, lang, domClass, domAttr, BaseDiscoveryMixin, HorizontalSlider, RangeSlider, on) {

        return declare([_WidgetBase, _TemplatedMixin, BaseDiscoveryMixin, _WidgetsInTemplateMixin], {
            widgetsInTemplate: true,
            templateString: template,
            showAcquisitionDateFilter: true,
            showCloudCoverFilter: true,
            useUTCDate: true,
            dateFormat: "dd MMM yyyy",
            _defaultDateFormat: "dd MMM yyyy",
            defaultCloudCover: 10,
            defaultSliderDiscreteValues: 25,
            sortOptions: [],
            constructor: function (params) {
                lang.mixin(this, params || {});
                this._dateConfig = {
                    dateFormat: this.dateFormat || this._defaultDateFormat,
                    useUTCDate: (!this.useUTCDate && this.useUTCDate !== false) ? true : this.useUTCDate
                };
                this.scopedRefreshResultsFxn = lang.hitch(this, this._onRefreshResults);
            },
            postCreate: function () {
                this.inherited(arguments);
                if (this.showCloudCoverFilter) {
                    this.createCloudCoverSlider();


                }
                else {
                    this._hideNode(this.cloudCoverFilterContainer);
                }
            },

            refreshResults: function () {
                this._onRefreshResults();
            },
            hideFilters: function () {
                this.hideTypeFilters();
                this.hideEntryBorders();
            },
            showFilters: function () {
                this.showTypeFilters();
                this.showEntryBorders();
            },
            _onRefreshResults: function () {
                this.onRefreshResults();
            },
            onRefreshResults: function () {

            },
            createCloudCoverSlider: function () {
                if (this.cloudCoverSlider) {
                    return;
                }
                this.cloudCoverSlider = new HorizontalSlider({
                    minimum: 0,
                    maximum: 100,
                    intermediateChanges: true,
                    value: this.defaultCloudCover,
                    discreteValues: 101,
                    pageIncrement: 1
                }, this.cloudCoverSliderContainer);
                this._cloudCoverFilterListener = this.cloudCoverSlider.on("change", lang.hitch(this, this.handleCloudCoverChange));
                this.handleCloudCoverChange(this.cloudCoverSlider.get("value"));
            },
            getCloudCover: function () {
                if (this.cloudCoverSlider) {
                    return Math.floor(this.cloudCoverSlider.get("value"));
                }
                return null;

            },
            getDateRange: function () {
                if (!this.dateSlider) {
                    return null;
                }
                var dateValues = this.dateSlider.get("value");
                if (dateValues && dateValues.length === 2) {
                    return {
                        start: dateValues[0],
                        end: dateValues[1]
                    };
                }
                return null;
            },
            handleCloudCoverChange: function (value) {
                this.updateCloudCoverValue(this.getCloudCover());
                this._onRefreshResults();
            },

            destroyDateSlider: function () {
                if (this.dateSlider) {
                    this.dateSlider.destroy();
                    this.dateSlider = null;
                }
                this._hideNode(this.dateFilterContainer);
            },
            createDateSlider: function (min, max, count, defaultMin) {
                if (!this.showAcquisitionDateFilter) {
                    return;

                }
                this.destroyDateSlider();
                this._showNode(this.dateFilterContainer);

                var discreteValues;
                if (count < this.defaultSliderDiscreteValues) {
                    discreteValues = count;
                }
                else {
                    discreteValues = this.defaultSliderDiscreteValues;
                }
                this.dateSlider = new dojox.form.HorizontalRangeSlider({
                    minimum: min,
                    maximum: max,
                    value: [defaultMin, max ],
                    intermediateChanges: true,
                    discreteValues: discreteValues,
                    showButtons: false
                });
                this.dateSlider.placeAt(this.dateSliderContainer);
                this.dateSlider.on("change", lang.hitch(this, this.handleDateChange));
                var startDateString, endDateString;
                startDateString = this.getDateString(defaultMin, this._dateConfig.useUTCDate, this._dateConfig.dateFormat);
                endDateString = this.getDateString(max, this._dateConfig.useUTCDate, this._dateConfig.dateFormat);
                this.updateDateValues(startDateString, endDateString);
            },
            handleDateChange: function (value) {
                if (value && value.length === 2) {
                    var startDateString, endDateString;
                    startDateString = this.getDateString(value[0], this._dateConfig.useUTCDate, this._dateConfig.dateFormat);
                    endDateString = this.getDateString(value[1], this._dateConfig.useUTCDate, this._dateConfig.dateFormat);
                    this.updateDateValues(startDateString, endDateString);
                    this._onRefreshResults();

                }
            },
            updateDateValues: function (startDate, endDate) {
                domAttr.set(this.startDateValue, "innerHTML", startDate);
                domAttr.set(this.endDateValue, "innerHTML", endDate);
            },
            updateCloudCoverValue: function (value) {
                domAttr.set(this.cloudCoverSliderValueContainer, "innerHTML", value.toString() + "%");
            },
            showTypeFilters: function () {
                if (this.cloudCoverSlider) {
                    this._showNode(this.cloudCoverFilterContainer);
                }
                if (this.dateSlider) {
                    this._showNode(this.dateFilterContainer);
                }
            },
            hideTypeFilters: function () {
                this._hideNode(this.cloudCoverFilterContainer);
                this._hideNode(this.dateFilterContainer);

            },
            clear: function () {
                if (this.cloudCoverSlider) {
                    this.cloudCoverSlider.set("value", this.defaultCloudCover);
                }
                this.showEntryBorders();
                this.hideClearPreviewsContainer();
                this.hide();
            },
            toggle: function () {
                if (domClass.contains(this.domNode, "hidden")) {
                    this.show();
                }
                else {
                    this.hide();
                }
            },
            isVisible: function () {
                return   !domClass.contains(this.domNode, "hidden");
            },
            show: function () {
                this._showNode(this.domNode);

            },
            hide: function () {
                this._hideNode(this.domNode);
            },
            clearPreviews: function () {
                this.hideClearPreviewsContainer();
                this._onClearPreviews();
            },
            _onClearPreviews: function () {
                this.onClearPreviews();
            },
            onClearPreviews: function () {
            },
            showClearPreviewsContainer: function () {
                this._showNode(this.clearPreviewsContainer);
            },
            hideClearPreviewsContainer: function () {
                this._hideNode(this.clearPreviewsContainer);
            },
            hideEntryBorders: function () {
                if (!domClass.contains(this.domNode, "noDashedBorder")) {
                    domClass.add(this.domNode, "noDashedBorder");
                }
            },
            showEntryBorders: function () {
                if (domClass.contains(this.domNode, "noDashedBorder")) {
                    domClass.remove(this.domNode, "noDashedBorder");
                }
            },
            isCartOnlyActive: function () {
                return this.displayOnlyCartItemsCheckbox.get("value");
            },
            _hideNode: function (node) {
                if (!domClass.contains(node, "hidden")) {
                    domClass.add(node, "hidden");
                }
            },
            _showNode: function (node) {
                if (domClass.contains(node, "hidden")) {
                    domClass.remove(node, "hidden");
                }
            },
            getSelectedIconPlatforms: function () {
                var i, currentCacheItem, selectedPlatform = [];

                if (!this.iconPlatformCheckboxCache || !this.iconPlatformCheckboxCache.length) {
                    return selectedPlatform;
                }
                for (i = 0; i < this.iconPlatformCheckboxCache.length; i++) {
                    currentCacheItem = this.iconPlatformCheckboxCache[i];
                    if (!currentCacheItem || !currentCacheItem.checkbox || !currentCacheItem.label) {
                        continue;
                    }
                    if (domAttr.get(currentCacheItem.checkbox, "checked")) {
                        selectedPlatform.push(currentCacheItem.label);
                    }
                }
                return selectedPlatform;
            },
            hideIconPlatformsContainer: function () {
                this._hideNode(this.iconPlatformCheckboxesFilterOuterContainer);
            },
            getSelectedServices: function () {
                var i, currentCacheItem, selectedServices = [];

                if (!this.checkboxCache || !this.checkboxCache.length) {
                    return selectedServices;
                }
                for (i = 0; i < this.checkboxCache.length; i++) {
                    currentCacheItem = this.checkboxCache[i];
                    if (!currentCacheItem || !currentCacheItem.checkbox || !currentCacheItem.label) {
                        continue;
                    }
                    if (domAttr.get(currentCacheItem.checkbox, "checked")) {
                        selectedServices.push(currentCacheItem.label);
                    }
                }
                return selectedServices;
            },
            setServiceFilter: function (serviceLabels) {
                this.checkboxCache = [];
                domConstruct.empty(this.serviceCheckboxesFilterContainer);
                if (!serviceLabels || !serviceLabels.length) {
                    this._hideNode(this.serviceCheckboxesFilterOuterContainer);
                    return
                }
                this._showNode(this.serviceCheckboxesFilterOuterContainer);
                var i, currentServiceContainer, currentServiceLabel, currentServiceCheckbox;
                for (i = 0; i < serviceLabels.length; i++) {
                    currentServiceContainer = domConstruct.create("div", {className: "serviceFilterEntryContainer"});
                    currentServiceLabel = domConstruct.create("span", {innerHTML: serviceLabels[i]});
                    currentServiceCheckbox = domConstruct.create("input", {type: "checkbox"});
                    on(currentServiceCheckbox,"click", this.scopedRefreshResultsFxn);
                    domAttr.set(currentServiceCheckbox, "checked", true);
                    this.checkboxCache.push({checkbox: currentServiceCheckbox, label: serviceLabels[i]});
                    domConstruct.place(currentServiceCheckbox, currentServiceContainer);
                    domConstruct.place(currentServiceLabel, currentServiceContainer);
                    domConstruct.place(currentServiceContainer, this.serviceCheckboxesFilterContainer);
                }
            },

            setIconPlatformFilter: function (platforms) {
                this.iconPlatformCheckboxCache = [];
                domConstruct.empty(this.iconPlatformCheckboxesFilterContainer);
                if (!platforms || !platforms.length) {
                    this.hideIconPlatformsContainer();
                    return
                }
                this._showNode(this.iconPlatformCheckboxesFilterOuterContainer);
                var i, currentPlatformContainer, currentPlatformLabel, currentPlatformCheckbox;
                for (i = 0; i < platforms.length; i++) {
                    currentPlatformContainer = domConstruct.create("div", {className: "iconPlatformFilterEntryContainer"});
                    currentPlatformLabel = domConstruct.create("span", {innerHTML: platforms[i]});
                    currentPlatformCheckbox = domConstruct.create("input", {type: "checkbox"});
                    on(currentPlatformCheckbox, "click", this.scopedRefreshResultsFxn);
                    domAttr.set(currentPlatformCheckbox, "checked", true);
                    this.iconPlatformCheckboxCache.push({checkbox: currentPlatformCheckbox, label: platforms[i]});
                    domConstruct.place(currentPlatformCheckbox, currentPlatformContainer);
                    domConstruct.place(currentPlatformLabel, currentPlatformContainer);
                    domConstruct.place(currentPlatformContainer, this.iconPlatformCheckboxesFilterContainer);
                }
            }

        });
    })
;
