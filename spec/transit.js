(function() {
  var Bit, Byte, Rect, Thenable, Transit, Tweenable, h, ns, svg;

  Byte = mojs.Transit;

  Transit = mojs.Transit;

  Bit = mojs.shapesMap.getShape('bit');

  Thenable = mojs.Thenable;

  Tweenable = mojs.Tweenable;

  Rect = mojs.shapesMap.getShape('rect');

  h = mojs.helpers;

  ns = 'http://www.w3.org/2000/svg';

  svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, 'svg') : void 0;

  console.warn = function() {};

  console.error = function() {};

  describe('Transit ->', function() {
    describe('_vars method', function() {
      it('should have own _vars function ->', function() {
        var byte;
        byte = new Byte;
        expect(byte._vars).toBeDefined();
        return expect(function() {
          return byte._vars();
        }).not.toThrow();
      });
      return it('should call _vars super method', function() {
        var byte;
        byte = new Byte;
        return expect(byte._history.length).toBe(1);
      });
    });
    describe('extension ->', function() {
      it('should extend Tweenable class', function() {
        var byte;
        byte = new Byte;
        return expect(byte instanceof Tweenable).toBe(true);
      });
      return it('should extend Thenable class', function() {
        var byte;
        byte = new Byte;
        return expect(byte instanceof Thenable).toBe(true);
      });
    });
    describe('defaults object ->', function() {
      return it('should have defaults object', function() {
        var byte;
        byte = new Byte;
        expect(byte._defaults).toBeDefined();
        expect(byte._defaults.stroke).toBe('transparent');
        expect(byte._defaults.strokeOpacity).toBe(1);
        expect(byte._defaults.strokeLinecap).toBe('');
        expect(byte._defaults.strokeWidth).toBe(2);
        expect(byte._defaults.strokeDasharray).toBe(0);
        expect(byte._defaults.strokeDashoffset).toBe(0);
        expect(byte._defaults.fill).toBe('deeppink');
        expect(byte._defaults.fillOpacity).toBe(1);
        expect(byte._defaults.left).toBe(0);
        expect(byte._defaults.top).toBe(0);
        expect(byte._defaults.x).toBe(0);
        expect(byte._defaults.y).toBe(0);
        expect(byte._defaults.rx).toBe(0);
        expect(byte._defaults.ry).toBe(0);
        expect(byte._defaults.angle).toBe(0);
        expect(byte._defaults.scale).toBe(1);
        expect(byte._defaults.opacity).toBe(1);
        expect(byte._defaults.points).toBe(3);
        expect(byte._defaults.radius[0]).toBe(50);
        expect(byte._defaults.radiusX).toBe(null);
        expect(byte._defaults.radiusY).toBe(null);
        expect(byte._defaults.isShowEnd).toBe(false);
        expect(byte._defaults.isShowStart).toBe(false);
        expect(byte._defaults.size).toBe(null);
        expect(byte._defaults.callbacksContext).toBe(null);
        return expect(byte._defaults.sizeGap).toBe(0);
      });
    });
    describe('_transformTweenOptions method ->', function() {
      describe('onUpdate callback override ->', function() {
        it('should override this._o.onUpdate', function() {
          var tr;
          tr = new Transit;
          return expect(typeof tr._o.onUpdate).toBe('function');
        });
        it('should not override onUpdate function if exists', function() {
          var args, isRightScope, options, tr;
          isRightScope = null;
          args = null;
          options = {
            onUpdate: function() {
              isRightScope = this === tr;
              return args = arguments;
            }
          };
          tr = new Transit(options);
          expect(typeof tr._o.onUpdate).toBe('function');
          tr.timeline.setProgress(0);
          tr.timeline.setProgress(.1);
          expect(isRightScope).toBe(true);
          expect(args[0]).toBe(.1);
          expect(args[1]).toBe(.1);
          expect(args[2]).toBe(true);
          return expect(args[3]).toBe(false);
        });
        return it('should call _setProgress method', function() {
          var options, progress, tr;
          options = {
            onUpdate: function() {}
          };
          tr = new Transit(options);
          tr.timeline.setProgress(0);
          spyOn(tr, '_setProgress');
          progress = .1;
          tr.timeline.setProgress(progress);
          return expect(tr._setProgress).toHaveBeenCalledWith(progress);
        });
      });
      describe('onStart callback override ->', function() {
        return it('should override this._o.onStart', function() {
          var tr;
          tr = new Transit;
          expect(typeof tr._o.onStart).toBe('function');
          it('should not override onStart function if exists', function() {
            var args, isRightScope, options;
            isRightScope = null;
            args = null;
            options = {
              onStart: function() {
                isRightScope = this === tr;
                return args = arguments;
              }
            };
            tr = new Transit(options);
            expect(typeof tr._o.onStart).toBe('function');
            tr.timeline.setProgress(0);
            tr.timeline.setProgress(.1);
            expect(isRightScope).toBe(true);
            expect(args[0]).toBe(true);
            return expect(args[1]).toBe(false);
          });
          it('should show module ', function() {
            tr = new Transit;
            tr.timeline.setProgress(0);
            spyOn(tr, '_show').and.callThrough();
            tr.timeline.setProgress(.1);
            return expect(tr._show).toHaveBeenCalled();
          });
          it('should hide module ', function() {
            tr = new Transit;
            tr.timeline.setProgress(.1);
            spyOn(tr, '_hide').and.callThrough();
            tr.timeline.setProgress(0);
            return expect(tr._hide).toHaveBeenCalled();
          });
          return it('should not hide module is isShowStart was set', function() {
            tr = new Transit({
              isShowStart: true
            });
            tr.timeline.setProgress(.2);
            tr.timeline.setProgress(.1);
            spyOn(tr, '_hide').and.callThrough();
            tr.timeline.setProgress(0);
            return expect(tr._hide).not.toHaveBeenCalled();
          });
        });
      });
      return describe('onComplete callback override ->', function() {
        it('should override this._o.onComplete', function() {
          var tr;
          tr = new Transit;
          return expect(typeof tr._o.onComplete).toBe('function');
        });
        it('should not override onComplete function if exists', function() {
          var args, isRightScope, options, tr;
          isRightScope = null;
          args = null;
          options = {
            onComplete: function() {
              isRightScope = this === tr;
              return args = arguments;
            }
          };
          tr = new Transit(options);
          expect(typeof tr._o.onComplete).toBe('function');
          tr.timeline.setProgress(0);
          tr.timeline.setProgress(.1);
          tr.timeline.setProgress(.8);
          tr.timeline.setProgress(1);
          expect(isRightScope).toBe(true);
          expect(args[0]).toBe(true);
          return expect(args[1]).toBe(false);
        });
        it('should call _show method', function() {
          var tr;
          tr = new Transit;
          tr.timeline.setProgress(1);
          spyOn(tr, '_show').and.callThrough();
          tr.timeline.setProgress(.9);
          return expect(tr._show).toHaveBeenCalled();
        });
        it('should call _hide method', function() {
          var tr;
          tr = new Transit;
          tr.timeline.setProgress(0);
          spyOn(tr, '_hide').and.callThrough();
          tr.timeline.setProgress(.1);
          tr.timeline.setProgress(1);
          return expect(tr._hide).toHaveBeenCalled();
        });
        return it('should not call _hide method if isShowEnd is set', function() {
          var tr;
          tr = new Transit({
            isShowEnd: true
          });
          tr.timeline.setProgress(0);
          spyOn(tr, '_hide').and.callThrough();
          tr.timeline.setProgress(.1);
          tr.timeline.setProgress(1);
          return expect(tr._hide).not.toHaveBeenCalled();
        });
      });
    });
    describe('origin object ->', function() {
      return it('should have origin object', function() {
        var byte;
        byte = new Byte;
        expect(byte.origin).toBeDefined();
        return expect(typeof byte.origin).toBe('object');
      });
    });
    describe('options object ->', function() {
      it('should receive empty options object by default', function() {
        var byte;
        byte = new Byte;
        return expect(byte._o).toBeDefined();
      });
      return it('should receive options object', function() {
        var byte;
        byte = new Byte({
          option: 1
        });
        return expect(byte._o.option).toBe(1);
      });
    });
    describe('index option ->', function() {
      it('should receive index option', function() {
        var byte;
        byte = new Transit({
          index: 5
        });
        return expect(byte._index).toBe(5);
      });
      return it('should fallback to 0', function() {
        var byte;
        byte = new Transit;
        return expect(byte._index).toBe(0);
      });
    });
    describe('options history ->', function() {
      it('should have history array', function() {
        var byte;
        byte = new Byte;
        return expect(h.isArray(byte._history)).toBe(true);
      });
      return it('should save options to history array', function() {
        var byte;
        byte = new Byte({
          radius: 20
        });
        return expect(byte._history.length).toBe(1);
      });
    });
    describe('size calculations ->', function() {
      it('should calculate size el size depending on largest value', function() {
        var byte;
        byte = new Byte({
          radius: {
            25: -100
          },
          strokeWidth: {
            6: 4
          }
        });
        return expect(byte._props.size).toBe(212);
      });
      it('should calculate size el size based on radiusX/Y', function() {
        var byte;
        byte = new Byte({
          radius: {
            25: -100
          },
          radiusX: 200,
          strokeWidth: {
            6: 4
          }
        });
        return expect(byte._props.size).toBe(412);
      });
      it('should calculate size el size based on radiusX/Y', function() {
        var byte;
        byte = new Byte({
          radius: {
            25: -100
          },
          radiusX: 200,
          radiusY: 300,
          strokeWidth: {
            6: 4
          }
        });
        return expect(byte._props.size).toBe(612);
      });
      it('should calculate size el size based on radiusX/Y', function() {
        var byte;
        byte = new Byte({
          radius: {
            25: -100
          },
          radiusY: 30,
          strokeWidth: {
            6: 4
          }
        });
        return expect(byte._props.size).toBe(212);
      });
      it('should calculate size el size based on radiusX/Y', function() {
        var byte;
        byte = new Byte({
          radius: 50,
          radiusY: 30,
          strokeWidth: {
            6: 4
          }
        });
        return expect(byte._props.size).toBe(112);
      });
      it('should have sizeGap option', function() {
        var byte;
        byte = new Byte({
          radius: {
            25: -100
          },
          strokeWidth: {
            6: 4
          },
          sizeGap: 40
        });
        return expect(byte._props.size).toBe(292);
      });
      it('should calculate size el size depending on shape\'s ratio', function() {
        var byte, rect;
        byte = new Byte({
          radius: {
            25: -100
          },
          strokeWidth: {
            6: 4
          },
          shape: 'rect'
        });
        svg = document.createElementNS(ns, 'svg');
        rect = new Rect({
          ctx: svg
        });
        return expect(byte._props.size).toBe(212 * rect.ratio);
      });
      it('should not calculate size el size if size was passed', function() {
        var byte;
        byte = new Byte({
          radius: 100,
          strokeWidth: 5,
          size: 400
        });
        return expect(byte._props.size).toBe(400);
      });
      it('should not calculate size el size if external context was passed', function() {
        var byte;
        byte = new Byte({
          radius: 100,
          strokeWidth: 5,
          size: 400,
          ctx: svg
        });
        return expect(byte._props.size).toBe(400);
      });
      it('should calculate center based on el size', function() {
        var byte;
        byte = new Byte({
          radius: {
            25: -100
          },
          strokeWidth: {
            4: 6
          }
        });
        expect(byte._props.size).toBe(212);
        return expect(byte._props.center).toBe(106);
      });
      it('should increase size if elastic.out/inout easing', function() {
        var byte;
        byte = new Byte({
          radius: {
            25: -100
          },
          strokeWidth: {
            4: 6
          },
          easing: 'Elastic.Out'
        });
        expect(byte._props.size).toBe(212 * 1.25);
        expect(byte._props.center).toBe(byte._props.size / 2);
        byte = new Byte({
          radius: {
            25: -100
          },
          strokeWidth: {
            4: 6
          },
          easing: 'Elastic.InOut'
        });
        expect(byte._props.size).toBe(212 * 1.25);
        return expect(byte._props.center).toBe(byte._props.size / 2);
      });
      return it('should increase size if back.out/inout easing', function() {
        var byte;
        byte = new Byte({
          radius: {
            25: -100
          },
          strokeWidth: {
            4: 6
          },
          easing: 'back.Out'
        });
        expect(byte._props.size).toBe(212 * 1.1);
        expect(byte._props.center).toBe(byte._props.size / 2);
        byte = new Byte({
          radius: {
            25: -100
          },
          strokeWidth: {
            4: 6
          },
          easing: 'Back.InOut'
        });
        expect(byte._props.size).toBe(212 * 1.1);
        return expect(byte._props.center).toBe(byte._props.size / 2);
      });
    });
    describe('el creation ->', function() {
      it('should create el', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        return expect(byte.el.tagName.toLowerCase()).toBe('div');
      });
      it('should create context', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        return expect(byte.el.firstChild.tagName.toLowerCase()).toBe('svg');
      });
      it('should set context styles', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        svg = byte.el.firstChild;
        expect(svg.style.position).toBe('absolute');
        expect(svg.style.width).toBe('100%');
        return expect(svg.style.height).toBe('100%');
      });
      it('should not create context and el if context was passed', function() {
        var byte;
        svg.isSvg = true;
        byte = new Byte({
          ctx: svg
        });
        expect(byte.el).toBe(byte.bit.el);
        expect(byte.ctx).toBeDefined();
        return expect(byte.ctx.isSvg).toBe(true);
      });
      it('should set el size', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          strokeWidth: 2,
          x: 10,
          y: 20
        });
        expect(byte.el.style.position).toBe('absolute');
        expect(byte.el.style.width).toBe('54px');
        expect(byte.el.style.height).toBe('54px');
        expect(byte.el.style.display).toBe('none');
        expect(byte.el.style['margin-left']).toBe('-27px');
        expect(byte.el.style['margin-top']).toBe('-27px');
        expect(byte.el.style['marginLeft']).toBe('-27px');
        expect(byte.el.style['marginTop']).toBe('-27px');
        return expect(byte._isShown).toBe(false);
      });
      it('should skip props if foreign context', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          strokeWidth: 2,
          x: 10,
          y: 20,
          ctx: svg
        });
        expect(byte.el.style.display).toBe('none');
        expect(byte.el.style.opacity).toBe('1');
        expect(byte.el.style.position).not.toBe('absolute');
        expect(byte.el.style.width).not.toBe('54px');
        expect(byte.el.style.height).not.toBe('54px');
        expect(byte.el.style['margin-left']).not.toBe('-27px');
        expect(byte.el.style['margin-top']).not.toBe('-27px');
        expect(byte.el.style['marginLeft']).not.toBe('-27px');
        expect(byte.el.style['marginTop']).not.toBe('-27px');
        return expect(byte._isShown).toBe(false);
      });
      it('should set display: block if isShowStart was passed', function() {
        var byte;
        byte = new Byte({
          isShowStart: true
        });
        expect(byte.el.style.display).toBe('block');
        return expect(byte._isShown).toBe(true);
      });
      it('should set el size', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          strokeWidth: 2,
          x: 10,
          y: 20
        });
        byte.isRendered = false;
        h.remBase = 8;
        byte._render();
        h.remBase = 16;
        expect(byte.el.style.position).toBe('absolute');
        expect(byte.el.style.width).toBe('54px');
        expect(byte.el.style.height).toBe('54px');
        expect(byte.el.style['margin-left']).toBe('-27px');
        expect(byte.el.style['margin-top']).toBe('-27px');
        expect(byte.el.style['marginLeft']).toBe('-27px');
        return expect(byte.el.style['marginTop']).toBe('-27px');
      });
      it('should create bit', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        expect(byte.bit).toBeDefined();
        return expect(byte.bit.o.isDrawLess).toBe(true);
      });
      it('should create bit based on shape option or fallback to circle', function() {
        var byte, byte2;
        byte = new Byte({
          radius: 25,
          shape: 'rect'
        });
        byte2 = new Byte({
          radius: 25
        });
        expect(byte.bit.shape).toBe('rect');
        return expect(byte2.bit.shape).toBe('ellipse');
      });
      it('should add itself to body', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        return expect(byte.el.parentNode.tagName.toLowerCase()).toBe('body');
      });
      return it('should add itself to parent if the option was passed', function() {
        var byte, div;
        div = typeof document.createElement === "function" ? document.createElement('div') : void 0;
        div.isDiv = true;
        byte = new Byte({
          radius: 25,
          parent: div
        });
        return expect(byte.el.parentNode.isDiv).toBe(true);
      });
    });
    describe('opacity set ->', function() {
      return it('should set a position with respect to units', function() {
        var byte;
        byte = new Byte({
          opacity: .5
        });
        return expect(byte.el.style.opacity).toBe('0.5');
      });
    });
    describe('position set ->', function() {
      return describe('x/y coordinates ->', function() {
        it('should set a position with respect to units', function() {
          var byte;
          byte = new Byte({
            left: 100,
            top: 50
          });
          expect(byte.el.style.left).toBe('100px');
          return expect(byte.el.style.top).toBe('50px');
        });
        it('should animate position', function(dfr) {
          var byte;
          byte = new Byte({
            left: {
              100: '200px'
            },
            duration: 100,
            onComplete: function() {
              expect(byte.el.style.left).toBe('200px');
              return dfr();
            }
          });
          return byte.play();
        });
        it('should animate position with respect to units', function(dfr) {
          var byte;
          byte = new Byte({
            left: {
              '20%': '50%'
            },
            duration: 100
          });
          byte.play();
          return setTimeout(function() {
            expect(byte.el.style.left).toBe('50%');
            return dfr();
          }, 500);
        });
        it('end unit that were not specified should fallback to start unit', function() {
          var byte;
          byte = new Byte({
            left: {
              '20%': 50
            },
            duration: 200
          });
          byte.play();
          expect(byte._deltas.left.start.unit).toBe('%');
          return expect(byte._deltas.left.end.unit).toBe('%');
        });
        it('should fallback to end units if units are different', function(dfr) {
          var byte;
          byte = new Byte({
            left: {
              '20%': '50px'
            },
            duration: 200,
            onComplete: function() {
              expect(byte.el.style.left).toBe('50px');
              return dfr();
            }
          });
          return byte.play();
        });
        return describe('x/y coordinates ->', function() {
          it('should set a position with respect to units', function() {
            var byte, s, tr;
            byte = new Byte({
              x: 100,
              y: 50
            });
            s = byte.el.style;
            tr = s.transform || s["" + mojs.h.prefix.css + "transform"];
            return expect(tr).toBe('translate(100px, 50px) scale(1)');
          });
          it('should animate position', function(dfr) {
            var byte;
            byte = new Byte({
              x: {
                100: '200px'
              },
              duration: 200,
              onComplete: function() {
                var s, tr;
                s = byte.el.style;
                tr = s.transform || s["" + mojs.h.prefix.css + "transform"];
                expect(tr).toBe('translate(200px, 0px) scale(1)');
                return dfr();
              }
            });
            return byte.play();
          });
          it('should animate position with respect to units', function(dfr) {
            var byte;
            byte = new Byte({
              x: {
                '20%': '50%'
              },
              duration: 200,
              onComplete: function() {
                var s, tr;
                s = byte.el.style;
                tr = s.transform || s["" + mojs.h.prefix.css + "transform"];
                expect(tr).toBe('translate(50%, 0px) scale(1)');
                return dfr();
              }
            });
            return byte.play();
          });
          return it('should fallback to end units if units are differnt', function(dfr) {
            var byte;
            byte = new Byte({
              x: {
                '20%': '50px'
              },
              y: {
                0: '50%'
              },
              duration: 200,
              onComplete: function() {
                var s, tr;
                s = byte.el.style;
                tr = s.transform || s["" + mojs.h.prefix.css + "transform"];
                expect(tr).toBe('translate(50px, 50%) scale(1)');
                return dfr();
              }
            });
            return byte.play();
          });
        });
      });
    });
    describe('_render method ->', function() {
      it('should call draw method', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        spyOn(byte, '_draw');
        byte._render();
        return expect(byte._draw).toHaveBeenCalled();
      });
      it('should call _setElStyles method', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        spyOn(byte, '_setElStyles');
        byte._render();
        return expect(byte._setElStyles).toHaveBeenCalled();
      });
      it('should call _createBit method', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        spyOn(byte, '_createBit');
        byte.isRendered = false;
        byte._render();
        return expect(byte._createBit).toHaveBeenCalled();
      });
      it('should set isRendered to true method', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        expect(byte.isRendered).toBe(true);
        byte.isRendered = false;
        byte._render();
        return expect(byte.isRendered).toBe(true);
      });
      it('should call _calcSize method', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        spyOn(byte, '_calcSize');
        byte.isRendered = false;
        byte._render();
        return expect(byte._calcSize).toHaveBeenCalled();
      });
      return it('should not create new el', function() {
        var byte, cnt;
        byte = new Byte({
          radius: 25
        });
        cnt = document.body.children.length;
        byte._render(true);
        return expect(cnt).toBe(document.body.children.length);
      });
    });
    describe('_draw method ->', function() {
      it('should call _setProp method', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        spyOn(byte.bit, 'setProp');
        byte._draw();
        return expect(byte.bit.setProp).toHaveBeenCalled();
      });
      it('should set all attributes to shape\'s properties', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          x: 20,
          y: 30,
          rx: 15,
          ry: 25,
          stroke: 'red',
          strokeWidth: 2,
          strokeOpacity: .5,
          strokeLinecap: 'round',
          strokeDasharray: 200,
          strokeDashoffset: 100,
          fill: 'cyan',
          fillOpacity: .5,
          radius: 100,
          radiusX: 22,
          radiusY: {
            20: 0
          },
          points: 4
        });
        byte._draw();
        expect(byte.bit.props.x).toBe(byte.origin.x);
        expect(byte.bit.props.y).toBe(byte.origin.y);
        expect(byte.bit.props.rx).toBe(byte._props.rx);
        expect(byte.bit.props.ry).toBe(byte._props.ry);
        expect(byte.bit.props.stroke).toBe(byte._props.stroke);
        expect(byte.bit.props['stroke-width']).toBe(byte._props.strokeWidth);
        expect(byte.bit.props['stroke-opacity']).toBe(byte._props.strokeOpacity);
        expect(byte.bit.props['stroke-linecap']).toBe(byte._props.strokeLinecap);
        expect(byte.bit.props['stroke-dasharray']).toBe(byte._props.strokeDasharray[0].value + ' ');
        expect(byte.bit.props['stroke-dashoffset']).toBe(byte._props.strokeDashoffset[0].value + ' ');
        expect(byte.bit.props['fill']).toBe(byte._props.fill);
        expect(byte.bit.props['fill-opacity']).toBe(byte._props.fillOpacity);
        expect(byte.bit.props['radius']).toBe(byte._props.radius);
        expect(byte.bit.props['radiusX']).toBe(byte._props.radiusX);
        expect(byte.bit.props['radiusY']).toBe(byte._props.radiusY);
        expect(byte.bit.props['points']).toBe(byte._props.points);
        return expect(byte.bit.props['transform']).toBe(byte._calcShapeTransform());
      });
      it('should set x/y to center', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        byte._draw();
        expect(byte.bit.props.x).toBe(byte._props.center);
        return expect(byte.bit.props.y).toBe(byte._props.center);
      });
      it('should set x/y to props.x/props.y if context was passed', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          ctx: svg
        });
        byte._draw();
        expect(byte.bit.props.x).toBe(parseFloat(byte._props.x));
        return expect(byte.bit.props.y).toBe(parseFloat(byte._props.y));
      });
      it('should call bit._draw method', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        spyOn(byte.bit, 'draw');
        byte._draw();
        return expect(byte.bit.draw).toHaveBeenCalled();
      });
      it('should call _drawEl method', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        spyOn(byte, '_drawEl');
        byte._draw();
        return expect(byte._drawEl).toHaveBeenCalled();
      });
      it('should call _calcShapeTransform method', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        spyOn(byte, '_calcShapeTransform');
        byte._draw();
        return expect(byte._calcShapeTransform).toHaveBeenCalled();
      });
      it('should receive the current progress', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        spyOn(byte, '_draw');
        byte._setProgress(.5);
        return expect(byte._draw).toHaveBeenCalledWith(.5);
      });
      return it('should calculate transform object', function() {
        var byte;
        byte = new Byte({
          angle: 90,
          radius: 25,
          strokeWidth: 4
        });
        expect(byte.bit.props.transform).toBe('rotate(90, 29, 29)');
        return expect(byte._calcShapeTransform).toBeDefined();
      });
    });
    describe('_drawEl method ->', function() {
      it('should set el positions and transforms', function() {
        var byte, s, tr;
        byte = new Byte({
          radius: 25,
          top: 10
        });
        expect(byte.el.style.left).toBe('0px');
        expect(byte.el.style.top).toBe('10px');
        expect(byte.el.style.opacity).toBe('1');
        s = byte.el.style;
        tr = s.transform || s["" + mojs.h.prefix.css + "transform"];
        return expect(tr).toBe('translate(0px, 0px) scale(1)');
      });
      it('should set only opacity if foreign context', function() {
        var byte, s, tr;
        byte = new Byte({
          radius: 25,
          top: 10,
          ctx: svg
        });
        byte._draw();
        expect(byte.el.style.opacity).toBe('1');
        expect(byte.el.style.left).not.toBe('0px');
        expect(byte.el.style.top).not.toBe('10px');
        s = byte.el.style;
        tr = s.transform != null ? s.transform : s["" + mojs.h.prefix.css + "transform"];
        return expect(tr).toBeFalsy();
      });
      it('should set new values', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          top: 10
        });
        byte._draw();
        byte._props.left = '1px';
        byte._draw();
        expect(byte.el.style.left).toBe('1px');
        return expect(byte.lastSet.left.value).toBe('1px');
      });
      it('should not set old values', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          y: 10
        });
        byte._draw();
        byte._draw();
        expect(byte.el.style.left).toBe('0px');
        return expect(byte.lastSet.x.value).toBe('0px');
      });
      it('should return true if there is no el', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        byte.el = null;
        return expect(byte._drawEl()).toBe(true);
      });
      it('should set transform if on of the x, y or scale changed', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          top: 10,
          ctx: svg
        });
        byte._draw();
        spyOn(h, 'setPrefixedStyle');
        byte._draw();
        return expect(h.setPrefixedStyle).not.toHaveBeenCalled();
      });
      it('should set transform if x changed', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          top: 10,
          x: {
            0: 10
          }
        });
        byte._props.x = '4px';
        spyOn(h, 'setPrefixedStyle');
        byte._draw();
        return expect(h.setPrefixedStyle).toHaveBeenCalledWith(byte.el, 'transform', 'translate(4px, 0px) scale(1)');
      });
      it('should set transform if x changed', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          top: 10,
          y: {
            0: 10
          }
        });
        byte._props.y = '4px';
        spyOn(h, 'setPrefixedStyle');
        byte._draw();
        return expect(h.setPrefixedStyle).toHaveBeenCalledWith(byte.el, 'transform', 'translate(0px, 4px) scale(1)');
      });
      return it('should set transform if x changed', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          top: 10,
          scale: {
            0: 10
          }
        });
        byte._props.scale = 3;
        spyOn(h, 'setPrefixedStyle');
        byte._draw();
        return expect(h.setPrefixedStyle).toHaveBeenCalledWith(byte.el, 'transform', 'translate(0px, 0px) scale(3)');
      });
    });
    describe('_isPropChanged method ->', function() {
      it('should return bool showing if prop was changed after the last set', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          y: 10
        });
        byte._props.left = '20px';
        expect(byte._isPropChanged('left')).toBe(true);
        byte._props.left = '20px';
        return expect(byte._isPropChanged('left')).toBe(false);
      });
      return it('should add prop object to lastSet if undefined', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          y: 10
        });
        byte._isPropChanged('x');
        return expect(byte.lastSet.x).toBeDefined();
      });
    });
    describe('delta calculations ->', function() {
      it('should skip delta for excludePropsDelta object', function() {
        var byte;
        byte = new Byte({
          radius: {
            45: 55
          }
        });
        byte._skipPropsDelta = {
          radius: 1
        };
        byte._extendDefaults();
        return expect(byte._deltas.radius).not.toBeDefined();
      });
      describe('numeric values ->', function() {
        it('should calculate delta', function() {
          var byte, radiusDelta;
          byte = new Byte({
            radius: {
              25: 75
            }
          });
          radiusDelta = byte._deltas.radius;
          expect(radiusDelta.start).toBe(25);
          expect(radiusDelta.delta).toBe(50);
          return expect(radiusDelta.type).toBe('number');
        });
        it('should calculate delta with string arguments', function() {
          var byte, radiusDelta;
          byte = new Byte({
            radius: {
              '25': '75'
            }
          });
          radiusDelta = byte._deltas.radius;
          expect(radiusDelta.start).toBe(25);
          return expect(radiusDelta.delta).toBe(50);
        });
        it('should calculate delta with float arguments', function() {
          var byte, radiusDelta;
          byte = new Byte({
            radius: {
              '25.50': 75.50
            }
          });
          radiusDelta = byte._deltas.radius;
          expect(radiusDelta.start).toBe(25.5);
          return expect(radiusDelta.delta).toBe(50);
        });
        it('should calculate delta with negative start arguments', function() {
          var byte, radiusDelta;
          byte = new Byte({
            radius: {
              '-25.50': 75.50
            }
          });
          radiusDelta = byte._deltas.radius;
          expect(radiusDelta.start).toBe(-25.5);
          return expect(radiusDelta.delta).toBe(101);
        });
        return it('should calculate delta with negative end arguments', function() {
          var byte, radiusDelta;
          byte = new Byte({
            radius: {
              '25.50': -75.50
            }
          });
          radiusDelta = byte._deltas.radius;
          expect(radiusDelta.start).toBe(25.5);
          expect(radiusDelta.end).toBe(-75.5);
          return expect(radiusDelta.delta).toBe(-101);
        });
      });
      describe('color values ->', function() {
        it('should calculate color delta', function() {
          var byte, colorDelta;
          byte = new Byte({
            stroke: {
              '#000': 'rgb(255,255,255)'
            }
          });
          colorDelta = byte._deltas.stroke;
          expect(colorDelta.start.r).toBe(0);
          expect(colorDelta.end.r).toBe(255);
          expect(colorDelta.delta.r).toBe(255);
          return expect(colorDelta.type).toBe('color');
        });
        return it('should ignore stroke-linecap prop, use start prop and warn', function() {
          var byte, fun;
          byte = null;
          spyOn(console, 'warn');
          fun = function() {
            return byte = new Byte({
              strokeLinecap: {
                'round': 'butt'
              }
            });
          };
          expect(function() {
            return fun();
          }).not.toThrow();
          expect(console.warn).toHaveBeenCalled();
          return expect(byte._deltas.strokeLinecap).not.toBeDefined();
        });
      });
      describe('unit values ->', function() {
        return it('should calculate unit delta', function() {
          var byte, xDelta;
          byte = new Byte({
            x: {
              '0%': '100%'
            }
          });
          xDelta = byte._deltas.x;
          expect(xDelta.start.string).toBe('0%');
          expect(xDelta.end.string).toBe('100%');
          expect(xDelta.delta).toBe(100);
          return expect(xDelta.type).toBe('unit');
        });
      });
      return describe('tween-related values ->', function() {
        return it('should not calc delta for tween related props', function() {
          var byte;
          byte = new Byte({
            duration: {
              2000: 1000
            }
          });
          return expect(byte._deltas.duration).not.toBeDefined();
        });
      });
    });
    describe('_calcOrigin method ->', function() {
      it("should set x and y to center by default (if no drawing context passed)", function() {
        var byte;
        byte = new Byte({
          radius: {
            '25.50': -75.50
          }
        });
        byte._calcOrigin(.5);
        expect(byte.origin.x).toBe(byte._props.center);
        return expect(byte.origin.y).toBe(byte._props.center);
      });
      return it("should set x and y to x and y if drawing context passed", function() {
        var byte;
        byte = new Byte({
          radius: {
            '25.50': -75.50
          },
          ctx: svg
        });
        byte._calcOrigin(.5);
        expect(byte.origin.x).toBe(parseFloat(byte._props.x));
        return expect(byte.origin.y).toBe(parseFloat(byte._props.y));
      });
    });
    describe('_setProgress method ->', function() {
      it('should set transition progress', function() {
        var byte;
        byte = new Byte({
          radius: {
            '25.50': -75.50
          }
        });
        byte._setProgress(.5);
        return expect(byte._progress).toBe(.5);
      });
      it('should set value progress', function() {
        var byte;
        byte = new Byte({
          radius: {
            '25': 75
          }
        });
        byte._setProgress(.5);
        return expect(byte._props.radius).toBe(50);
      });
      it('should call _calcOrigin method', function() {
        var byte;
        byte = new Byte({
          radius: {
            '25': 75
          }
        });
        spyOn(byte, '_calcOrigin');
        byte._setProgress(.5);
        return expect(byte._calcOrigin).toHaveBeenCalled();
      });
      it('should have origin object', function() {
        var byte;
        byte = new Byte({
          radius: {
            '25': 75
          }
        });
        byte._setProgress(.5);
        expect(byte.origin.x).toBeDefined();
        return expect(byte.origin.y).toBeDefined();
      });
      it('should have origin should be the center of the transit', function() {
        var byte;
        byte = new Byte({
          radius: {
            '25': 75
          }
        });
        byte._setProgress(.5);
        expect(byte.origin.x).toBe(byte._props.center);
        return expect(byte.origin.y).toBe(byte._props.center);
      });
      it('should have origin should be x/y if foreign context', function() {
        var byte;
        byte = new Byte({
          radius: {
            '25': 75
          },
          ctx: svg
        });
        byte._setProgress(.5);
        expect(byte.origin.x).toBe(parseFloat(byte._props.x));
        return expect(byte.origin.y).toBe(parseFloat(byte._props.x));
      });
      it('should have origin should be number if foreign context', function() {
        var byte;
        byte = new Byte({
          radius: {
            '25': 75
          },
          ctx: svg
        });
        byte._setProgress(.5);
        expect(typeof byte.origin.x).toBe('number');
        return expect(typeof byte.origin.y).toBe('number');
      });
      it('should call _calcCurrentProps', function() {
        var byte;
        byte = new Byte({
          radius: {
            '25': 75
          }
        });
        spyOn(byte, '_calcCurrentProps');
        byte._setProgress(.5);
        return expect(byte._calcCurrentProps).toHaveBeenCalledWith(.5);
      });
      it('not to thow', function() {
        var byte;
        byte = new Byte({
          radius: {
            '25': 75
          },
          ctx: svg
        });
        return expect(function() {
          return byte._show();
        }).not.toThrow();
      });
      it('should set color value progress and only int', function() {
        var byte, colorDelta;
        byte = new Byte({
          stroke: {
            '#000': 'rgb(255,255,255)'
          }
        });
        colorDelta = byte._deltas.stroke;
        byte._setProgress(.5);
        return expect(byte._props.stroke).toBe('rgba(127,127,127,1)');
      });
      return it('should set color value progress for delta starting with 0', function() {
        var byte, colorDelta;
        byte = new Byte({
          stroke: {
            '#000': 'rgb(0,255,255)'
          }
        });
        colorDelta = byte._deltas.stroke;
        byte._setProgress(.5);
        return expect(byte._props.stroke).toBe('rgba(0,127,127,1)');
      });
    });
    describe('strokeDash.. values', function() {
      it('should set strokeDasharray/strokeDashoffset value progress', function() {
        var byte;
        byte = new Byte({
          strokeDasharray: {
            '200 100': '400'
          }
        });
        byte._setProgress(.5);
        expect(byte._props.strokeDasharray[0].value).toBe(300);
        expect(byte._props.strokeDasharray[0].unit).toBe('px');
        expect(byte._props.strokeDasharray[1].value).toBe(50);
        return expect(byte._props.strokeDasharray[1].unit).toBe('px');
      });
      it('should set strokeDasharray/strokeDashoffset with percents', function() {
        var byte;
        byte = new Byte({
          type: 'circle',
          strokeDasharray: {
            '0% 200': '100%'
          },
          radius: 100
        });
        byte._setProgress(.5);
        expect(byte._props.strokeDasharray[0].value).toBe(50);
        expect(byte._props.strokeDasharray[0].unit).toBe('%');
        expect(byte._props.strokeDasharray[1].value).toBe(100);
        return expect(byte._props.strokeDasharray[1].unit).toBe('px');
      });
      it('should parse non-deltas strokeDasharray/strokeDashoffset values', function() {
        var byte;
        byte = new Byte({
          type: 'circle',
          strokeDasharray: '100%',
          radius: 100
        });
        expect(byte._props.strokeDasharray[0].value).toBe(100);
        return expect(byte._props.strokeDasharray[0].unit).toBe('%');
      });
      it('should parse multiple strokeDash.. values', function() {
        var byte;
        byte = new Byte({
          strokeDasharray: '7 100 7'
        });
        expect(h.isArray(byte._props.strokeDasharray)).toBe(true);
        expect(byte._props.strokeDasharray.length).toBe(3);
        expect(byte._props.strokeDasharray[0].value).toBe(7);
        expect(byte._props.strokeDasharray[1].value).toBe(100);
        return expect(byte._props.strokeDasharray[2].value).toBe(7);
      });
      return it('should parse num values', function() {
        var byte;
        byte = new Byte({
          strokeDasharray: 7
        });
        expect(h.isArray(byte._props.strokeDasharray)).toBe(true);
        return expect(byte._props.strokeDasharray.length).toBe(1);
      });
    });
    describe('callbacks ->', function() {
      describe('onStart callback ->', function() {
        it('should call onStart callback', function(dfr) {
          var byte, isOnStart;
          isOnStart = null;
          byte = new Byte({
            radius: {
              '25': 75
            },
            onStart: function() {
              return isOnStart = true;
            }
          });
          byte.play();
          return setTimeout(function() {
            expect(isOnStart).toBe(true);
            return dfr();
          }, 500);
        });
        return it('should show el', function() {
          var byte;
          byte = new Byte({
            radius: {
              '25': 75
            }
          });
          spyOn(byte, '_show');
          byte.timeline.setProgress(.48);
          byte.timeline.setProgress(.49);
          byte.timeline.setProgress(.5);
          return expect(byte._show).toHaveBeenCalled();
        });
      });
      describe('onUpdate callback', function() {
        it('should call onUpdate callback', function(dfr) {
          var byte, isOnUpdate;
          isOnUpdate = null;
          byte = new Byte({
            radius: {
              '25': 75
            },
            onUpdate: function() {
              return isOnUpdate = true;
            }
          });
          return setTimeout(function() {
            expect('onUpdate called').toBe('onUpdate called');
            return dfr();
          }, 500);
        });
        it('should have scope of Transit', function(dfr) {
          var byte, isRightScope;
          isRightScope = null;
          byte = new Byte({
            radius: {
              '25': 75
            },
            onUpdate: function() {
              return isRightScope = this instanceof Byte;
            }
          });
          byte.play();
          return setTimeout((function() {
            expect(isRightScope).toBe(true);
            return dfr();
          }), 500);
        });
        return it('should set current progress', function(dfr) {
          var byte, progress;
          progress = null;
          byte = new Byte({
            radius: {
              '25': 75
            },
            onUpdate: function(p) {
              return progress = p;
            },
            duration: 100
          });
          byte.play();
          return setTimeout(function() {
            expect(progress).toBeGreaterThan(0);
            expect(progress).not.toBeGreaterThan(1);
            return dfr();
          }, 500);
        });
      });
      return describe('onComplete callback ->', function() {
        it('should call onComplete callback', function(dfr) {
          var byte, isOnComplete;
          isOnComplete = null;
          byte = new Byte({
            radius: {
              '25': 75
            },
            onComplete: function() {
              return isOnComplete = true;
            },
            duration: 200
          });
          byte.play();
          return setTimeout(function() {
            expect(isOnComplete).toBe(true);
            return dfr();
          }, 500);
        });
        return it('should have scope of Transit', function(dfr) {
          var byte, isRightScope;
          isRightScope = null;
          byte = new Byte({
            radius: {
              '25': 75
            },
            duration: 100,
            onComplete: function() {
              return isRightScope = this instanceof Byte;
            }
          });
          byte.play();
          return setTimeout(function() {
            expect(isRightScope).toBe(true);
            return dfr();
          }, 500);
        });
      });
    });
    describe('isForeign flag ->', function() {
      it('should not be set by default', function() {
        var byte;
        byte = new Byte;
        return expect(byte.isForeign).toBe(false);
      });
      it('should be set if context was passed', function() {
        var byte;
        byte = new Byte({
          ctx: svg
        });
        return expect(byte.isForeign).toBe(true);
      });
      return it('if context passed el should be bit\'s el', function() {
        var byte;
        byte = new Byte({
          ctx: svg
        });
        return expect(byte.el).toBe(byte.bit.el);
      });
    });
    describe('show/hide on start/end ->', function() {
      it('should show the el on start', function() {
        var byte;
        byte = new Byte({
          ctx: svg
        });
        byte.timeline.setProgress(.45);
        byte.timeline.setProgress(.5);
        return expect(byte.el.style.display).toBe('block');
      });
      it('should hide the el on end', function() {
        var byte;
        byte = new Byte({
          ctx: svg
        });
        byte.timeline.setProgress(.99);
        byte.timeline.setProgress(1);
        return expect(byte.el.style.display).toBe('none');
      });
      it('should not hide the el on end if isShowEnd was passed', function() {
        var byte;
        byte = new Byte({
          ctx: svg,
          isShowEnd: true
        });
        byte.timeline.setProgress(.98);
        byte.timeline.setProgress(.99);
        byte.timeline.setProgress(1);
        return expect(byte.el.style.display).toBe('block');
      });
      it('should not hide the el on end if isShowEnd was passed #2 - chain', function() {
        var byte;
        byte = new Byte({
          ctx: svg,
          isShowEnd: true
        }).then({
          radius: 10
        });
        byte.timeline.setProgress(0);
        byte.timeline.setProgress(.2);
        byte.timeline.setProgress(.3);
        byte.timeline.setProgress(.4);
        byte.timeline.setProgress(.5);
        byte.timeline.setProgress(.7);
        byte.timeline.setProgress(.9);
        byte.timeline.setProgress(1);
        expect(byte.el.style.display).toBe('none');
        return expect(byte._modules[byte._modules.length - 1].el.style.display).toBe('block');
      });
      it('should hide the el on reverse end', function() {
        var byte;
        byte = new Byte({
          ctx: svg
        });
        byte.timeline.setProgress(1);
        byte.timeline.setProgress(.25);
        byte.timeline.setProgress(0);
        return expect(byte.el.style.display).toBe('none');
      });
      return it('should not hide the el on reverse end if isShowStart passed', function() {
        var byte;
        byte = new Byte({
          ctx: svg,
          isShowStart: true
        });
        byte.timeline.setProgress(.5);
        byte.timeline.setProgress(0);
        return expect(byte.el.style.display).toBe('block');
      });
    });
    describe('_getRadiusSize method ->', function() {
      it('should return max from delatas if key is defined', function() {
        var byte, size;
        byte = new Byte({
          radiusX: {
            20: 30
          }
        });
        size = byte._getRadiusSize({
          key: 'radiusX',
          fallback: 0
        });
        return expect(size).toBe(30);
      });
      it('should return props\' value if delats\' one is not defined ', function() {
        var byte, size;
        byte = new Byte({
          radiusX: 20
        });
        size = byte._getRadiusSize({
          key: 'radiusX',
          fallback: 0
        });
        return expect(size).toBe(20);
      });
      it('should fallback to passed fallback option', function() {
        var byte, size;
        byte = new Byte;
        size = byte._getRadiusSize({
          key: 'radiusX',
          fallback: 0
        });
        return expect(size).toBe(0);
      });
      return it('should fallback to 0 by default', function() {
        var byte, size;
        byte = new Byte;
        size = byte._getRadiusSize({
          key: 'radiusX'
        });
        return expect(size).toBe(0);
      });
    });
    describe('foreign bit option ->', function() {
      it('should receive a foreign bit to work with', function() {
        var bit, byte;
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, 'svg') : void 0;
        bit = typeof document.createElementNS === "function" ? document.createElementNS(ns, 'rect') : void 0;
        svg.appendChild(bit);
        byte = new Byte({
          bit: bit
        });
        return expect(byte.bit.el).toBe(bit);
      });
      return it('should set isForeignBit flag', function() {
        var bit, byte;
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, 'svg') : void 0;
        bit = typeof document.createElementNS === "function" ? document.createElementNS(ns, 'rect') : void 0;
        svg.appendChild(bit);
        byte = new Byte({
          bit: bit
        });
        return expect(byte.isForeignBit).toBe(true);
      });
    });
    describe('_makeTweenControls method ->', function() {});
    it('should override this._o.onStart', function() {
      var tr;
      tr = new Transit;
      expect(typeof tr._o.onStart).toBe('function');
      it('should not override onStart function if exists', function() {
        var args, isRightScope, options;
        isRightScope = null;
        args = null;
        options = {
          onStart: function() {
            isRightScope = this === tr;
            return args = arguments;
          }
        };
        tr = new Transit(options);
        expect(typeof tr._o.onStart).toBe('function');
        tr.timeline.setProgress(0);
        tr.timeline.setProgress(.1);
        expect(isRightScope).toBe(true);
        expect(args[0]).toBe(true);
        return expect(args[1]).toBe(false);
      });
      it('should show module ', function() {
        tr = new Transit;
        tr.timeline.setProgress(0);
        spyOn(tr, '_show').and.callThrough();
        tr.timeline.setProgress(.1);
        return expect(tr._show).toHaveBeenCalled();
      });
      it('should hide module ', function() {
        tr = new Transit;
        tr.timeline.setProgress(.1);
        spyOn(tr, '_hide').and.callThrough();
        tr.timeline.setProgress(0);
        return expect(tr._hide).toHaveBeenCalled();
      });
      return it('should not hide module is isShowStart was set', function() {
        tr = new Transit({
          isShowStart: true
        });
        tr.timeline.setProgress(.2);
        tr.timeline.setProgress(.1);
        spyOn(tr, '_hide').and.callThrough();
        tr.timeline.setProgress(0);
        return expect(tr._hide).not.toHaveBeenCalled();
      });
    });
    describe('_increaseSizeWithEasing method ->', function() {
      it('should increase size based on easing - elastic.out', function() {
        var tr;
        tr = new Transit({
          easing: 'elastic.out'
        });
        tr._props.size = 1;
        tr._increaseSizeWithEasing();
        return expect(tr._props.size).toBe(1.25);
      });
      it('should increase size based on easing - elastic.inout', function() {
        var tr;
        tr = new Transit({
          easing: 'elastic.inout'
        });
        tr._props.size = 1;
        tr._increaseSizeWithEasing();
        return expect(tr._props.size).toBe(1.25);
      });
      it('should increase size based on easing - back.out', function() {
        var tr;
        tr = new Transit({
          easing: 'back.out'
        });
        tr._props.size = 1;
        tr._increaseSizeWithEasing();
        return expect(tr._props.size).toBe(1.1);
      });
      return it('should increase size based on easing - back.inout', function() {
        var tr;
        tr = new Transit({
          easing: 'back.inout'
        });
        tr._props.size = 1;
        tr._increaseSizeWithEasing();
        return expect(tr._props.size).toBe(1.1);
      });
    });
    describe('_increaseSizeWithBitRatio method ->', function() {
      it('should increase size based on bit ratio', function() {
        var tr;
        tr = new Transit({
          shape: 'equal'
        });
        tr._props.size = 1;
        tr._increaseSizeWithBitRatio();
        return expect(tr._props.size).toBe(tr.bit.ratio);
      });
      return it('should increase size based 2 gap sizes', function() {
        var gap, tr;
        gap = 20;
        tr = new Transit({
          shape: 'equal',
          sizeGap: gap
        });
        tr._props.size = 1;
        tr._increaseSizeWithBitRatio();
        return expect(tr._props.size).toBe(tr.bit.ratio + 2 * gap);
      });
    });
    describe('callbacksContext option ->', function() {
      it('should pass the options to the tween', function() {
        var isRightContext, obj, tr;
        obj = {};
        isRightContext = null;
        tr = new Transit({
          callbacksContext: obj,
          onUpdate: function() {
            return isRightContext = this === obj;
          }
        });
        tr.setProgress(0);
        tr.setProgress(.1);
        return expect(isRightContext).toBe(true);
      });
      return it('should pass the options to the timeline', function() {
        var isRightContext, obj, tr;
        obj = {};
        isRightContext = null;
        tr = new Transit({
          callbacksContext: obj,
          timeline: {
            onUpdate: function() {
              return isRightContext = this === obj;
            }
          }
        });
        tr.setProgress(0);
        tr.setProgress(.1);
        return expect(isRightContext).toBe(true);
      });
    });
    return describe('_overrideCallback method ->', function() {
      it('should override a callback in _o', function() {
        var fun, tr;
        fun = function() {};
        tr = new Transit;
        tr._o.onStart = fun;
        tr._overrideCallback('onStart', function() {});
        expect(tr._o.onStart).not.toBe(fun);
        return expect(typeof tr._o.onStart).toBe('function');
      });
      it('should call overriden callback', function() {
        var args, fun, isRightScope, tr;
        args = null;
        isRightScope = null;
        fun = function() {
          args = arguments;
          return isRightScope = this === tr;
        };
        tr = new Transit;
        tr._o.onStart = fun;
        tr._overrideCallback('onStart', function() {});
        tr._o.onStart.call(tr, 'a');
        expect(args[0]).toBe('a');
        expect(args.length).toBe(1);
        return expect(isRightScope).toBe(true);
      });
      return it('should call passed method callback', function() {
        var args, cleanUpFun, isRightScope, tr;
        args = null;
        isRightScope = null;
        tr = new Transit;
        tr._o.onStart = function() {};
        cleanUpFun = function() {
          args = arguments;
          return isRightScope = this === tr;
        };
        tr._overrideCallback('onStart', cleanUpFun);
        tr._o.onStart.call(tr, 'a');
        expect(args[0]).toBe('a');
        expect(args.length).toBe(1);
        return expect(isRightScope).toBe(true);
      });
    });
  });

}).call(this);
