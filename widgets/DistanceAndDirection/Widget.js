///////////////////////////////////////////////////////////////////////////
// Copyright (c) 2015 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////

define([
  'dojo/_base/declare',
  'dojo/aspect',
  'dojo/topic',
  'dojo/on',
  'dijit/_WidgetsInTemplateMixin',
  'dijit/registry',
  'jimu/BaseWidget',
  'jimu/dijit/TabContainer3',
  './views/TabLine',
  './views/TabCircle',
  './views/TabEllipse',
  './views/TabRange'
], function (
  dojoDeclare,
  dojoAspect,
  dojoTopic,
  dojoOn,
  dijitWidgetsInTemplate,
  dijitRegistry,
  jimuBaseWidget,
  JimuTabContainer3,
  TabLine,
  TabCircle,
  TabEllipse,
  TabRange
) {
    'use strict';
    var clz = dojoDeclare([jimuBaseWidget, dijitWidgetsInTemplate], {
        baseClass: 'jimu-widget-DistanceAndDirection',

        /**
         *
         **/
        postCreate: function () {
            if(!this.config.feedback) {
                this.config.feedback = {};
            }

            this.lineTab = new TabLine({
                map: this.map,
                appConfig: this.appConfig,
                lineSymbol: this.config.feedback.lineSymbol || {
                    type: 'esriSLS',
                    style: 'esriSLSSolid',
                    color: [255, 50, 50, 255],
                    width: 1.25
                },
                pointSymbol: this.config.feedback.pointSymbol || {
                    'color': [255, 255, 255, 64],
                    'size': 12,
                    'type': 'esriSMS',
                    'style': 'esriSMSCircle',
                    'outline': {
                        'color': [0, 0, 0, 255],
                        'width': 1,
                        'type': 'esriSLS',
                        'style': 'esriSLSSolid'
                    }
                },
                labelSymbol : this.config.feedback.labelSymbol || {
                    'type' : 'esriTS',
                    'color' : [0, 0, 0, 255],
                    'verticalAlignment' : 'middle',
                    'horizontalAlignment' : 'center',
                    'xoffset' : 0,
                    'yoffset' : 0,
                    'kerning' : true,
                    'font' : {
                      'family' : 'arial',
                      'size' : 12,
                      'style' : 'normal',
                      'weight' : 'normal',
                      'decoration' : 'none'
                    }  
                }
            },
              this.lineTabNode
            );

            this.circleTab = new TabCircle({
                map: this.map,
                appConfig: this.appConfig,
                circleSymbol: this.config.feedback.circleSymbol || {
                    type: 'esriSFS',
                    style: 'esriSFSNull',
                    color: [255, 0, 0, 0],
                    outline: {
                        color: [255, 50, 50, 255],
                        width: 1.25,
                        type: 'esriSLS',
                        style: 'esriSLSSolid'
                    }
                },
                pointSymbol: this.config.feedback.pointSymbol || {
                    'color': [255, 255, 255, 64],
                    'size': 12,
                    'type': 'esriSMS',
                    'style': 'esriSMSCircle',
                    'outline': {
                        'color': [0, 0, 0, 255],
                        'width': 1,
                        'type': 'esriSLS',
                        'style': 'esriSLSSolid'
                    }
                },
                labelSymbol : this.config.feedback.labelSymbol || {
                    'type' : 'esriTS',
                    'color' : [0, 0, 0, 255],
                    'verticalAlignment' : 'middle',
                    'horizontalAlignment' : 'center',
                    'xoffset' : 0,
                    'yoffset' : 0,
                    'kerning' : true,
                    'font' : {
                      'family' : 'arial',
                      'size' : 12,
                      'style' : 'normal',
                      'weight' : 'normal',
                      'decoration' : 'none'
                    }
                }
            },
              this.circleTabNode
            );

            this.ellipseTab = new TabEllipse({
                map: this.map,
                appConfig: this.appConfig,
                ellipseSymbol: this.config.feedback.ellipseSymbol || {
                    type: 'esriSFS',
                    style: 'esriSFSNull',
                    color: [255, 0, 0, 125],
                    outline: {
                        color: [255, 50, 50, 255],
                        width: 1.25,
                        type: 'esriSLS',
                        style: 'esriSLSSolid'
                    }
                },
                pointSymbol: this.config.feedback.pointSymbol || {
                    'color': [255, 255, 255, 64],
                    'size': 12,
                    'type': 'esriSMS',
                    'style': 'esriSMSCircle',
                    'outline': {
                        'color': [0, 0, 0, 255],
                        'width': 1,
                        'type': 'esriSLS',
                        'style': 'esriSLSSolid'
                    }
                },
                labelSymbol : this.config.feedback.labelSymbol || {
                    'type' : 'esriTS',
                    'color' : [0, 0, 0, 255],
                    'verticalAlignment' : 'middle',
                    'horizontalAlignment' : 'center',
                    'xoffset' : 0,
                    'yoffset' : 0,
                    'kerning' : true,
                    'font' : {
                      'family' : 'arial',
                      'size' : 12,
                      'style' : 'normal',
                      'weight' : 'normal',
                      'decoration' : 'none'
                    }
                }
            },
              this.ellipseTabNode
            );

            this.rangeTab = new TabRange({
                map: this.map,
                appConfig: this.appConfig,
                pointSymbol: this.config.feedback.pointSymbol || {
                    'color': [255, 255, 255, 64],
                    'size': 12,
                    'type': 'esriSMS',
                    'style': 'esriSMSCircle',
                    'outline': {
                        'color': [0, 0, 0, 255],
                        'width': 1,
                        'type': 'esriSLS',
                        'style': 'esriSLSSolid'
                    }
                },
                circleSymbol: this.config.feedback.circleSymbol || {
                    type: 'esriSFS',
                    style: 'esriSFSNull',
                    color: [255, 0, 0, 0],
                    outline: {
                        color: [255, 50, 50, 255],
                        width: 1.25,
                        type: 'esriSLS',
                        style: 'esriSLSSolid'
                    }
                },
                lineSymbol: this.config.feedback.lineSymbol || {
                    type: 'esriSLS',
                    style: 'esriSLSSolid',
                    color: [255, 50, 50, 255],
                    width: 1.25
                },
                labelSymbol : this.config.feedback.labelSymbol || {
                    'type' : 'esriTS',
                    'color' : [0, 0, 255, 255],
                    'verticalAlignment' : 'middle',
                    'horizontalAlignment' : 'center',
                    'xoffset' : 0,
                    'yoffset' : 0,
                    'kerning' : true,
                    'font' : {
                      'family' : 'arial',
                      'size' : 6,
                      'style' : 'normal',
                      'weight' : 'normal',
                      'decoration' : 'none'
                    }
                }
            }, this.RangeTabContainer);

            /**
             *
             **/
            this.lineTab.on('graphic_created', function () {
                console.log('Widget notified that a graphic was created');
            });

            this.tab = new JimuTabContainer3({
                tabs: [
                  {
                      title: 'Lines',
                      content: this.lineTab
                  },
                  {
                      title: 'Circle',
                      content: this.circleTab
                  },
                  {
                      title: 'Ellipse',
                      content: this.ellipseTab
                  },
                  {
                      title: 'Rings',
                      content: this.rangeTab
                  }
                ]
            }, this.DDTabContainer);
            
            this.tab.selectTab('Lines');
            
            var tabContainer1 = dijitRegistry.byId('DDTabContainer');
    
            dojoAspect.after(tabContainer1, "selectTab", function() {
                dojoTopic.publish('TAB_SWITCHED');        
            });

            this.own(dojoOn(this.clearGraphicsButton, 'click', function () {
                dojoTopic.publish('DD_CLEAR_GRAPHICS');
            }));
        }
    });
    return clz;
});
