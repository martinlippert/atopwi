/*
 * Copyright (C) 2008 Apple Inc. All Rights Reserved.
 * Copyright (C) 2011 Google Inc. All Rights Reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY APPLE INC. ``AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL APPLE INC. OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

WebInspector.View = function(element)
{
    this.element = element || document.createElement("div");
    this._visible = false;
}

WebInspector.View.prototype = {
    get visible()
    {
        return this._visible;
    },

    set visible(x)
    {
        if (this._visible === x)
            return;

        if (x)
            this.show();
        else
            this.hide();
    },

    _innerShow: function()
    {
        this.element.addStyleClass("visible");
        this.restoreScrollPositions();
    },

    show: function(parentElement)
    {
        this._visible = true;
        if (parentElement && parentElement !== this.element.parentNode) {
            this.detach();
            parentElement.appendChild(this.element);
        }
        if (!this.element.parentNode && this.attach)
            this.attach();
        this._innerShow();
    },

    _innerHide: function()
    {
        this.storeScrollPositions();
        this.element.removeStyleClass("visible");
    },

    hide: function()
    {
        this._innerHide();
        this._visible = false;
    },

    detach: function()
    {
        if (this.element.parentNode)
            this.element.parentNode.removeChild(this.element);
    },

    storeScrollPositions: function()
    {
        this._scrollLeft = this.scrollLeft;
        this._scrollTop = this.scrollTop;
    },
    
    inheritScrollPositionsFromView: function(view)
    {
        this._scrollLeft = view._scrollLeft;
        this._scrollTop = view._scrollTop;
    },

    restoreScrollPositions: function()
    {
        this.scrollLeft = this._scrollLeft;
        this.scrollTop = this._scrollTop;
    }
}

WebInspector.View.prototype.__proto__ = WebInspector.Object.prototype;
