/* ===========================================================
# bootstrap-tour - v0.8.0
# http://bootstraptour.com
# ==============================================================
# Copyright 2012-2013 Ulrich Sossou
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
*/
!function(a,b){var c,d;return d=b.document,c=function(){function c(c){this._options=a.extend({name:"tour",container:"body",keyboard:!0,storage:b.localStorage,debug:!1,backdrop:!1,redirect:!0,orphan:!1,duration:!1,basePath:"",template:"<div class='popover tour-popover'> <div class='arrow'></div> <button class='btn btn-sm btn-link pull-right close-btn' data-role='end'><span aria-hidden='true' class='glyphicon glyphicon-remove'></span></button> <h3 class='popover-title'></h3> <div class='popover-content'></div> <div class='popover-navigation'> <button class='btn btn-link pull-left' data-role='prev'><span aria-hidden='true' class='glyphicon glyphicon-chevron-left'></span> Prev</button> <button class='btn btn-link  pull-right' data-role='next'>Next <span aria-hidden='true' class='glyphicon glyphicon-chevron-right'></span></button> </div> </div>",afterSetState:function(){},afterGetState:function(){},afterRemoveState:function(){},onStart:function(){},onEnd:function(){},onShow:function(){},onShown:function(){},onHide:function(){},onHidden:function(){},onNext:function(){},onPrev:function(){},onPause:function(){},onResume:function(){}},c),this._force=!1,this._inited=!1,this._steps=[],this.backdrop={overlay:null,$element:null,$background:null,backgroundShown:!1,overlayElementShown:!1}}return c.prototype.setState=function(a,b){var c,d;if(this._options.storage){d=""+this._options.name+"_"+a;try{this._options.storage.setItem(d,b)}catch(e){c=e,c.code===DOMException.QUOTA_EXCEEDED_ERR&&this.debug("LocalStorage quota exceeded. setState failed.")}return this._options.afterSetState(d,b)}return null==this._state&&(this._state={}),this._state[a]=b},c.prototype.removeState=function(a){var b;return this._options.storage?(b=""+this._options.name+"_"+a,this._options.storage.removeItem(b),this._options.afterRemoveState(b)):null!=this._state?delete this._state[a]:void 0},c.prototype.getState=function(a){var b,c;return this._options.storage?(b=""+this._options.name+"_"+a,c=this._options.storage.getItem(b)):null!=this._state&&(c=this._state[a]),(void 0===c||"null"===c)&&(c=null),this._options.afterGetState(a,c),c},c.prototype.addSteps=function(a){var b,c,d,e;for(e=[],c=0,d=a.length;d>c;c++)b=a[c],e.push(this.addStep(b));return e},c.prototype.addStep=function(a){return this._steps.push(a)},c.prototype.getStep=function(b){return null!=this._steps[b]?a.extend({id:"step-"+b,path:"",placement:"right",title:"",content:"<p></p>",next:b===this._steps.length-1?-1:b+1,prev:b-1,animation:!0,container:this._options.container,backdrop:this._options.backdrop,redirect:this._options.redirect,orphan:this._options.orphan,duration:this._options.duration,template:this._options.template,onShow:this._options.onShow,onShown:this._options.onShown,onHide:this._options.onHide,onHidden:this._options.onHidden,onNext:this._options.onNext,onPrev:this._options.onPrev,onPause:this._options.onPause,onResume:this._options.onResume},this._steps[b]):void 0},c.prototype.init=function(a){var b=this;return this._force=a,this.ended()?this._debug("Tour ended, init prevented."):(this.setCurrentStep(),this._setupMouseNavigation(),this._setupKeyboardNavigation(),this._onResize(function(){return b.showStep(b._current)}),null!==this._current&&this.showStep(this._current),this._inited=!0,this)},c.prototype.start=function(a){var b;return null==a&&(a=!1),this._inited||this.init(a),null===this._current?(b=this._makePromise(null!=this._options.onStart?this._options.onStart(this):void 0),this._callOnPromiseDone(b,this.showStep,0)):void 0},c.prototype.next=function(){var a;return this.ended()?this._debug("Tour ended, next prevented."):(a=this.hideStep(this._current),this._callOnPromiseDone(a,this._showNextStep))},c.prototype.prev=function(){var a;return this.ended()?this._debug("Tour ended, prev prevented."):(a=this.hideStep(this._current),this._callOnPromiseDone(a,this._showPrevStep))},c.prototype.goTo=function(a){var b;return this.ended()?this._debug("Tour ended, goTo prevented."):(b=this.hideStep(this._current),this._callOnPromiseDone(b,this.showStep,a))},c.prototype.end=function(){var c,e,f=this;return c=function(){return a(d).off("click.tour-"+f._options.name),a(d).off("keyup.tour-"+f._options.name),a(b).off("resize.tour-"+f._options.name),f.setState("end","yes"),f._inited=!1,f._force=!1,f._clearTimer(),null!=f._options.onEnd?f._options.onEnd(f):void 0},e=this.hideStep(this._current),this._callOnPromiseDone(e,c)},c.prototype.ended=function(){return!this._force&&!!this.getState("end")},c.prototype.restart=function(){return this.removeState("current_step"),this.removeState("end"),this.setCurrentStep(0),this.start()},c.prototype.pause=function(){var a;return a=this.getStep(this._current),a&&a.duration?(this._paused=!0,this._duration-=(new Date).getTime()-this._start,b.clearTimeout(this._timer),this._debug("Paused/Stopped step "+(this._current+1)+" timer ("+this._duration+" remaining)."),null!=a.onPause?a.onPause(this,this._duration):void 0):void 0},c.prototype.resume=function(){var a,c=this;return a=this.getStep(this._current),a&&a.duration?(this._paused=!1,this._start=(new Date).getTime(),this._duration=this._duration||a.duration,this._timer=b.setTimeout(function(){return c._isLast()?c.next():c.end()},this._duration),this._debug("Started step "+(this._current+1)+" timer with duration "+this._duration),null!=a.onResume&&this._duration!==a.duration?a.onResume(this,this._duration):void 0):void 0},c.prototype.hideStep=function(b){var c,d,e,f=this;return(e=this.getStep(b))?(this._clearTimer(),d=this._makePromise(null!=e.onHide?e.onHide(this,b):void 0),c=function(){var b;return b=a(e.element),b.data("bs.popover")||b.data("popover")||(b=a("body")),b.popover("destroy"),e.reflex&&b.css("cursor","").off("click.tour-"+f._options.name),e.backdrop&&f._hideBackdrop(),null!=e.onHidden?e.onHidden(f):void 0},this._callOnPromiseDone(d,c),d):void 0},c.prototype.showStep=function(b){var c,e,f,g,h=this;return(g=this.getStep(b))?(f=b<this._current,c=this._makePromise(null!=g.onShow?g.onShow(this,b):void 0),e=function(){var c,e;if(h.setCurrentStep(b),e=a.isFunction(g.path)?g.path.call():h._options.basePath+g.path,c=[d.location.pathname,d.location.hash].join(""),h._isRedirect(e,c))return h._redirect(g,e),void 0;if(h._isOrphan(g)){if(!g.orphan)return h._debug("Skip the orphan step "+(h._current+1)+". Orphan option is false and the element doesn't exist or is hidden."),f?h._showPrevStep():h._showNextStep(),void 0;h._debug("Show the orphan step "+(h._current+1)+". Orphans option is true.")}return g.backdrop&&h._showBackdrop(h._isOrphan(g)?void 0:g.element),h._scrollIntoView(g.element,function(){return null!=g.element&&g.backdrop&&h._showOverlayElement(g.element),h._showPopover(g,b),null!=g.onShown&&g.onShown(h),h._debug("Step "+(h._current+1)+" of "+h._steps.length)}),g.duration?h.resume():void 0},this._callOnPromiseDone(c,e),c):void 0},c.prototype.getCurrentStep=function(){return this._current},c.prototype.setCurrentStep=function(a){return null!=a?(this._current=a,this.setState("current_step",a)):(this._current=this.getState("current_step"),this._current=null===this._current?null:parseInt(this._current,10)),this},c.prototype._showNextStep=function(){var a,b,c,d=this;return c=this.getStep(this._current),b=function(){return d.showStep(c.next)},a=this._makePromise(null!=c.onNext?c.onNext(this):void 0),this._callOnPromiseDone(a,b)},c.prototype._showPrevStep=function(){var a,b,c,d=this;return c=this.getStep(this._current),b=function(){return d.showStep(c.prev)},a=this._makePromise(null!=c.onPrev?c.onPrev(this):void 0),this._callOnPromiseDone(a,b)},c.prototype._debug=function(a){return this._options.debug?b.console.log("Bootstrap Tour '"+this._options.name+"' | "+a):void 0},c.prototype._isRedirect=function(a,b){return null!=a&&""!==a&&a.replace(/\?.*$/,"").replace(/\/?$/,"")!==b.replace(/\/?$/,"")},c.prototype._redirect=function(b,c){return a.isFunction(b.redirect)?b.redirect.call(this,c):b.redirect===!0?(this._debug("Redirect to "+c),d.location.href=c):void 0},c.prototype._isOrphan=function(b){return null==b.element||!a(b.element).length||a(b.element).is(":hidden")&&"http://www.w3.org/2000/svg"!==a(b.element)[0].namespaceURI},c.prototype._isLast=function(){return this._current<this._steps.length-1},c.prototype._showPopover=function(b,c){var d,e,f,g,h,i,j=this;return i=a.extend({},this._options),f=a.isFunction(b.template)?a(b.template(c,b)):a(b.template),e=f.find(".popover-navigation"),h=this._isOrphan(b),h&&(b.element="body",b.placement="top",f=f.addClass("orphan")),d=a(b.element),f.addClass("tour-"+this._options.name),b.options&&a.extend(i,b.options),b.reflex&&d.css("cursor","pointer").on("click.tour-"+this._options.name,function(){return j._isLast()?j.next():j.end()}),b.prev<0&&e.find("*[data-role=prev]").addClass("disabled"),b.next<0&&e.find("*[data-role=next]").addClass("disabled"),b.duration||e.find("*[data-role='pause-resume']").remove(),b.template=f.clone().wrap("<div>").parent().html(),d.popover({placement:b.placement,trigger:"manual",title:b.title,content:b.content,html:!0,animation:b.animation,container:b.container,template:b.template,selector:b.element}).popover("show"),g=d.data("bs.popover")?d.data("bs.popover").tip():d.data("popover").tip(),g.attr("id",b.id),this._reposition(g,b),h?this._center(g):void 0},c.prototype._reposition=function(b,c){var e,f,g,h,i,j,k;if(h=b[0].offsetWidth,f=b[0].offsetHeight,k=b.offset(),i=k.left,j=k.top,e=a(d).outerHeight()-k.top-b.outerHeight(),0>e&&(k.top=k.top+e),g=a("html").outerWidth()-k.left-b.outerWidth(),0>g&&(k.left=k.left+g),k.top<0&&(k.top=0),k.left<0&&(k.left=0),b.offset(k),"bottom"===c.placement||"top"===c.placement){if(i!==k.left)return this._replaceArrow(b,2*(k.left-i),h,"left")}else if(j!==k.top)return this._replaceArrow(b,2*(k.top-j),f,"top")},c.prototype._center=function(c){return c.css("top",a(b).outerHeight()/2-c.outerHeight()/2)},c.prototype._replaceArrow=function(a,b,c,d){return a.find(".arrow").css(d,b?50*(1-b/c)+"%":"")},c.prototype._scrollIntoView=function(c,d){var e,f,g,h,i,j,k=this;return e=a(c),e.length?(f=a(b),h=e.offset().top,j=f.height(),i=Math.max(0,h-j/2),this._debug("Scroll into view. ScrollTop: "+i+". Element offset: "+h+". Window height: "+j+"."),g=0,a("body,html").stop(!0,!0).animate({scrollTop:Math.ceil(i)},function(){return 2===++g?(d(),k._debug("Scroll into view. Animation end element offset: "+e.offset().top+". Window height: "+f.height()+".")):void 0})):d()},c.prototype._onResize=function(c,d){return a(b).on("resize.tour-"+this._options.name,function(){return clearTimeout(d),d=setTimeout(c,100)})},c.prototype._setupMouseNavigation=function(){var b=this;return b=this,a(d).off("click.tour-"+this._options.name,".popover.tour-"+this._options.name+" *[data-role=next]:not(.disabled)").on("click.tour-"+this._options.name,".popover.tour-"+this._options.name+" *[data-role=next]:not(.disabled)",function(a){return a.preventDefault(),b.next()}),a(d).off("click.tour-"+this._options.name,".popover.tour-"+this._options.name+" *[data-role=prev]:not(.disabled)").on("click.tour-"+this._options.name,".popover.tour-"+this._options.name+" *[data-role=prev]:not(.disabled)",function(a){return a.preventDefault(),b.prev()}),a(d).off("click.tour-"+this._options.name,".popover.tour-"+this._options.name+" *[data-role=end]").on("click.tour-"+this._options.name,".popover.tour-"+this._options.name+" *[data-role=end]",function(a){return a.preventDefault(),b.end()}),a(d).off("click.tour-"+this._options.name,".popover.tour-"+this._options.name+" *[data-role=pause-resume]").on("click.tour-"+this._options.name,".popover.tour-"+this._options.name+" *[data-role=pause-resume]",function(c){var d;return c.preventDefault(),d=a(this),d.text(b._paused?d.data("pause-text"):d.data("resume-text")),b._paused?b.resume():b.pause()})},c.prototype._setupKeyboardNavigation=function(){var b=this;if(this._options.keyboard)return a(d).on("keyup.tour-"+this._options.name,function(a){if(a.which)switch(a.which){case 39:return a.preventDefault(),b._isLast()?b.next():b.end();case 37:if(a.preventDefault(),b._current>0)return b.prev();break;case 27:return a.preventDefault(),b.end()}})},c.prototype._makePromise=function(b){return b&&a.isFunction(b.then)?b:null},c.prototype._callOnPromiseDone=function(a,b,c){var d=this;return a?a.then(function(){return b.call(d,c)}):b.call(this,c)},c.prototype._showBackdrop=function(){return this.backdrop.backgroundShown?void 0:(this.backdrop=a("<div/>",{"class":"tour-backdrop"}),this.backdrop.backgroundShown=!0,a("body").append(this.backdrop))},c.prototype._hideBackdrop=function(){return this._hideOverlayElement(),this._hideBackground()},c.prototype._hideBackground=function(){return this.backdrop.remove(),this.backdrop.overlay=null,this.backdrop.backgroundShown=!1},c.prototype._showOverlayElement=function(b){var c,d,e;if(!this.backdrop.overlayElementShown)return this.backdrop.overlayElementShown=!0,d=a(b),c=a("<div/>"),e=d.offset(),e.top=e.top,e.left=e.left,c.width(d.innerWidth()).height(d.innerHeight()).addClass("tour-step-background").offset(e),d.addClass("tour-step-backdrop"),a("body").append(c),this.backdrop.$element=d,this.backdrop.$background=c},c.prototype._hideOverlayElement=function(){return this.backdrop.overlayElementShown?(this.backdrop.$element.removeClass("tour-step-backdrop"),this.backdrop.$background.remove(),this.backdrop.$element=null,this.backdrop.$background=null,this.backdrop.overlayElementShown=!1):void 0},c.prototype._clearTimer=function(){return b.clearTimeout(this._timer),this._timer=null,this._duration=null},c}(),b.Tour=c}(jQuery,window);