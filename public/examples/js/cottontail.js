/*Copyright 2018 The Immersive Web Community Group

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
!(function(e, t) {
  if ("object" == typeof exports && "object" == typeof module)
    module.exports = t();
  else if ("function" == typeof define && define.amd) define([], t);
  else {
    var r = t();
    for (var n in r) ("object" == typeof exports ? exports : e)[n] = r[n];
  }
})(this, function() {
  return (function(e) {
    function t(n) {
      if (r[n]) return r[n].exports;
      var i = (r[n] = { exports: {}, id: n, loaded: !1 });
      return e[n].call(i.exports, i, i.exports, t), (i.loaded = !0), i.exports;
    }
    var r = {};
    return (t.m = e), (t.c = r), (t.p = ""), t(0);
  })([
    function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.GLTF2Scene = t.CubeSeaScene = t.Scene = t.WebXRView = t.PbrMaterial = t.BoxBuilder = t.PrimitiveStream = t.createWebGLContext = t.Renderer = t.AABB = t.Ray = void 0);
      var n = r(1),
        i = r(2),
        o = r(7),
        a = r(9),
        s = r(10),
        _ = r(11),
        u = r(18),
        l = r(19);
      "XRWebGLLayer" in window &&
        !("getViewport" in XRWebGLLayer.prototype) &&
        (XRWebGLLayer.prototype.getViewport = function(e) {
          return e.getViewport(this);
        }),
        (t.Ray = n.Ray),
        (t.AABB = n.AABB),
        (t.Renderer = i.Renderer),
        (t.createWebGLContext = i.createWebGLContext),
        (t.PrimitiveStream = o.PrimitiveStream),
        (t.BoxBuilder = a.BoxBuilder),
        (t.PbrMaterial = s.PbrMaterial),
        (t.WebXRView = _.WebXRView),
        (t.Scene = _.Scene),
        (t.CubeSeaScene = u.CubeSeaScene),
        (t.GLTF2Scene = l.GLTF2Scene);
    },
    function(e, t) {
      "use strict";
      function r(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = (function() {
        function e(e, t) {
          for (var r = 0; r < t.length; r++) {
            var n = t[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(e, n.key, n);
          }
        }
        return function(t, r, n) {
          return r && e(t.prototype, r), n && e(t, n), t;
        };
      })();
      (t.Ray = (function() {
        function e() {
          var t =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : null;
          r(this, e),
            (this.origin = vec3.create()),
            (this._dir = vec3.create()),
            (this._dir[2] = -1),
            transform &&
              (mat4.transformVec3(this.origin, this.origin, t),
              mat4.transformVec3(this._dir, this._dir, t),
              mat4.sub(this._dir, this._dir, this.origin)),
            (this.inv_dir = vec3.fromValues(
              1 / this._dir[0],
              1 / this._dir[1],
              1 / this._dir[2]
            )),
            (this.sign = [
              this.inv_dir[0] < 0 ? 1 : -1,
              this.inv_dir[1] < 0 ? 1 : -1,
              this.inv_dir[2] < 0 ? 1 : -1
            ]);
        }
        return (
          n(e, [
            {
              key: "dir",
              get: function() {
                return this._dir;
              },
              set: function(e) {
                (this._dir = vec3.copy(this._dir, e)),
                  (this.inv_dir = vec3.fromValues(
                    1 / this._dir[0],
                    1 / this._dir[1],
                    1 / this._dir[2]
                  )),
                  (this.sign = [
                    this.inv_dir[0] < 0 ? 1 : -1,
                    this.inv_dir[1] < 0 ? 1 : -1,
                    this.inv_dir[2] < 0 ? 1 : -1
                  ]);
              }
            }
          ]),
          e
        );
      })()),
        (t.AABB = (function() {
          function e() {
            r(this, e), (this.min = vec3.create()), (this.max = vec3.create());
          }
          return (
            n(e, [
              {
                key: "rayIntersect",
                value: function(e) {
                  var t = [this.min, this.max],
                    r = (t[e.sign[0]][0] - e.origin[0]) * e.inv_dir[0],
                    n = (t[1 - e.sign[0]][0] - e.origin[0]) * e.inv_dir[0],
                    i = (t[e.sign[1]][1] - e.origin[1]) * e.inv_dir[1],
                    o = (t[1 - e.sign[1]][1] - e.origin[1]) * e.inv_dir[1];
                  if (r > o || i > n) return -1;
                  i > r && (r = i), o < n && (n = o);
                  var a = (t[e.sign[2]][2] - e.origin[2]) * e.inv_dir[2],
                    s = (t[1 - e.sign[2]][2] - e.origin[2]) * e.inv_dir[2];
                  return r > s || a > n
                    ? -1
                    : (a > r && (r = a), s < n && (n = s), 1);
                }
              }
            ]),
            e
          );
        })());
    },
    function(e, t, r) {
      "use strict";
      function n(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function i(e) {
        return 0 === (e & (e - 1));
      }
      function o(e) {
        e = e || { alpha: !1 };
        var t = document.createElement("canvas"),
          r = e.webgl2 ? ["webgl2"] : ["webgl", "experimental-webgl"],
          n = null,
          i = !0,
          o = !1,
          a = void 0;
        try {
          for (
            var s, _ = r[Symbol.iterator]();
            !(i = (s = _.next()).done);
            i = !0
          ) {
            var u = s.value;
            if ((n = t.getContext(u, e))) break;
          }
        } catch (e) {
          (o = !0), (a = e);
        } finally {
          try {
            !i && _.return && _.return();
          } finally {
            if (o) throw a;
          }
        }
        if (!n) {
          var l = e.webgl2 ? "WebGL 2" : "WebGL";
          return (
            console.error("This browser does not support " + l + "."), null
          );
        }
        return n;
      }
      function a(e, t, r, n, i) {
        var o = (i & r) - (n & r);
        o && (o > 0 ? e.enable(t) : e.disable(t));
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.Renderer = t.RenderView = t.ATTRIB_MASK = t.ATTRIB = void 0);
      var s = (function() {
        function e(e, t) {
          for (var r = 0; r < t.length; r++) {
            var n = t[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(e, n.key, n);
          }
        }
        return function(t, r, n) {
          return r && e(t.prototype, r), n && e(t, n), t;
        };
      })();
      t.createWebGLContext = o;
      var _ = r(3),
        u = r(4),
        l = r(5),
        f = r(6),
        c = (t.ATTRIB = {
          POSITION: 1,
          NORMAL: 2,
          TANGENT: 3,
          TEXCOORD_0: 4,
          TEXCOORD_1: 5,
          COLOR_0: 6
        }),
        h = (t.ATTRIB_MASK = {
          POSITION: 1,
          NORMAL: 2,
          TANGENT: 4,
          TEXCOORD_0: 8,
          TEXCOORD_1: 16,
          COLOR_0: 32
        }),
        d = new Float32Array([-0.1, -1, -0.2]),
        v = new Float32Array([1, 1, 0.9]),
        m = new RegExp("precision (lowp|mediump|highp) float;"),
        p =
          "\nuniform mat4 PROJECTION_MATRIX, VIEW_MATRIX, MODEL_MATRIX;\n\nvoid main() {\n  gl_Position = vertex_main(PROJECTION_MATRIX, VIEW_MATRIX, MODEL_MATRIX);\n}\n",
        y =
          "\n#ERROR Multiview rendering is not implemented\nvoid main() {\n  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);\n}\n",
        b = "\nvoid main() {\n  gl_FragColor = fragment_main();\n}\n",
        g = ((t.RenderView = (function() {
          function e(t, r) {
            var i =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : null,
              o =
                arguments.length > 3 && void 0 !== arguments[3]
                  ? arguments[3]
                  : "left";
            n(this, e),
              (this.projection_matrix = t),
              (this.view_matrix = r),
              (this.viewport = i),
              (this._eye = o),
              (this._eye_index = "left" == o ? 0 : 1);
          }
          return (
            s(e, [
              {
                key: "eye",
                get: function() {
                  return this._eye;
                },
                set: function(e) {
                  (this._eye = e), (this._eye_index = "left" == e ? 0 : 1);
                }
              },
              {
                key: "eye_index",
                get: function() {
                  return this._eye_index;
                }
              }
            ]),
            e
          );
        })()),
        (function() {
          function e(t, r, i) {
            var o = this,
              a =
                arguments.length > 3 && void 0 !== arguments[3]
                  ? arguments[3]
                  : 0;
            n(this, e),
              (this._target = t),
              (this._usage = r),
              (this._length = a),
              i instanceof Promise
                ? ((this._buffer = null),
                  (this._promise = i.then(function(e) {
                    return (o._buffer = e), o;
                  })))
                : ((this._buffer = i), (this._promise = Promise.resolve(this)));
          }
          return (
            s(e, [
              {
                key: "waitForComplete",
                value: function() {
                  return this._promise;
                }
              }
            ]),
            e
          );
        })()),
        x = function e(t) {
          n(this, e),
            (this._attrib_index = c[t.name]),
            (this._component_count = t.component_count),
            (this._component_type = t.component_type),
            (this._stride = t.stride),
            (this._byte_offset = t.byte_offset),
            (this._normalized = t.normalized);
        },
        w = function e(t) {
          n(this, e), (this._buffer = t), (this._attributes = []);
        },
        T = (function() {
          function e(t) {
            n(this, e),
              (this._mode = t.mode),
              (this._element_count = t.element_count),
              (this._instances = []),
              (this._vao = null),
              (this._complete = !1),
              (this._material = null),
              (this._attribute_buffers = []),
              (this._attribute_mask = 0);
            var r = !0,
              i = !1,
              o = void 0;
            try {
              for (
                var a, s = t.attributes[Symbol.iterator]();
                !(r = (a = s.next()).done);
                r = !0
              ) {
                var _ = a.value;
                this._attribute_mask |= h[_.name];
                var u = new x(_),
                  l = !1,
                  f = !0,
                  c = !1,
                  d = void 0;
                try {
                  for (
                    var v, m = this._attribute_buffers[Symbol.iterator]();
                    !(f = (v = m.next()).done);
                    f = !0
                  ) {
                    var p = v.value;
                    if (p._buffer == _.buffer) {
                      p._attributes.push(u), (l = !0);
                      break;
                    }
                  }
                } catch (e) {
                  (c = !0), (d = e);
                } finally {
                  try {
                    !f && m.return && m.return();
                  } finally {
                    if (c) throw d;
                  }
                }
                if (!l) {
                  var y = new w(_.buffer);
                  y._attributes.push(u), this._attribute_buffers.push(y);
                }
              }
            } catch (e) {
              (i = !0), (o = e);
            } finally {
              try {
                !r && s.return && s.return();
              } finally {
                if (i) throw o;
              }
            }
            (this._index_buffer = null),
              (this._index_byte_offset = 0),
              (this._index_type = 0),
              t.index_buffer &&
                ((this._index_byte_offset = t.index_byte_offset),
                (this._index_type = t.index_type),
                (this._index_buffer = t.index_buffer));
          }
          return (
            s(e, [
              {
                key: "setRenderMaterial",
                value: function(e) {
                  (this._material = e),
                    (this._promise = null),
                    (this._complete = !1),
                    null != this._material && this.waitForComplete();
                }
              },
              {
                key: "markActive",
                value: function(e) {
                  this._complete &&
                    ((this._active_frame_id = e),
                    this.material && this.material.markActive(e),
                    this.program && this.program.markActive(e));
                }
              },
              {
                key: "waitForComplete",
                value: function() {
                  var e = this;
                  if (!this._promise) {
                    if (!this._material)
                      return Promise.reject(
                        "RenderPrimitive does not have a material"
                      );
                    var t = [];
                    t.push(this._material.waitForComplete());
                    var r = !0,
                      n = !1,
                      i = void 0;
                    try {
                      for (
                        var o, a = this._attribute_buffers[Symbol.iterator]();
                        !(r = (o = a.next()).done);
                        r = !0
                      ) {
                        var s = o.value;
                        s._buffer._buffer || t.push(s._buffer._promise);
                      }
                    } catch (e) {
                      (n = !0), (i = e);
                    } finally {
                      try {
                        !r && a.return && a.return();
                      } finally {
                        if (n) throw i;
                      }
                    }
                    this._index_buffer &&
                      !this._index_buffer._buffer &&
                      t.push(this._index_buffer._promise),
                      (this._promise = Promise.all(t).then(function() {
                        return (e._complete = !0), e;
                      }));
                  }
                  return this._promise;
                }
              }
            ]),
            e
          );
        })(),
        E = mat4.create(),
        R = function e(t, r, i) {
          n(this, e),
            (this._uniform_name = r._uniform_name),
            (this._texture = t._getRenderTexture(r._texture)),
            (this._index = i);
        },
        O = function e(t) {
          n(this, e),
            (this._uniform_name = t._uniform_name),
            (this._uniform = null),
            (this._length = t._length),
            t._value instanceof Array
              ? (this._value = new Float32Array(t._value))
              : (this._value = new Float32Array([t._value]));
        },
        S = (function() {
          function e(t, r, i) {
            n(this, e),
              (this._program = i),
              (this._state = r.state._state),
              (this._samplers = []);
            for (var o = 0; o < r._samplers.length; ++o)
              this._samplers.push(new R(t, r._samplers[o], o));
            this._uniforms = [];
            var a = !0,
              s = !1,
              u = void 0;
            try {
              for (
                var l, f = r._uniforms[Symbol.iterator]();
                !(a = (l = f.next()).done);
                a = !0
              ) {
                var c = l.value;
                this._uniforms.push(new O(c));
              }
            } catch (e) {
              (s = !0), (u = e);
            } finally {
              try {
                !a && f.return && f.return();
              } finally {
                if (s) throw u;
              }
            }
            (this._complete_promise = null),
              (this._first_bind = !0),
              (this._render_order = r.render_order),
              this._render_order == _.RENDER_ORDER.DEFAULT &&
                (this._state & _.CAP.BLEND
                  ? (this._render_order = _.RENDER_ORDER.TRANSPARENT)
                  : (this._render_order = _.RENDER_ORDER.OPAQUE));
          }
          return (
            s(e, [
              {
                key: "bind",
                value: function(e) {
                  if (this._first_bind) {
                    for (var t = 0; t < this._samplers.length; ) {
                      var r = this._samplers[t];
                      this._program.uniform[r._uniform_name]
                        ? ++t
                        : this._samplers.splice(t, 1);
                    }
                    for (var n = 0; n < this._uniforms.length; ) {
                      var i = this._uniforms[n];
                      (i._uniform = this._program.uniform[i._uniform_name]),
                        i._uniform ? ++n : this._uniforms.splice(n, 1);
                    }
                    this._first_bind = !1;
                  }
                  var o = !0,
                    a = !1,
                    s = void 0;
                  try {
                    for (
                      var _, u = this._samplers[Symbol.iterator]();
                      !(o = (_ = u.next()).done);
                      o = !0
                    ) {
                      var l = _.value;
                      e.activeTexture(e.TEXTURE0 + l._index),
                        l._texture
                          ? e.bindTexture(e.TEXTURE_2D, l._texture)
                          : e.bindTexture(e.TEXTURE_2D, null);
                    }
                  } catch (e) {
                    (a = !0), (s = e);
                  } finally {
                    try {
                      !o && u.return && u.return();
                    } finally {
                      if (a) throw s;
                    }
                  }
                  var f = !0,
                    c = !1,
                    h = void 0;
                  try {
                    for (
                      var d, v = this._uniforms[Symbol.iterator]();
                      !(f = (d = v.next()).done);
                      f = !0
                    ) {
                      var m = d.value;
                      switch (m._length) {
                        case 1:
                          e.uniform1fv(m._uniform, m._value);
                          break;
                        case 2:
                          e.uniform2fv(m._uniform, m._value);
                          break;
                        case 3:
                          e.uniform3fv(m._uniform, m._value);
                          break;
                        case 4:
                          e.uniform4fv(m._uniform, m._value);
                      }
                    }
                  } catch (e) {
                    (c = !0), (h = e);
                  } finally {
                    try {
                      !f && v.return && v.return();
                    } finally {
                      if (c) throw h;
                    }
                  }
                }
              },
              {
                key: "waitForComplete",
                value: function() {
                  var e = this;
                  if (!this._complete_promise)
                    if (0 == this._samplers.length)
                      this._complete_promise = Promise.resolve(this);
                    else {
                      var t = [],
                        r = !0,
                        n = !1,
                        i = void 0;
                      try {
                        for (
                          var o, a = this._samplers[Symbol.iterator]();
                          !(r = (o = a.next()).done);
                          r = !0
                        ) {
                          var s = o.value;
                          s._texture &&
                            !s._texture._complete &&
                            t.push(s._texture._promise);
                        }
                      } catch (e) {
                        (n = !0), (i = e);
                      } finally {
                        try {
                          !r && a.return && a.return();
                        } finally {
                          if (n) throw i;
                        }
                      }
                      this._complete_promise = Promise.all(t).then(function() {
                        return e;
                      });
                    }
                  return this._complete_promise;
                }
              },
              {
                key: "_capsDiff",
                value: function(e) {
                  return (
                    (e & _.MAT_STATE.CAPS_RANGE) ^
                    (this._state & _.MAT_STATE.CAPS_RANGE)
                  );
                }
              },
              {
                key: "_blendDiff",
                value: function(e) {
                  return this._state & _.CAP.BLEND
                    ? (e & _.MAT_STATE.BLEND_FUNC_RANGE) ^
                        (this._state & _.MAT_STATE.BLEND_FUNC_RANGE)
                    : 0;
                }
              },
              {
                key: "_depthFuncDiff",
                value: function(e) {
                  return this._state & _.CAP.DEPTH_TEST
                    ? (e & _.MAT_STATE.DEPTH_FUNC_RANGE) ^
                        (this._state & _.MAT_STATE.DEPTH_FUNC_RANGE)
                    : 0;
                }
              },
              {
                key: "cull_face",
                get: function() {
                  return !!(this._state & _.CAP.CULL_FACE);
                }
              },
              {
                key: "blend",
                get: function() {
                  return !!(this._state & _.CAP.BLEND);
                }
              },
              {
                key: "depth_test",
                get: function() {
                  return !!(this._state & _.CAP.DEPTH_TEST);
                }
              },
              {
                key: "stencil_test",
                get: function() {
                  return !!(this._state & _.CAP.STENCIL_TEST);
                }
              },
              {
                key: "color_mask",
                get: function() {
                  return !!(this._state & _.CAP.COLOR_MASK);
                }
              },
              {
                key: "depth_mask",
                get: function() {
                  return !!(this._state & _.CAP.DEPTH_MASK);
                }
              },
              {
                key: "stencil_mask",
                get: function() {
                  return !!(this._state & _.CAP.STENCIL_MASK);
                }
              },
              {
                key: "depth_func",
                get: function() {
                  return (
                    ((this._state & _.MAT_STATE.DEPTH_FUNC_RANGE) >>
                      _.MAT_STATE.DEPTH_FUNC_SHIFT) +
                    WebGLRenderingContext.NEVER
                  );
                }
              },
              {
                key: "blend_func_src",
                get: function() {
                  return (0, _.stateToBlendFunc)(
                    this._state,
                    _.MAT_STATE.BLEND_SRC_RANGE,
                    _.MAT_STATE.BLEND_SRC_SHIFT
                  );
                }
              },
              {
                key: "blend_func_dst",
                get: function() {
                  return (0, _.stateToBlendFunc)(
                    this._state,
                    _.MAT_STATE.BLEND_DST_RANGE,
                    _.MAT_STATE.BLEND_DST_SHIFT
                  );
                }
              }
            ]),
            e
          );
        })();
      t.Renderer = (function() {
        function e(t) {
          n(this, e),
            (this._gl = t || o()),
            (this._frame_id = -1),
            (this._program_cache = {}),
            (this._texture_cache = {}),
            (this._render_primitives = Array(_.RENDER_ORDER.DEFAULT)),
            (this._camera_positions = []),
            (this._vao_ext = t.getExtension("OES_vertex_array_object"));
          var r = t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.HIGH_FLOAT);
          this._default_frag_precision = r.precision > 0 ? "highp" : "mediump";
        }
        return (
          s(e, [
            {
              key: "createRenderBuffer",
              value: function(e, t) {
                var r =
                    arguments.length > 2 && void 0 !== arguments[2]
                      ? arguments[2]
                      : WebGLRenderingContext.STATIC_DRAW,
                  n = this._gl,
                  i = n.createBuffer();
                if (t instanceof Promise) {
                  var o = new g(
                    e,
                    r,
                    t.then(function(t) {
                      return (
                        n.bindBuffer(e, i),
                        n.bufferData(e, t, r),
                        (o._length = t.byteLength),
                        i
                      );
                    })
                  );
                  return o;
                }
                return (
                  n.bindBuffer(e, i),
                  n.bufferData(e, t, r),
                  new g(e, r, i, t.byteLength)
                );
              }
            },
            {
              key: "updateRenderBuffer",
              value: function(e, t) {
                var r = this,
                  n =
                    arguments.length > 2 && void 0 !== arguments[2]
                      ? arguments[2]
                      : 0;
                if (e._buffer) {
                  var i = this._gl;
                  i.bindBuffer(e._target, e._buffer),
                    0 == n && e._length == t.byteLength
                      ? i.bufferData(e._target, t, e._usage)
                      : i.bufferSubData(e._target, n, t);
                } else
                  e.waitForComplete().then(function(e) {
                    r.updateRenderBuffer(e, t, n);
                  });
              }
            },
            {
              key: "createRenderPrimitive",
              value: function(e, t) {
                var r = this,
                  n = new T(e),
                  i = this._getMaterialProgram(t, n),
                  o = new S(this, t, i);
                return (
                  n.setRenderMaterial(o),
                  this._vao_ext &&
                    n.waitForComplete().then(function() {
                      (n._vao = r._vao_ext.createVertexArrayOES()),
                        r._vao_ext.bindVertexArrayOES(n._vao),
                        r._bindPrimitive(n),
                        r._vao_ext.bindVertexArrayOES(null);
                    }),
                  this._render_primitives[o._render_order] ||
                    (this._render_primitives[o._render_order] = []),
                  this._render_primitives[o._render_order].push(n),
                  n
                );
              }
            },
            {
              key: "createMesh",
              value: function(e, t) {
                var r = new u.Node();
                return (
                  r.addRenderPrimitive(this.createRenderPrimitive(e, t)), r
                );
              }
            },
            {
              key: "drawViews",
              value: function(e, t) {
                if (t) {
                  this._gl;
                  if (
                    (this._frame_id++,
                    t.markActive(this._frame_id),
                    1 == e.length && e[0].viewport)
                  ) {
                    var r = e[0].viewport;
                    this._gl.viewport(r.x, r.y, r.width, r.height);
                  }
                  for (var n = 0; n < e.length; ++n) {
                    mat4.invert(E, e[n].view_matrix),
                      this._camera_positions.length <= n &&
                        this._camera_positions.push(vec3.create());
                    var i = this._camera_positions[n];
                    vec3.set(i, 0, 0, 0), vec3.transformMat4(i, i, E);
                  }
                  var o = !0,
                    a = !1,
                    s = void 0;
                  try {
                    for (
                      var _, u = this._render_primitives[Symbol.iterator]();
                      !(o = (_ = u.next()).done);
                      o = !0
                    ) {
                      var l = _.value;
                      l && l.length && this._drawRenderPrimitiveSet(e, l);
                    }
                  } catch (e) {
                    (a = !0), (s = e);
                  } finally {
                    try {
                      !o && u.return && u.return();
                    } finally {
                      if (a) throw s;
                    }
                  }
                  this._vao_ext && this._vao_ext.bindVertexArrayOES(null);
                }
              }
            },
            {
              key: "_drawRenderPrimitiveSet",
              value: function(e, t) {
                var r = this._gl,
                  n = null,
                  i = null,
                  o = 0,
                  a = !0,
                  s = !1,
                  _ = void 0;
                try {
                  for (
                    var u, l = t[Symbol.iterator]();
                    !(a = (u = l.next()).done);
                    a = !0
                  ) {
                    var f = u.value;
                    if (f._active_frame_id == this._frame_id) {
                      n != f._material._program &&
                        ((n = f._material._program),
                        n.use(),
                        n.uniform.LIGHT_DIRECTION &&
                          r.uniform3fv(n.uniform.LIGHT_DIRECTION, d),
                        n.uniform.LIGHT_COLOR &&
                          r.uniform3fv(n.uniform.LIGHT_COLOR, v),
                        1 == e.length &&
                          (r.uniformMatrix4fv(
                            n.uniform.PROJECTION_MATRIX,
                            !1,
                            e[0].projection_matrix
                          ),
                          r.uniformMatrix4fv(
                            n.uniform.VIEW_MATRIX,
                            !1,
                            e[0].view_matrix
                          ),
                          r.uniform3fv(
                            n.uniform.CAMERA_POSITION,
                            this._camera_positions[0]
                          ),
                          r.uniform1i(n.uniform.EYE_INDEX, e[0].eye_index))),
                        i != f._material &&
                          (this._bindMaterialState(f._material, i),
                          f._material.bind(r, n, i),
                          (i = f._material)),
                        f._vao
                          ? this._vao_ext.bindVertexArrayOES(f._vao)
                          : (this._bindPrimitive(f, o),
                            (o = f._attribute_mask));
                      for (var c = 0; c < e.length; ++c) {
                        var h = e[c];
                        if (e.length > 1) {
                          if (h.viewport) {
                            var m = h.viewport;
                            r.viewport(m.x, m.y, m.width, m.height);
                          }
                          r.uniformMatrix4fv(
                            n.uniform.PROJECTION_MATRIX,
                            !1,
                            h.projection_matrix
                          ),
                            r.uniformMatrix4fv(
                              n.uniform.VIEW_MATRIX,
                              !1,
                              h.view_matrix
                            ),
                            r.uniform3fv(
                              n.uniform.CAMERA_POSITION,
                              this._camera_positions[c]
                            ),
                            r.uniform1i(n.uniform.EYE_INDEX, h.eye_index);
                        }
                        var p = !0,
                          y = !1,
                          b = void 0;
                        try {
                          for (
                            var g, x = f._instances[Symbol.iterator]();
                            !(p = (g = x.next()).done);
                            p = !0
                          ) {
                            var w = g.value;
                            w._active_frame_id == this._frame_id &&
                              (r.uniformMatrix4fv(
                                n.uniform.MODEL_MATRIX,
                                !1,
                                w.world_matrix
                              ),
                              f._index_buffer
                                ? r.drawElements(
                                    f._mode,
                                    f._element_count,
                                    f._index_type,
                                    f._index_byte_offset
                                  )
                                : r.drawArrays(f._mode, 0, f._element_count));
                          }
                        } catch (e) {
                          (y = !0), (b = e);
                        } finally {
                          try {
                            !p && x.return && x.return();
                          } finally {
                            if (y) throw b;
                          }
                        }
                      }
                    }
                  }
                } catch (e) {
                  (s = !0), (_ = e);
                } finally {
                  try {
                    !a && l.return && l.return();
                  } finally {
                    if (s) throw _;
                  }
                }
              }
            },
            {
              key: "_getRenderTexture",
              value: function(e) {
                var t = this;
                if (!e) return null;
                var r = e.texture_key;
                if (!r) throw new Error("Texure does not have a valid key");
                if (r in this._texture_cache) return this._texture_cache[r];
                var n = this._gl,
                  i = n.createTexture();
                return (
                  (this._texture_cache[r] = i),
                  e instanceof f.DataTexture
                    ? (n.bindTexture(n.TEXTURE_2D, i),
                      n.texImage2D(
                        n.TEXTURE_2D,
                        0,
                        e.format,
                        e.width,
                        e.height,
                        0,
                        e.format,
                        e._type,
                        e._data
                      ),
                      this._setSamplerParameters(e))
                    : e.waitForComplete().then(function() {
                        n.bindTexture(n.TEXTURE_2D, i),
                          n.texImage2D(
                            n.TEXTURE_2D,
                            0,
                            e.format,
                            e.format,
                            n.UNSIGNED_BYTE,
                            e._img
                          ),
                          t._setSamplerParameters(e);
                      }),
                  i
                );
              }
            },
            {
              key: "_setSamplerParameters",
              value: function(e) {
                var t = this._gl,
                  r = e.sampler,
                  n = i(e.width) && i(e.height),
                  o = n && e.mipmap;
                o && t.generateMipmap(t.TEXTURE_2D);
                var a = r.min_filter || (o ? t.LINEAR_MIPMAP_LINEAR : t.LINEAR),
                  s = r.wrap_s || (n ? t.REPEAT : t.CLAMP_TO_EDGE),
                  _ = r.wrap_t || (n ? t.REPEAT : t.CLAMP_TO_EDGE);
                t.texParameteri(
                  t.TEXTURE_2D,
                  t.TEXTURE_MAG_FILTER,
                  r.mag_filter || t.LINEAR
                ),
                  t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, a),
                  t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, s),
                  t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, _);
              }
            },
            {
              key: "_getProgramKey",
              value: function(e, t) {
                var r = e + ":";
                for (var n in t) r += n + "=" + t[n] + ",";
                return r;
              }
            },
            {
              key: "_getMaterialProgram",
              value: function(e, t) {
                var r = this,
                  n = e.material_name,
                  i = e.vertex_source,
                  o = e.fragment_source;
                if (null == n) throw new Error("Material does not have a name");
                if (null == i)
                  throw new Error(
                    'Material "' + n + '" does not have a vertex source'
                  );
                if (null == o)
                  throw new Error(
                    'Material "' + n + '" does not have a fragment source'
                  );
                var a = e.getProgramDefines(t),
                  s = this._getProgramKey(n, a);
                if (s in this._program_cache) return this._program_cache[s];
                var _ = !1,
                  u = i;
                u += _ ? y : p;
                var f = o.match(m),
                  h = f
                    ? ""
                    : "precision " + this._default_frag_precision + " float;\n",
                  d = h + o;
                d += b;
                var v = new l.Program(this._gl, u, d, c, a);
                return (
                  (this._program_cache[s] = v),
                  v.onNextUse(function(t) {
                    for (var n = 0; n < e._samplers.length; ++n) {
                      var i = e._samplers[n],
                        o = t.uniform[i._uniform_name];
                      o && r._gl.uniform1i(o, n);
                    }
                  }),
                  v
                );
              }
            },
            {
              key: "_bindPrimitive",
              value: function(e, t) {
                var r = this._gl;
                if (t != e._attribute_mask)
                  for (var n in c)
                    e._attribute_mask & h[n]
                      ? r.enableVertexAttribArray(c[n])
                      : r.disableVertexAttribArray(c[n]);
                var i = !0,
                  o = !1,
                  a = void 0;
                try {
                  for (
                    var s, _ = e._attribute_buffers[Symbol.iterator]();
                    !(i = (s = _.next()).done);
                    i = !0
                  ) {
                    var u = s.value;
                    r.bindBuffer(r.ARRAY_BUFFER, u._buffer._buffer);
                    var l = !0,
                      f = !1,
                      d = void 0;
                    try {
                      for (
                        var v, m = u._attributes[Symbol.iterator]();
                        !(l = (v = m.next()).done);
                        l = !0
                      ) {
                        var p = v.value;
                        r.vertexAttribPointer(
                          p._attrib_index,
                          p._component_count,
                          p._component_type,
                          p._normalized,
                          p._stride,
                          p._byte_offset
                        );
                      }
                    } catch (e) {
                      (f = !0), (d = e);
                    } finally {
                      try {
                        !l && m.return && m.return();
                      } finally {
                        if (f) throw d;
                      }
                    }
                  }
                } catch (e) {
                  (o = !0), (a = e);
                } finally {
                  try {
                    !i && _.return && _.return();
                  } finally {
                    if (o) throw a;
                  }
                }
                e._index_buffer
                  ? r.bindBuffer(
                      r.ELEMENT_ARRAY_BUFFER,
                      e._index_buffer._buffer
                    )
                  : r.bindBuffer(r.ELEMENT_ARRAY_BUFFER, null);
              }
            },
            {
              key: "_bindMaterialState",
              value: function(e) {
                var t =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : null,
                  r = this._gl,
                  n = e._state,
                  i = t ? t._state : ~n;
                if (n != i) {
                  if (e._capsDiff(i)) {
                    a(r, r.CULL_FACE, _.CAP.CULL_FACE, i, n),
                      a(r, r.BLEND, _.CAP.BLEND, i, n),
                      a(r, r.DEPTH_TEST, _.CAP.DEPTH_TEST, i, n),
                      a(r, r.STENCIL_TEST, _.CAP.STENCIL_TEST, i, n);
                    var o = (n & _.CAP.COLOR_MASK) - (i & _.CAP.COLOR_MASK);
                    if (o) {
                      var s = o > 1;
                      r.colorMask(s, s, s, s);
                    }
                    var u = (n & _.CAP.DEPTH_MASK) - (i & _.CAP.DEPTH_MASK);
                    u && r.depthMask(u > 1);
                    var l = (n & _.CAP.STENCIL_MASK) - (i & _.CAP.STENCIL_MASK);
                    l && r.stencilMask(l > 1);
                  }
                  e._blendDiff(i) &&
                    r.blendFunc(e.blend_func_src, e.blend_func_dst),
                    e._depthFuncDiff(i) && r.depthFunc(e.depth_func);
                }
              }
            },
            {
              key: "gl",
              get: function() {
                return this._gl;
              }
            }
          ]),
          e
        );
      })();
    },
    function(e, t) {
      "use strict";
      function r(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function n(e, t, r) {
        var n = (e & t) >> r;
        switch (n) {
          case 0:
          case 1:
            return n;
          default:
            return n - 2 + o.SRC_COLOR;
        }
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var i = (function() {
        function e(e, t) {
          for (var r = 0; r < t.length; r++) {
            var n = t[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(e, n.key, n);
          }
        }
        return function(t, r, n) {
          return r && e(t.prototype, r), n && e(t, n), t;
        };
      })();
      t.stateToBlendFunc = n;
      var o = WebGLRenderingContext,
        a = (t.CAP = {
          CULL_FACE: 1,
          BLEND: 2,
          DEPTH_TEST: 4,
          STENCIL_TEST: 8,
          COLOR_MASK: 16,
          DEPTH_MASK: 32,
          STENCIL_MASK: 64
        }),
        s = (t.MAT_STATE = {
          CAPS_RANGE: 255,
          BLEND_SRC_SHIFT: 8,
          BLEND_SRC_RANGE: 3840,
          BLEND_DST_SHIFT: 12,
          BLEND_DST_RANGE: 61440,
          BLEND_FUNC_RANGE: 65280,
          DEPTH_FUNC_SHIFT: 16,
          DEPTH_FUNC_RANGE: 983040
        }),
        _ = (t.RENDER_ORDER = {
          OPAQUE: 0,
          SKY: 1,
          TRANSPARENT: 2,
          ADDITIVE: 3,
          DEFAULT: 4
        }),
        u = (t.MaterialState = (function() {
          function e() {
            r(this, e),
              (this._state =
                a.CULL_FACE | a.DEPTH_TEST | a.COLOR_MASK | a.DEPTH_MASK),
              (this.blend_func_src = o.SRC_ALPHA),
              (this.blend_func_dst = o.ONE_MINUS_SRC_ALPHA),
              (this.depth_func = o.LESS);
          }
          return (
            i(e, [
              {
                key: "cull_face",
                get: function() {
                  return !!(this._state & a.CULL_FACE);
                },
                set: function(e) {
                  e
                    ? (this._state |= a.CULL_FACE)
                    : (this._state &= ~a.CULL_FACE);
                }
              },
              {
                key: "blend",
                get: function() {
                  return !!(this._state & a.BLEND);
                },
                set: function(e) {
                  e ? (this._state |= a.BLEND) : (this._state &= ~a.BLEND);
                }
              },
              {
                key: "depth_test",
                get: function() {
                  return !!(this._state & a.DEPTH_TEST);
                },
                set: function(e) {
                  e
                    ? (this._state |= a.DEPTH_TEST)
                    : (this._state &= ~a.DEPTH_TEST);
                }
              },
              {
                key: "stencil_test",
                get: function() {
                  return !!(this._state & a.STENCIL_TEST);
                },
                set: function(e) {
                  e
                    ? (this._state |= a.STENCIL_TEST)
                    : (this._state &= ~a.STENCIL_TEST);
                }
              },
              {
                key: "color_mask",
                get: function() {
                  return !!(this._state & a.COLOR_MASK);
                },
                set: function(e) {
                  e
                    ? (this._state |= a.COLOR_MASK)
                    : (this._state &= ~a.COLOR_MASK);
                }
              },
              {
                key: "depth_mask",
                get: function() {
                  return !!(this._state & a.DEPTH_MASK);
                },
                set: function(e) {
                  e
                    ? (this._state |= a.DEPTH_MASK)
                    : (this._state &= ~a.DEPTH_MASK);
                }
              },
              {
                key: "depth_func",
                get: function() {
                  return (
                    ((this._state & s.DEPTH_FUNC_RANGE) >> s.DEPTH_FUNC_SHIFT) +
                    WebGLRenderingContext.NEVER
                  );
                },
                set: function(e) {
                  (e -= WebGLRenderingContext.NEVER),
                    (this._state &= ~s.DEPTH_FUNC_RANGE),
                    (this._state |= e << s.DEPTH_FUNC_SHIFT);
                }
              },
              {
                key: "stencil_mask",
                get: function() {
                  return !!(this._state & a.STENCIL_MASK);
                },
                set: function(e) {
                  e
                    ? (this._state |= a.STENCIL_MASK)
                    : (this._state &= ~a.STENCIL_MASK);
                }
              },
              {
                key: "blend_func_src",
                get: function() {
                  return n(this._state, s.BLEND_SRC_RANGE, s.BLEND_SRC_SHIFT);
                },
                set: function(e) {
                  switch (e) {
                    case 0:
                    case 1:
                      break;
                    default:
                      e = e - WebGLRenderingContext.SRC_COLOR + 2;
                  }
                  (this._state &= ~s.BLEND_SRC_RANGE),
                    (this._state |= e << s.BLEND_SRC_SHIFT);
                }
              },
              {
                key: "blend_func_dst",
                get: function() {
                  return n(this._state, s.BLEND_DST_RANGE, s.BLEND_DST_SHIFT);
                },
                set: function(e) {
                  switch (e) {
                    case 0:
                    case 1:
                      break;
                    default:
                      e = e - WebGLRenderingContext.SRC_COLOR + 2;
                  }
                  (this._state &= ~s.BLEND_DST_RANGE),
                    (this._state |= e << s.BLEND_DST_SHIFT);
                }
              }
            ]),
            e
          );
        })()),
        l = (function() {
          function e(t) {
            r(this, e), (this._uniform_name = t), (this._texture = null);
          }
          return (
            i(e, [
              {
                key: "texture",
                get: function() {
                  return this._texture;
                },
                set: function(e) {
                  this._texture = e;
                }
              }
            ]),
            e
          );
        })(),
        f = (function() {
          function e(t, n, i) {
            r(this, e),
              (this._uniform_name = t),
              (this._value = n),
              (this._length = i),
              this._length ||
                (n instanceof Array
                  ? (this._length = n.length)
                  : (this._length = 1));
          }
          return (
            i(e, [
              {
                key: "value",
                get: function() {
                  return this._value;
                },
                set: function(e) {
                  this._value = e;
                }
              }
            ]),
            e
          );
        })();
      t.Material = (function() {
        function e() {
          r(this, e),
            (this.state = new u()),
            (this.render_order = _.DEFAULT),
            (this._samplers = []),
            (this._uniforms = []);
        }
        return (
          i(e, [
            {
              key: "defineSampler",
              value: function(e) {
                var t = new l(e);
                return this._samplers.push(t), t;
              }
            },
            {
              key: "defineUniform",
              value: function(e) {
                var t =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : null,
                  r =
                    arguments.length > 2 && void 0 !== arguments[2]
                      ? arguments[2]
                      : 0,
                  n = new f(e, t, r);
                return this._uniforms.push(n), n;
              }
            },
            {
              key: "getProgramDefines",
              value: function(e) {
                return {};
              }
            },
            {
              key: "material_name",
              get: function() {
                return null;
              }
            },
            {
              key: "vertex_source",
              get: function() {
                return null;
              }
            },
            {
              key: "fragment_source",
              get: function() {
                return null;
              }
            }
          ]),
          e
        );
      })();
    },
    function(e, t) {
      "use strict";
      function r(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = (function() {
          function e(e, t) {
            for (var r = 0; r < t.length; r++) {
              var n = t[r];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n);
            }
          }
          return function(t, r, n) {
            return r && e(t.prototype, r), n && e(t, n), t;
          };
        })(),
        i = new Float32Array([0, 0, 0]),
        o = new Float32Array([0, 0, 0, 1]),
        a = new Float32Array([1, 1, 1]);
      t.Node = (function() {
        function e() {
          r(this, e),
            (this.name = null),
            (this.children = []),
            (this.parent = null),
            (this.visible = !0),
            (this._matrix = null),
            (this._dirty_trs = !1),
            (this._translation = null),
            (this._rotation = null),
            (this._scale = null),
            (this._dirty_world_matrix = !1),
            (this._world_matrix = null),
            (this._active_frame_id = -1),
            (this._render_primitives = null);
        }
        return (
          n(e, [
            {
              key: "clone",
              value: function() {
                var t = new e();
                if (
                  ((t.name = this.name),
                  (t.visible = this.visible),
                  (t._dirty_trs = this._dirty_trs),
                  this._translation &&
                    ((t._translation = vec3.create()),
                    vec3.copy(t._translation, this._translation)),
                  this._rotation &&
                    ((t._rotation = quat.create()),
                    quat.copy(t._rotation, this._rotation)),
                  this._scale &&
                    ((t._scale = vec3.create()),
                    vec3.copy(t._scale, this._scale)),
                  !t._dirty_trs &&
                    this._matrix &&
                    ((t._matrix = mat4.create()),
                    mat4.copy(t._matrix, this._matrix)),
                  (t._dirty_world_matrix = this._dirty_world_matrix),
                  !t._dirty_world_matrix &&
                    this._world_matrix &&
                    ((t._world_matrix = mat4.create()),
                    mat4.copy(t._world_matrix, this._world_matrix)),
                  this._render_primitives)
                ) {
                  var r = !0,
                    n = !1,
                    i = void 0;
                  try {
                    for (
                      var o, a = this._render_primitives[Symbol.iterator]();
                      !(r = (o = a.next()).done);
                      r = !0
                    ) {
                      var s = o.value;
                      t.addRenderPrimitive(s);
                    }
                  } catch (e) {
                    (n = !0), (i = e);
                  } finally {
                    try {
                      !r && a.return && a.return();
                    } finally {
                      if (n) throw i;
                    }
                  }
                }
                var _ = !0,
                  u = !1,
                  l = void 0;
                try {
                  for (
                    var f, c = this.children[Symbol.iterator]();
                    !(_ = (f = c.next()).done);
                    _ = !0
                  ) {
                    var h = f.value;
                    t.addNode(h.clone());
                  }
                } catch (e) {
                  (u = !0), (l = e);
                } finally {
                  try {
                    !_ && c.return && c.return();
                  } finally {
                    if (u) throw l;
                  }
                }
                return t;
              }
            },
            {
              key: "markActive",
              value: function(e) {
                if (this.visible && this._render_primitives) {
                  this._active_frame_id = e;
                  var t = !0,
                    r = !1,
                    n = void 0;
                  try {
                    for (
                      var i, o = this._render_primitives[Symbol.iterator]();
                      !(t = (i = o.next()).done);
                      t = !0
                    ) {
                      var a = i.value;
                      a.markActive(e);
                    }
                  } catch (e) {
                    (r = !0), (n = e);
                  } finally {
                    try {
                      !t && o.return && o.return();
                    } finally {
                      if (r) throw n;
                    }
                  }
                }
                var s = !0,
                  _ = !1,
                  u = void 0;
                try {
                  for (
                    var l, f = this.children[Symbol.iterator]();
                    !(s = (l = f.next()).done);
                    s = !0
                  ) {
                    var c = l.value;
                    c.visible && c.markActive(e);
                  }
                } catch (e) {
                  (_ = !0), (u = e);
                } finally {
                  try {
                    !s && f.return && f.return();
                  } finally {
                    if (_) throw u;
                  }
                }
              }
            },
            {
              key: "addNode",
              value: function(e) {
                e &&
                  e.parent != this &&
                  (e.parent && e.parent.removeNode(e),
                  (e.parent = this),
                  this.children.push(e));
              }
            },
            {
              key: "removeNode",
              value: function(e) {
                var t = this.children.indexOf(e);
                t > -1 && (this.children.splice(t, 1), (e.parent = null));
              }
            },
            {
              key: "setMatrixDirty",
              value: function() {
                if (!this._dirty_world_matrix) {
                  this._dirty_world_matrix = !0;
                  var e = !0,
                    t = !1,
                    r = void 0;
                  try {
                    for (
                      var n, i = this.children[Symbol.iterator]();
                      !(e = (n = i.next()).done);
                      e = !0
                    ) {
                      var o = n.value;
                      o.setMatrixDirty();
                    }
                  } catch (e) {
                    (t = !0), (r = e);
                  } finally {
                    try {
                      !e && i.return && i.return();
                    } finally {
                      if (t) throw r;
                    }
                  }
                }
              }
            },
            {
              key: "_updateLocalMatrix",
              value: function() {
                return (
                  this._matrix || (this._matrix = mat4.create()),
                  this._dirty_trs &&
                    ((this._dirty_trs = !1),
                    mat4.fromRotationTranslationScale(
                      this._matrix,
                      this._rotation || o,
                      this._translation || i,
                      this._scale || a
                    )),
                  this._matrix
                );
              }
            },
            {
              key: "waitForComplete",
              value: function() {
                var e = this,
                  t = [],
                  r = !0,
                  n = !1,
                  i = void 0;
                try {
                  for (
                    var o, a = this.children[Symbol.iterator]();
                    !(r = (o = a.next()).done);
                    r = !0
                  ) {
                    var s = o.value;
                    t.push(s.waitForComplete());
                  }
                } catch (e) {
                  (n = !0), (i = e);
                } finally {
                  try {
                    !r && a.return && a.return();
                  } finally {
                    if (n) throw i;
                  }
                }
                if (this._render_primitives) {
                  var _ = !0,
                    u = !1,
                    l = void 0;
                  try {
                    for (
                      var f, c = this._render_primitives[Symbol.iterator]();
                      !(_ = (f = c.next()).done);
                      _ = !0
                    ) {
                      var h = f.value;
                      t.push(h.waitForComplete());
                    }
                  } catch (e) {
                    (u = !0), (l = e);
                  } finally {
                    try {
                      !_ && c.return && c.return();
                    } finally {
                      if (u) throw l;
                    }
                  }
                }
                return Promise.all(t).then(function() {
                  return e;
                });
              }
            },
            {
              key: "addRenderPrimitive",
              value: function(e) {
                this._render_primitives
                  ? this._render_primitives.push(e)
                  : (this._render_primitives = [e]),
                  e._instances.push(this);
              }
            },
            {
              key: "removeRenderPrimitive",
              value: function(e) {
                if (this._render_primitives) {
                  var t = this._render_primitives._instances.indexOf(e);
                  t > -1 &&
                    (this._render_primitives._instances.splice(t, 1),
                    (t = e._instances.indexOf(this)),
                    t > -1 && e._instances.splice(t, 1),
                    this._render_primitives.length ||
                      (this._render_primitives = null));
                }
              }
            },
            {
              key: "clearRenderPrimitives",
              value: function() {
                if (this._render_primitives) {
                  var e = !0,
                    t = !1,
                    r = void 0;
                  try {
                    for (
                      var n, i = this._render_primitives[Symbol.iterator]();
                      !(e = (n = i.next()).done);
                      e = !0
                    ) {
                      var o = n.value,
                        a = o._instances.indexOf(this);
                      a > -1 && o._instances.splice(a, 1);
                    }
                  } catch (e) {
                    (t = !0), (r = e);
                  } finally {
                    try {
                      !e && i.return && i.return();
                    } finally {
                      if (t) throw r;
                    }
                  }
                  this._render_primitives = null;
                }
              }
            },
            {
              key: "matrix",
              set: function(e) {
                (this._matrix = e),
                  this.setMatrixDirty(),
                  (this._dirty_trs = !1),
                  (this._translation = null),
                  (this._rotation = null),
                  (this._scale = null);
              },
              get: function() {
                return this.setMatrixDirty(), this._updateLocalMatrix();
              }
            },
            {
              key: "world_matrix",
              get: function() {
                return (
                  this._world_matrix ||
                    ((this._dirty_world_matrix = !0),
                    (this._world_matrix = mat4.create())),
                  (this._dirty_world_matrix || this._dirty_trs) &&
                    (this.parent
                      ? mat4.mul(
                          this._world_matrix,
                          this.parent.world_matrix,
                          this._updateLocalMatrix()
                        )
                      : mat4.copy(
                          this._world_matrix,
                          this._updateLocalMatrix()
                        ),
                    (this._dirty_world_matrix = !1)),
                  this._world_matrix
                );
              }
            },
            {
              key: "translation",
              set: function(e) {
                null != e && ((this._dirty_trs = !0), this.setMatrixDirty()),
                  (this._translation = e);
              },
              get: function() {
                return (
                  (this._dirty_trs = !0),
                  this.setMatrixDirty(),
                  this._translation || (this._translation = vec3.clone(i)),
                  this._translation
                );
              }
            },
            {
              key: "rotation",
              set: function(e) {
                null != e && ((this._dirty_trs = !0), this.setMatrixDirty()),
                  (this._rotation = e);
              },
              get: function() {
                return (
                  (this._dirty_trs = !0),
                  this.setMatrixDirty(),
                  this._rotation || (this._rotation = quat.clone(o)),
                  this._rotation
                );
              }
            },
            {
              key: "scale",
              set: function(e) {
                null != e && ((this._dirty_trs = !0), this.setMatrixDirty()),
                  (this._scale = e);
              },
              get: function() {
                return (
                  (this._dirty_trs = !0),
                  this.setMatrixDirty(),
                  this._scale || (this._scale = vec3.clone(a)),
                  this._scale
                );
              }
            },
            {
              key: "renderPrimitives",
              get: function() {
                return this._render_primitives;
              }
            }
          ]),
          e
        );
      })();
    },
    function(e, t) {
      "use strict";
      function r(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = (function() {
        function e(e, t) {
          for (var r = 0; r < t.length; r++) {
            var n = t[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(e, n.key, n);
          }
        }
        return function(t, r, n) {
          return r && e(t.prototype, r), n && e(t, n), t;
        };
      })();
      t.Program = (function() {
        function e(t, n, i, o, a) {
          r(this, e),
            (this._gl = t),
            (this.program = t.createProgram()),
            (this.attrib = null),
            (this.uniform = null),
            (this.defines = {}),
            (this._first_use = !0),
            (this._next_use_callbacks = []);
          var s = "";
          if (a)
            for (var _ in a)
              (this.defines[_] = a[_]),
                (s += "#define " + _ + " " + a[_] + "\n");
          if (
            ((this._vert_shader = t.createShader(t.VERTEX_SHADER)),
            t.attachShader(this.program, this._vert_shader),
            t.shaderSource(this._vert_shader, s + n),
            t.compileShader(this._vert_shader),
            (this._frag_shader = t.createShader(t.FRAGMENT_SHADER)),
            t.attachShader(this.program, this._frag_shader),
            t.shaderSource(this._frag_shader, s + i),
            t.compileShader(this._frag_shader),
            o)
          ) {
            this.attrib = {};
            for (var u in o)
              t.bindAttribLocation(this.program, o[u], u),
                (this.attrib[u] = o[u]);
          }
          t.linkProgram(this.program);
        }
        return (
          n(e, [
            {
              key: "onNextUse",
              value: function(e) {
                this._next_use_callbacks.push(e);
              }
            },
            {
              key: "use",
              value: function() {
                var e = this._gl;
                if (this._first_use) {
                  if (
                    ((this._first_use = !1),
                    e.getProgramParameter(this.program, e.LINK_STATUS))
                  ) {
                    if (!this.attrib) {
                      this.attrib = {};
                      for (
                        var t = e.getProgramParameter(
                            this.program,
                            e.ACTIVE_ATTRIBUTES
                          ),
                          r = 0;
                        r < t;
                        r++
                      ) {
                        var n = e.getActiveAttrib(this.program, r);
                        this.attrib[n.name] = e.getAttribLocation(
                          this.program,
                          n.name
                        );
                      }
                    }
                    this.uniform = {};
                    for (
                      var i = e.getProgramParameter(
                          this.program,
                          e.ACTIVE_UNIFORMS
                        ),
                        o = "",
                        a = 0;
                      a < i;
                      a++
                    ) {
                      var s = e.getActiveUniform(this.program, a);
                      (o = s.name.replace("[0]", "")),
                        (this.uniform[o] = e.getUniformLocation(
                          this.program,
                          o
                        ));
                    }
                  } else
                    e.getShaderParameter(this._vert_shader, e.COMPILE_STATUS)
                      ? e.getShaderParameter(
                          this._frag_shader,
                          e.COMPILE_STATUS
                        )
                        ? console.error(
                            "Program link error: " +
                              e.getProgramInfoLog(this.program)
                          )
                        : console.error(
                            "Fragment shader compile error: " +
                              e.getShaderInfoLog(this._frag_shader)
                          )
                      : console.error(
                          "Vertex shader compile error: " +
                            e.getShaderInfoLog(this._vert_shader)
                        ),
                      e.deleteProgram(this.program),
                      (this.program = null);
                  e.deleteShader(this._vert_shader),
                    e.deleteShader(this._frag_shader);
                }
                if (
                  (e.useProgram(this.program), this._next_use_callbacks.length)
                ) {
                  var _ = !0,
                    u = !1,
                    l = void 0;
                  try {
                    for (
                      var f, c = this._next_use_callbacks[Symbol.iterator]();
                      !(_ = (f = c.next()).done);
                      _ = !0
                    ) {
                      var h = f.value;
                      h(this);
                    }
                  } catch (e) {
                    (u = !0), (l = e);
                  } finally {
                    try {
                      !_ && c.return && c.return();
                    } finally {
                      if (u) throw l;
                    }
                  }
                  this._next_use_callbacks = [];
                }
              }
            }
          ]),
          e
        );
      })();
    },
    function(e, t) {
      "use strict";
      function r(e, t) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
      }
      function n(e, t) {
        if ("function" != typeof t && null !== t)
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof t
          );
        (e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          t &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, t)
              : (e.__proto__ = t));
      }
      function i(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var o = (function() {
          function e(e, t) {
            for (var r = 0; r < t.length; r++) {
              var n = t[r];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n);
            }
          }
          return function(t, r, n) {
            return r && e(t.prototype, r), n && e(t, n), t;
          };
        })(),
        a = WebGLRenderingContext,
        s = (t.TextureSampler = function e() {
          i(this, e),
            (this.min_filter = null),
            (this.mag_filter = null),
            (this.wrap_s = null),
            (this.wrap_t = null);
        }),
        _ = (t.Texture = (function() {
          function e() {
            i(this, e), (this.sampler = new s()), (this.mipmap = !0);
          }
          return (
            o(e, [
              {
                key: "format",
                get: function() {
                  return a.RGBA;
                }
              },
              {
                key: "width",
                get: function() {
                  return 0;
                }
              },
              {
                key: "height",
                get: function() {
                  return 0;
                }
              },
              {
                key: "texture_key",
                get: function() {
                  return null;
                }
              }
            ]),
            e
          );
        })()),
        u = (t.ImageTexture = (function(e) {
          function t(e) {
            i(this, t);
            var n = r(
              this,
              (t.__proto__ || Object.getPrototypeOf(t)).call(this)
            );
            return (
              (n._img = e),
              e.src && e.complete
                ? e.naturalWidth
                  ? (n._promise = Promise.resolve(n))
                  : (n._promise = Promise.reject(
                      "Image provided had failed to load."
                    ))
                : (n._promise = new Promise(function(t, r) {
                    e.addEventListener("load", function() {
                      return t(n);
                    }),
                      e.addEventListener("error", r);
                  })),
              n
            );
          }
          return (
            n(t, e),
            o(t, [
              {
                key: "waitForComplete",
                value: function() {
                  return this._promise;
                }
              },
              {
                key: "format",
                get: function() {
                  return a.RGBA;
                }
              },
              {
                key: "width",
                get: function() {
                  return this._img.width;
                }
              },
              {
                key: "height",
                get: function() {
                  return this._img.height;
                }
              },
              {
                key: "texture_key",
                get: function() {
                  return this._img.src;
                }
              }
            ]),
            t
          );
        })(_)),
        l = ((t.UrlTexture = (function(e) {
          function t(e) {
            i(this, t);
            var n = new Image(),
              o = r(
                this,
                (t.__proto__ || Object.getPrototypeOf(t)).call(this, n)
              );
            return (n.src = e), o;
          }
          return n(t, e), t;
        })(u)),
        (t.BlobTexture = (function(e) {
          function t(e) {
            i(this, t);
            var n = new Image(),
              o = r(
                this,
                (t.__proto__ || Object.getPrototypeOf(t)).call(this, n)
              );
            return (n.src = window.URL.createObjectURL(e)), o;
          }
          return n(t, e), t;
        })(u)),
        0),
        f = (t.DataTexture = (function(e) {
          function t(e, n, o) {
            var s =
                arguments.length > 3 && void 0 !== arguments[3]
                  ? arguments[3]
                  : a.RGBA,
              _ =
                arguments.length > 4 && void 0 !== arguments[4]
                  ? arguments[4]
                  : a.UNSIGNED_BYTE;
            i(this, t);
            var u = r(
              this,
              (t.__proto__ || Object.getPrototypeOf(t)).call(this)
            );
            return (
              (u._data = e),
              (u._width = n),
              (u._height = o),
              (u._format = s),
              (u._type = _),
              (u._key = "DATA_" + l),
              l++,
              u
            );
          }
          return (
            n(t, e),
            o(t, [
              {
                key: "format",
                get: function() {
                  return this._format;
                }
              },
              {
                key: "width",
                get: function() {
                  return this._width;
                }
              },
              {
                key: "height",
                get: function() {
                  return this._height;
                }
              },
              {
                key: "texture_key",
                get: function() {
                  return this._key;
                }
              }
            ]),
            t
          );
        })(_));
      t.ColorTexture = (function(e) {
        function t(e, n, o, a) {
          i(this, t);
          var s = new Uint8Array([255 * e, 255 * n, 255 * o, 255 * a]),
            _ = r(
              this,
              (t.__proto__ || Object.getPrototypeOf(t)).call(this, s, 1, 1)
            );
          return (
            (_.mipmap = !1),
            (_._key = "COLOR_" + s[0] + "_" + s[1] + "_" + s[2] + "_" + s[3]),
            _
          );
        }
        return n(t, e), t;
      })(f);
    },
    function(e, t, r) {
      "use strict";
      function n(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.GeometryBuilderBase = t.PrimitiveStream = void 0);
      var i = (function() {
          function e(e, t) {
            for (var r = 0; r < t.length; r++) {
              var n = t[r];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n);
            }
          }
          return function(t, r, n) {
            return r && e(t.prototype, r), n && e(t, n), t;
          };
        })(),
        o = r(8),
        a = WebGLRenderingContext,
        s = vec3.create(),
        _ = (t.PrimitiveStream = (function() {
          function e(t) {
            n(this, e),
              (this._vertices = []),
              (this._indices = []),
              (this._geometry_started = !1),
              (this._vertex_offset = 0),
              (this._vertex_index = 0),
              (this._high_index = 0),
              (this._flip_winding = !1),
              (this._invert_normals = !1),
              (this._transform = null),
              (this._normal_transform = null),
              (this._min = null),
              (this._max = null);
          }
          return (
            i(e, [
              {
                key: "startGeometry",
                value: function() {
                  if (this._geometry_started)
                    throw new Error(
                      "Attempted to start a new geometry before the previous one was ended."
                    );
                  (this._geometry_started = !0),
                    (this._vertex_index = 0),
                    (this._high_index = 0);
                }
              },
              {
                key: "endGeometry",
                value: function() {
                  if (!this._geometry_started)
                    throw new Error(
                      "Attempted to end a geometry before one was started."
                    );
                  if (this._high_index >= this._vertex_index)
                    throw new Error(
                      "Geometry contains indices that are out of bounds. (Contains an index of " +
                        this._high_index +
                        " when the vertex count is " +
                        this._vertex_index +
                        ")"
                    );
                  (this._geometry_started = !1),
                    (this._vertex_offset += this._vertex_index);
                }
              },
              {
                key: "pushVertex",
                value: function(e, t, r, n, i, o, a, _) {
                  if (!this._geometry_started)
                    throw new Error(
                      "Cannot push vertices before calling startGeometry()."
                    );
                  return (
                    this._transform &&
                      ((s[0] = e),
                      (s[1] = t),
                      (s[2] = r),
                      vec3.transformMat4(s, s, this._transform),
                      (e = s[0]),
                      (t = s[1]),
                      (r = s[2]),
                      (s[0] = o),
                      (s[1] = a),
                      (s[2] = _),
                      vec3.transformMat3(s, s, this._normal_transform),
                      (o = s[0]),
                      (a = s[1]),
                      (_ = s[2])),
                    this._invert_normals && ((o *= -1), (a *= -1), (_ *= -1)),
                    this._vertices.push(e, t, r, n, i, o, a, _),
                    this._min
                      ? ((this._min[0] = Math.min(this._min[0], e)),
                        (this._min[1] = Math.min(this._min[1], t)),
                        (this._min[2] = Math.min(this._min[2], r)),
                        (this._max[0] = Math.max(this._max[0], e)),
                        (this._max[1] = Math.max(this._max[1], t)),
                        (this._max[2] = Math.max(this._max[2], r)))
                      : ((this._min = vec3.fromValues(e, t, r)),
                        (this._max = vec3.fromValues(e, t, r))),
                    this._vertex_index++
                  );
                }
              },
              {
                key: "pushTriangle",
                value: function(e, t, r) {
                  if (!this._geometry_started)
                    throw new Error(
                      "Cannot push triangles before calling startGeometry()."
                    );
                  (this._high_index = Math.max(this._high_index, e, t, r)),
                    (e += this._vertex_offset),
                    (t += this._vertex_offset),
                    (r += this._vertex_offset),
                    this._flip_winding
                      ? this._indices.push(r, t, e)
                      : this._indices.push(e, t, r);
                }
              },
              {
                key: "clear",
                value: function() {
                  if (this._geometry_started)
                    throw new Error(
                      "Cannot clear before ending the current geometry."
                    );
                  (this._vertices = []),
                    (this._indices = []),
                    (this._vertex_offset = 0),
                    (this._min = null),
                    (this._max = null);
                }
              },
              {
                key: "finishPrimitive",
                value: function(e) {
                  if (!this._vertex_offset)
                    throw new Error(
                      "Attempted to call finishPrimitive() before creating any geometry."
                    );
                  var t = e.createRenderBuffer(
                      a.ARRAY_BUFFER,
                      new Float32Array(this._vertices)
                    ),
                    r = e.createRenderBuffer(
                      a.ELEMENT_ARRAY_BUFFER,
                      new Uint16Array(this._indices)
                    ),
                    n = [
                      new o.PrimitiveAttribute(
                        "POSITION",
                        t,
                        3,
                        a.FLOAT,
                        32,
                        0
                      ),
                      new o.PrimitiveAttribute(
                        "TEXCOORD_0",
                        t,
                        2,
                        a.FLOAT,
                        32,
                        12
                      ),
                      new o.PrimitiveAttribute("NORMAL", t, 3, a.FLOAT, 32, 20)
                    ],
                    i = new o.Primitive(n, this._indices.length);
                  return i.setIndexBuffer(r), i;
                }
              },
              {
                key: "flip_winding",
                set: function(e) {
                  if (this._geometry_started)
                    throw new Error(
                      "Cannot change flip_winding before ending the current geometry."
                    );
                  this._flip_winding = e;
                },
                get: function() {
                  this._flip_winding;
                }
              },
              {
                key: "invert_normals",
                set: function(e) {
                  if (this._geometry_started)
                    throw new Error(
                      "Cannot change invert_normals before ending the current geometry."
                    );
                  this._invert_normals = e;
                },
                get: function() {
                  this._invert_normals;
                }
              },
              {
                key: "transform",
                set: function(e) {
                  if (this._geometry_started)
                    throw new Error(
                      "Cannot change transform before ending the current geometry."
                    );
                  (this._transform = e),
                    this._transform &&
                      (this._normal_transform ||
                        (this._normal_transform = mat3.create()),
                      mat3.fromMat4(this._normal_transform, this._transform));
                },
                get: function() {
                  this._transform;
                }
              },
              {
                key: "next_vertex_index",
                get: function() {
                  return this._vertex_index;
                }
              }
            ]),
            e
          );
        })());
      t.GeometryBuilderBase = (function() {
        function e(t) {
          n(this, e), t ? (this._stream = t) : (this._stream = new _());
        }
        return (
          i(e, [
            {
              key: "finishPrimitive",
              value: function(e) {
                this._stream.finishPrimitive(e);
              }
            },
            {
              key: "primitive_stream",
              set: function(e) {
                this._stream = e;
              },
              get: function() {
                return this._stream;
              }
            }
          ]),
          e
        );
      })();
    },
    function(e, t) {
      "use strict";
      function r(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = (function() {
        function e(e, t) {
          for (var r = 0; r < t.length; r++) {
            var n = t[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(e, n.key, n);
          }
        }
        return function(t, r, n) {
          return r && e(t.prototype, r), n && e(t, n), t;
        };
      })();
      (t.PrimitiveAttribute = function e(t, n, i, o, a, s) {
        r(this, e),
          (this.name = t),
          (this.buffer = n),
          (this.component_count = i || 3),
          (this.component_type = o || 5126),
          (this.stride = a || 0),
          (this.byte_offset = s || 0),
          (this.normalized = !1);
      }),
        (t.Primitive = (function() {
          function e(t, n, i) {
            r(this, e),
              (this.attributes = t || []),
              (this.element_count = n || 0),
              (this.mode = i || 4),
              (this.index_buffer = null),
              (this.index_byte_offset = 0),
              (this.index_type = 0);
          }
          return (
            n(e, [
              {
                key: "setIndexBuffer",
                value: function(e, t, r) {
                  (this.index_buffer = e),
                    (this.index_byte_offset = t || 0),
                    (this.index_type = r || 5123);
                }
              }
            ]),
            e
          );
        })());
    },
    function(e, t, r) {
      "use strict";
      function n(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function i(e, t) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
      }
      function o(e, t) {
        if ("function" != typeof t && null !== t)
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof t
          );
        (e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          t &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, t)
              : (e.__proto__ = t));
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.BoxBuilder = void 0);
      var a = (function() {
          function e(e, t) {
            for (var r = 0; r < t.length; r++) {
              var n = t[r];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n);
            }
          }
          return function(t, r, n) {
            return r && e(t.prototype, r), n && e(t, n), t;
          };
        })(),
        s = r(7);
      t.BoxBuilder = (function(e) {
        function t() {
          return (
            n(this, t),
            i(
              this,
              (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)
            )
          );
        }
        return (
          o(t, e),
          a(t, [
            {
              key: "pushBox",
              value: function(e, t) {
                var r = this.primitive_stream,
                  n = t[0] - e[0],
                  i = t[1] - e[1],
                  o = t[2] - e[2],
                  a = 0.5 * n,
                  s = 0.5 * i,
                  _ = 0.5 * o,
                  u = e[0] + a,
                  l = e[1] + s,
                  f = e[2] + _;
                r.startGeometry();
                var c = r.next_vertex_index;
                r.pushTriangle(c, c + 1, c + 2),
                  r.pushTriangle(c, c + 2, c + 3),
                  r.pushVertex(-a + u, -s + l, -_ + f, 0, 1, 0, -1, 0),
                  r.pushVertex(+a + u, -s + l, -_ + f, 1, 1, 0, -1, 0),
                  r.pushVertex(+a + u, -s + l, +_ + f, 1, 0, 0, -1, 0),
                  r.pushVertex(-a + u, -s + l, +_ + f, 0, 0, 0, -1, 0),
                  (c = r.next_vertex_index),
                  r.pushTriangle(c, c + 2, c + 1),
                  r.pushTriangle(c, c + 3, c + 2),
                  r.pushVertex(-a + u, +s + l, -_ + f, 0, 0, 0, 1, 0),
                  r.pushVertex(+a + u, +s + l, -_ + f, 1, 0, 0, 1, 0),
                  r.pushVertex(+a + u, +s + l, +_ + f, 1, 1, 0, 1, 0),
                  r.pushVertex(-a + u, +s + l, +_ + f, 0, 1, 0, 1, 0),
                  (c = r.next_vertex_index),
                  r.pushTriangle(c, c + 2, c + 1),
                  r.pushTriangle(c, c + 3, c + 2),
                  r.pushVertex(-a + u, -s + l, -_ + f, 0, 1, -1, 0, 0),
                  r.pushVertex(-a + u, +s + l, -_ + f, 0, 0, -1, 0, 0),
                  r.pushVertex(-a + u, +s + l, +_ + f, 1, 0, -1, 0, 0),
                  r.pushVertex(-a + u, -s + l, +_ + f, 1, 1, -1, 0, 0),
                  (c = r.next_vertex_index),
                  r.pushTriangle(c, c + 1, c + 2),
                  r.pushTriangle(c, c + 2, c + 3),
                  r.pushVertex(+a + u, -s + l, -_ + f, 1, 1, 1, 0, 0),
                  r.pushVertex(+a + u, +s + l, -_ + f, 1, 0, 1, 0, 0),
                  r.pushVertex(+a + u, +s + l, +_ + f, 0, 0, 1, 0, 0),
                  r.pushVertex(+a + u, -s + l, +_ + f, 0, 1, 1, 0, 0),
                  (c = r.next_vertex_index),
                  r.pushTriangle(c, c + 2, c + 1),
                  r.pushTriangle(c, c + 3, c + 2),
                  r.pushVertex(-a + u, -s + l, -_ + f, 1, 1, 0, 0, -1),
                  r.pushVertex(+a + u, -s + l, -_ + f, 0, 1, 0, 0, -1),
                  r.pushVertex(+a + u, +s + l, -_ + f, 0, 0, 0, 0, -1),
                  r.pushVertex(-a + u, +s + l, -_ + f, 1, 0, 0, 0, -1),
                  (c = r.next_vertex_index),
                  r.pushTriangle(c, c + 1, c + 2),
                  r.pushTriangle(c, c + 2, c + 3),
                  r.pushVertex(-a + u, -s + l, +_ + f, 0, 1, 0, 0, 1),
                  r.pushVertex(+a + u, -s + l, +_ + f, 1, 1, 0, 0, 1),
                  r.pushVertex(+a + u, +s + l, +_ + f, 1, 0, 0, 0, 1),
                  r.pushVertex(-a + u, +s + l, +_ + f, 0, 0, 0, 0, 1),
                  r.endGeometry();
              }
            },
            {
              key: "pushCube",
              value: function() {
                var e =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : [0, 0, 0],
                  t =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : 1,
                  r = 0.5 * t;
                this.pushBox(
                  [e[0] - r, e[1] - r, e[2] - r],
                  [e[0] + r, e[1] + r, e[2] + r]
                );
              }
            }
          ]),
          t
        );
      })(s.GeometryBuilderBase);
    },
    function(e, t, r) {
      "use strict";
      function n(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function i(e, t) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
      }
      function o(e, t) {
        if ("function" != typeof t && null !== t)
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof t
          );
        (e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          t &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, t)
              : (e.__proto__ = t));
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.PbrMaterial = void 0);
      var a = (function() {
          function e(e, t) {
            for (var r = 0; r < t.length; r++) {
              var n = t[r];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n);
            }
          }
          return function(t, r, n) {
            return r && e(t.prototype, r), n && e(t, n), t;
          };
        })(),
        s = r(3),
        _ = r(2),
        u =
          "\nattribute vec3 POSITION, NORMAL;\nattribute vec2 TEXCOORD_0, TEXCOORD_1;\n\nuniform vec3 CAMERA_POSITION;\nuniform vec3 LIGHT_DIRECTION;\n\nvarying vec3 vLight; // Vector from vertex to light.\nvarying vec3 vView; // Vector from vertex to camera.\nvarying vec2 vTex;\n\n#ifdef USE_NORMAL_MAP\nattribute vec4 TANGENT;\nvarying mat3 vTBN;\n#else\nvarying vec3 vNorm;\n#endif\n\n#ifdef USE_VERTEX_COLOR\nattribute vec4 COLOR_0;\nvarying vec4 vCol;\n#endif\n\nvec4 vertex_main(mat4 proj, mat4 view, mat4 model) {\n  vec3 n = normalize(vec3(model * vec4(NORMAL, 0.0)));\n#ifdef USE_NORMAL_MAP\n  vec3 t = normalize(vec3(model * vec4(TANGENT.xyz, 0.0)));\n  vec3 b = cross(n, t) * TANGENT.w;\n  vTBN = mat3(t, b, n);\n#else\n  vNorm = n;\n#endif\n\n#ifdef USE_VERTEX_COLOR\n  vCol = COLOR_0;\n#endif\n\n  vTex = TEXCOORD_0;\n  vec4 mPos = model * vec4(POSITION, 1.0);\n  vLight = -LIGHT_DIRECTION;\n  vView = CAMERA_POSITION - mPos.xyz;\n  return proj * view * mPos;\n}",
        l =
          "\nvec3 lambertDiffuse(vec3 cDiff) {\n  return cDiff / M_PI;\n}\n\nfloat specD(float a, float nDotH) {\n  float aSqr = a * a;\n  float f = ((nDotH * nDotH) * (aSqr - 1.0) + 1.0);\n  return aSqr / (M_PI * f * f);\n}\n\nfloat specG(float roughness, float nDotL, float nDotV) {\n  float k = (roughness + 1.0) * (roughness + 1.0) / 8.0;\n  float gl = nDotL / (nDotL * (1.0 - k) + k);\n  float gv = nDotV / (nDotV * (1.0 - k) + k);\n  return gl * gv;\n}\n\nvec3 specF(float vDotH, vec3 F0) {\n  float exponent = (-5.55473 * vDotH - 6.98316) * vDotH;\n  float base = 2.0;\n  return F0 + (1.0 - F0) * pow(base, exponent);\n}",
        f =
          "\n#define M_PI 3.14159265\n\nuniform vec4 baseColorFactor;\n#ifdef USE_BASE_COLOR_MAP\nuniform sampler2D baseColorTex;\n#endif\n\nvarying vec3 vLight;\nvarying vec3 vView;\nvarying vec2 vTex;\n\n#ifdef USE_VERTEX_COLOR\nvarying vec4 vCol;\n#endif\n\n#ifdef USE_NORMAL_MAP\nuniform sampler2D normalTex;\nvarying mat3 vTBN;\n#else\nvarying vec3 vNorm;\n#endif\n\n#ifdef USE_METAL_ROUGH_MAP\nuniform sampler2D metallicRoughnessTex;\n#endif\nuniform vec2 metallicRoughnessFactor;\n\n#ifdef USE_OCCLUSION\nuniform sampler2D occlusionTex;\nuniform float occlusionStrength;\n#endif\n\n#ifdef USE_EMISSIVE\nuniform sampler2D emissiveTex;\nuniform vec3 emissiveFactor;\n#endif\n\nuniform vec3 LIGHT_COLOR;\n\nconst vec3 dielectricSpec = vec3(0.04);\nconst vec3 black = vec3(0.0);\n\n" +
          l +
          "\n\nvec4 fragment_main() {\n#ifdef USE_BASE_COLOR_MAP\n  vec4 baseColor = texture2D(baseColorTex, vTex) * baseColorFactor;\n#else\n  vec4 baseColor = baseColorFactor;\n#endif\n\n#ifdef USE_VERTEX_COLOR\n  baseColor *= vCol;\n#endif\n\n#ifdef USE_NORMAL_MAP\n  vec3 n = texture2D(normalTex, vTex).rgb;\n  n = normalize(vTBN * (2.0 * n - 1.0));\n#else\n  vec3 n = normalize(vNorm);\n#endif\n\n#ifdef FULLY_ROUGH\n  float metallic = 0.0;\n#else\n  float metallic = metallicRoughnessFactor.x;\n#endif\n\n  float roughness = metallicRoughnessFactor.y;\n\n#ifdef USE_METAL_ROUGH_MAP\n  vec4 metallicRoughness = texture2D(metallicRoughnessTex, vTex);\n  metallic *= metallicRoughness.b;\n  roughness *= metallicRoughness.g;\n#endif\n  \n  vec3 l = normalize(vLight);\n  vec3 v = normalize(vView);\n  vec3 h = normalize(l+v);\n\n  float nDotL = clamp(dot(n, l), 0.001, 1.0);\n  float nDotV = abs(dot(n, v)) + 0.001;\n  float nDotH = max(dot(n, h), 0.0);\n  float vDotH = max(dot(v, h), 0.0);\n\n  // From GLTF Spec\n  vec3 cDiff = mix(baseColor.rgb * (1.0 - dielectricSpec.r), black, metallic); // Diffuse color\n  vec3 F0 = mix(dielectricSpec, baseColor.rgb, metallic); // Specular color\n  float a = roughness * roughness;\n\n#ifdef FULLY_ROUGH\n  vec3 specular = F0 * 0.45;\n#else\n  vec3 F = specF(vDotH, F0);\n  float D = specD(a, nDotH);\n  float G = specG(roughness, nDotL, nDotV);\n  vec3 specular = (D * F * G) / (4.0 * nDotL * nDotV);\n#endif\n  float halfLambert = dot(n, l) * 0.5 + 0.5;\n  halfLambert *= halfLambert;\n\n  vec3 color = (halfLambert * LIGHT_COLOR * lambertDiffuse(cDiff)) + specular;\n\n#ifdef USE_OCCLUSION\n  float occlusion = texture2D(occlusionTex, vTex).r;\n  color = mix(color, color * occlusion, occlusionStrength);\n#endif\n\n#ifdef USE_EMISSIVE\n  color += texture2D(emissiveTex, vTex).rgb * emissiveFactor;\n#endif\n\n  // gamma correction\n  color = pow(color, vec3(1.0/2.2));\n\n  return vec4(color, baseColor.a);\n}";
      t.PbrMaterial = (function(e) {
        function t() {
          n(this, t);
          var e = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
          return (
            (e.base_color = e.defineSampler("baseColorTex")),
            (e.metallic_roughness = e.defineSampler("metallicRoughnessTex")),
            (e.normal = e.defineSampler("normalTex")),
            (e.occlusion = e.defineSampler("occlusionTex")),
            (e.emissive = e.defineSampler("emissiveTex")),
            (e.base_color_factor = e.defineUniform("baseColorFactor", [
              1,
              1,
              1,
              1
            ])),
            (e.metallic_roughness_factor = e.defineUniform(
              "metallicRoughnessFactor",
              [1, 1]
            )),
            (e.occlusion_strength = e.defineUniform("occlusionStrength", 1)),
            (e.emissive_factor = e.defineUniform("emissiveFactor", [0, 0, 0])),
            e
          );
        }
        return (
          o(t, e),
          a(t, [
            {
              key: "getProgramDefines",
              value: function(e) {
                var t = {};
                return (
                  e._attribute_mask & _.ATTRIB_MASK.COLOR_0 &&
                    (t.USE_VERTEX_COLOR = 1),
                  e._attribute_mask & _.ATTRIB_MASK.TEXCOORD_0 &&
                    (this.base_color.texture && (t.USE_BASE_COLOR_MAP = 1),
                    this.normal.texture &&
                      e._attribute_mask & _.ATTRIB_MASK.TANGENT &&
                      (t.USE_NORMAL_MAP = 1),
                    this.metallic_roughness.texture &&
                      (t.USE_METAL_ROUGH_MAP = 1),
                    this.occlusion.texture && (t.USE_OCCLUSION = 1),
                    this.emissive.texture && (t.USE_EMISSIVE = 1)),
                  (this.metallic_roughness.texture &&
                    e._attribute_mask & _.ATTRIB_MASK.TEXCOORD_0) ||
                    1 != this.metallic_roughness_factor.value[1] ||
                    (t.FULLY_ROUGH = 1),
                  t
                );
              }
            },
            {
              key: "material_name",
              get: function() {
                return "PBR";
              }
            },
            {
              key: "vertex_source",
              get: function() {
                return u;
              }
            },
            {
              key: "fragment_source",
              get: function() {
                return f;
              }
            }
          ]),
          t
        );
      })(s.Material);
    },
    function(e, t, r) {
      "use strict";
      function n(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function i(e, t) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
      }
      function o(e, t) {
        if ("function" != typeof t && null !== t)
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof t
          );
        (e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          t &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, t)
              : (e.__proto__ = t));
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.Scene = t.WebXRView = void 0);
      var a = (function() {
          function e(e, t) {
            for (var r = 0; r < t.length; r++) {
              var n = t[r];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n);
            }
          }
          return function(t, r, n) {
            return r && e(t.prototype, r), n && e(t, n), t;
          };
        })(),
        s = r(2),
        _ = r(12),
        u = r(13),
        l = r(14),
        f = r(15),
        c = (r(5), r(4)),
        h = r(17),
        d = (t.WebXRView = (function(e) {
          function t(e, r, o) {
            return (
              n(this, t),
              i(
                this,
                (t.__proto__ || Object.getPrototypeOf(t)).call(
                  this,
                  e ? e.projectionMatrix : null,
                  r && e ? r.getViewMatrix(e) : null,
                  o && e ? o.getViewport(e) : null,
                  e ? e.eye : "left"
                )
              )
            );
          }
          return o(t, e), t;
        })(s.RenderView));
      t.Scene = (function(e) {
        function t() {
          n(this, t);
          var e = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
          return (
            (e._timestamp = -1),
            (e._frame_delta = 0),
            (e._stats_enabled = !0),
            (e._stats_standing = !1),
            (e._stats = null),
            (e._stage_bounds = null),
            (e._bounds_renderer = null),
            (e._renderer = null),
            (e._input_renderer = null),
            (e._reset_input_end_frame = !0),
            (e._skybox = null),
            (e._gltf2_loader = null),
            e
          );
        }
        return (
          o(t, e),
          a(t, [
            {
              key: "setRenderer",
              value: function(e) {
                (this._renderer = e),
                  e.gl.clearColor(0.1, 0.2, 0.3, 1),
                  e &&
                    ((this._gltf2_loader = new h.GLTF2Loader(e)),
                    this._skybox && this._skybox.setRenderer(e),
                    this._stats_enabled &&
                      ((this._stats = new f.StatsViewer(this._renderer)),
                      this.addNode(this._stats),
                      this._stats_standing
                        ? (this._stats.translation = [0, 1.4, -0.75])
                        : (this._stats.translation = [0, -0.3, -0.5]),
                      (this._stats.scale = [0.3, 0.3, 0.3]),
                      quat.fromEuler(this._stats.rotation, -45, 0, 0)),
                    this._stage_bounds &&
                      ((this._bounds_renderer = new _.BoundsRenderer(
                        this._renderer
                      )),
                      (this._bounds_renderer.stage_bounds = this._stage_bounds)),
                    (this._input_renderer = new u.InputRenderer(
                      this._renderer
                    )),
                    this.addNode(this._input_renderer),
                    this.onLoadScene(this._renderer));
              }
            },
            {
              key: "setSkybox",
              value: function(e) {
                this._skybox &&
                  (this.removeNode(this._skybox), (this._skybox = null)),
                  e &&
                    ((this._skybox = new l.Skybox(e)),
                    this.addNode(this._skybox),
                    this._renderer && this._skybox.setRenderer(this._renderer));
              }
            },
            {
              key: "loseRenderer",
              value: function() {
                this._renderer &&
                  ((this._stats = null),
                  (this.texture_loader = null),
                  (this._renderer = null),
                  (this._input_renderer = null));
              }
            },
            {
              key: "enableStats",
              value: function(e) {
                e != this._stats_enabled &&
                  ((this._stats_enabled = e),
                  e && this._renderer
                    ? ((this._stats = new f.StatsViewer(this._renderer)),
                      this.addNode(this._stats),
                      this._stats_standing
                        ? (this._stats.translation = [0, 1.4, -0.75])
                        : (this._stats.translation = [0, -0.3, -0.5]),
                      (this._stats.scale = [0.3, 0.3, 0.3]),
                      quat.fromEuler(this._stats.rotation, -45, 0, 0))
                    : e ||
                      (this._stats &&
                        (this.removeNode(this._stats), (this._stats = null))));
              }
            },
            {
              key: "standingStats",
              value: function(e) {
                this._stats_standing = e;
              }
            },
            {
              key: "setBounds",
              value: function(e) {
                (this._stage_bounds = e),
                  !this._bounds_renderer &&
                    this._renderer &&
                    (this._bounds_renderer = new _.BoundsRenderer(
                      this._renderer
                    )),
                  this._bounds_renderer &&
                    (this._bounds_renderer.stage_bounds = e);
              }
            },
            {
              key: "draw",
              value: function(e, t, r) {
                var n = new s.RenderView();
                (n.projection_matrix = e),
                  (n.view_matrix = t),
                  r && (n.eye = r),
                  this.drawViewArray([n]);
              }
            },
            {
              key: "drawXRFrame",
              value: function(e, t) {
                if (this._renderer) {
                  var r = this._renderer.gl,
                    n = e.session,
                    i = n.baseLayer;
                  if (
                    r &&
                    (r.bindFramebuffer(r.FRAMEBUFFER, i.framebuffer),
                    r.clear(r.COLOR_BUFFER_BIT | r.DEPTH_BUFFER_BIT),
                    t)
                  ) {
                    var o = [],
                      a = !0,
                      s = !1,
                      _ = void 0;
                    try {
                      for (
                        var u, l = e.views[Symbol.iterator]();
                        !(a = (u = l.next()).done);
                        a = !0
                      ) {
                        var f = u.value;
                        o.push(new d(f, t, i));
                      }
                    } catch (e) {
                      (s = !0), (_ = e);
                    } finally {
                      try {
                        !a && l.return && l.return();
                      } finally {
                        if (s) throw _;
                      }
                    }
                    this.drawViewArray(o);
                  }
                }
              }
            },
            {
              key: "drawViewArray",
              value: function(e) {
                this._renderer &&
                  this.onDrawViews(this._renderer, this._timestamp, e);
              }
            },
            {
              key: "startFrame",
              value: function() {
                var e = this._timestamp;
                return (
                  (this._timestamp = performance.now()),
                  this._stats && this._stats.begin(),
                  e >= 0
                    ? (this._frame_delta = this._timestamp - e)
                    : (this._frame_delta = 0),
                  this._frame_delta
                );
              }
            },
            {
              key: "endFrame",
              value: function() {
                this._input_renderer &&
                  this._reset_input_end_frame &&
                  this._input_renderer.reset(),
                  this._stats && this._stats.end();
              }
            },
            {
              key: "onLoadScene",
              value: function(e) {
                return Promise.resolve();
              }
            },
            {
              key: "onDrawViews",
              value: function(e, t, r) {
                e.drawViews(r, this);
              }
            },
            {
              key: "gltf2Loader",
              get: function() {
                return this._gltf2_loader;
              }
            },
            {
              key: "inputRenderer",
              get: function() {
                return this._input_renderer;
              }
            }
          ]),
          t
        );
      })(c.Node);
    },
    function(e, t, r) {
      "use strict";
      function n(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function i(e, t) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
      }
      function o(e, t) {
        if ("function" != typeof t && null !== t)
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof t
          );
        (e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          t &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, t)
              : (e.__proto__ = t));
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.BoundsRenderer = void 0);
      var a = (function() {
          function e(e, t) {
            for (var r = 0; r < t.length; r++) {
              var n = t[r];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n);
            }
          }
          return function(t, r, n) {
            return r && e(t.prototype, r), n && e(t, n), t;
          };
        })(),
        s = r(3),
        _ = r(4),
        u = r(8),
        l = WebGLRenderingContext,
        f = (function(e) {
          function t() {
            n(this, t);
            var e = i(
              this,
              (t.__proto__ || Object.getPrototypeOf(t)).call(this)
            );
            return (
              (e.state.blend = !0),
              (e.state.blend_func_src = l.SRC_ALPHA),
              (e.state.blend_func_dst = l.ONE),
              (e.state.depth_test = !1),
              e
            );
          }
          return (
            o(t, e),
            a(t, [
              {
                key: "material_name",
                get: function() {
                  return "BOUNDS_RENDERER";
                }
              },
              {
                key: "vertex_source",
                get: function() {
                  return "\n    attribute vec2 POSITION;\n\n    vec4 vertex_main(mat4 proj, mat4 view, mat4 model) {\n      return proj * view * model * vec4(POSITION, 1.0);\n    }";
                }
              },
              {
                key: "fragment_source",
                get: function() {
                  return "\n    precision mediump float;\n\n    vec4 fragment_main() {\n      return vec4(0.0, 1.0, 0.0, 0.3);\n    }";
                }
              }
            ]),
            t
          );
        })(s.Material);
      t.BoundsRenderer = (function(e) {
        function t(e) {
          n(this, t);
          var r = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
          return (r._renderer = e), (r._stage_bounds = null), r;
        }
        return (
          o(t, e),
          a(t, [
            {
              key: "stage_bounds",
              get: function() {
                return this._stage_bounds;
              },
              set: function(e) {
                if (
                  (this._stage_bounds && this.clearRenderPrimitives(),
                  (this._stage_bounds = e),
                  e && 0 !== e.length)
                ) {
                  for (
                    var t = [], r = [], n = e.geometry.length, i = 0;
                    i < n;
                    i++
                  ) {
                    var o = e.geometry[i];
                    t.push(o.x, 0, o.z), r.push(i, 0 === i ? n - 1 : i - 1, n);
                  }
                  t.push(0, 0, 0);
                  var a = this._renderer.createRenderBuffer(
                      l.ARRAY_BUFFER,
                      new Float32Array(t)
                    ),
                    s = this._renderer.createRenderBuffer(
                      l.ELEMENT_ARRAY_BUFFER,
                      new Uint16Array(r)
                    ),
                    _ = [
                      new u.PrimitiveAttribute(
                        "POSITION",
                        a,
                        3,
                        gl.FLOAT,
                        12,
                        0
                      )
                    ],
                    c = new u.Primitive(_, r.length);
                  c.setIndexBuffer(s);
                  var h = this._renderer.createRenderPrimitive(c, new f());
                  this.addRenderPrimitive(h);
                }
              }
            }
          ]),
          t
        );
      })(_.Node);
    },
    function(e, t, r) {
      "use strict";
      function n(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function i(e, t) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
      }
      function o(e, t) {
        if ("function" != typeof t && null !== t)
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof t
          );
        (e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          t &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, t)
              : (e.__proto__ = t));
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.InputRenderer = void 0);
      var a = (function() {
          function e(e, t) {
            for (var r = 0; r < t.length; r++) {
              var n = t[r];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n);
            }
          }
          return function(t, r, n) {
            return r && e(t.prototype, r), n && e(t, n), t;
          };
        })(),
        s = r(3),
        _ = r(4),
        u = r(8),
        l = r(6),
        f = new Uint8Array([
          255,
          255,
          255,
          1,
          255,
          255,
          255,
          2,
          191,
          191,
          191,
          4,
          204,
          204,
          204,
          5,
          219,
          219,
          219,
          7,
          204,
          204,
          204,
          10,
          216,
          216,
          216,
          13,
          210,
          210,
          210,
          17,
          206,
          206,
          206,
          21,
          206,
          206,
          206,
          26,
          206,
          206,
          206,
          31,
          205,
          205,
          205,
          36,
          200,
          200,
          200,
          42,
          201,
          201,
          201,
          47,
          201,
          201,
          201,
          52,
          201,
          201,
          201,
          57,
          201,
          201,
          201,
          61,
          200,
          200,
          200,
          65,
          203,
          203,
          203,
          68,
          238,
          238,
          238,
          135,
          250,
          250,
          250,
          200,
          249,
          249,
          249,
          201,
          249,
          249,
          249,
          201,
          250,
          250,
          250,
          201,
          250,
          250,
          250,
          201,
          249,
          249,
          249,
          201,
          249,
          249,
          249,
          201,
          250,
          250,
          250,
          200,
          238,
          238,
          238,
          135,
          203,
          203,
          203,
          68,
          200,
          200,
          200,
          65,
          201,
          201,
          201,
          61,
          201,
          201,
          201,
          57,
          201,
          201,
          201,
          52,
          201,
          201,
          201,
          47,
          200,
          200,
          200,
          42,
          205,
          205,
          205,
          36,
          206,
          206,
          206,
          31,
          206,
          206,
          206,
          26,
          206,
          206,
          206,
          21,
          210,
          210,
          210,
          17,
          216,
          216,
          216,
          13,
          204,
          204,
          204,
          10,
          219,
          219,
          219,
          7,
          204,
          204,
          204,
          5,
          191,
          191,
          191,
          4,
          255,
          255,
          255,
          2,
          255,
          255,
          255,
          1
        ]),
        c = 1,
        h = 0.01,
        d = 0.535,
        v = 0.5335,
        m = [1, 1, 1, 0.25],
        p = 0.005,
        y = 0.008,
        b = 0.5,
        g = 0,
        x = 0.75,
        w = 0,
        T = 0.9,
        E = 16,
        R = [1, 1, 1, 1],
        O = { controllers: !0, lasers: !0, cursors: !0 },
        S = (function(e) {
          function t() {
            n(this, t);
            var e = i(
              this,
              (t.__proto__ || Object.getPrototypeOf(t)).call(this)
            );
            return (
              (e.render_order = s.RENDER_ORDER.ADDITIVE),
              (e.state.cull_face = !1),
              (e.state.blend = !0),
              (e.state.blend_func_src = WebGLRenderingContext.ONE),
              (e.state.blend_func_dst = WebGLRenderingContext.ONE),
              (e.state.depth_mask = !1),
              (e.laser = e.defineSampler("diffuse")),
              (e.laser.texture = new l.DataTexture(f, 48, 1)),
              (e.laser_color = e.defineUniform("laserColor", m)),
              e
            );
          }
          return (
            o(t, e),
            a(t, [
              {
                key: "material_name",
                get: function() {
                  return "INPUT_LASER";
                }
              },
              {
                key: "vertex_source",
                get: function() {
                  return "\n    attribute vec3 POSITION;\n    attribute vec2 TEXCOORD_0;\n\n    varying vec2 vTexCoord;\n\n    vec4 vertex_main(mat4 proj, mat4 view, mat4 model) {\n      vTexCoord = TEXCOORD_0;\n      return proj * view * model * vec4(POSITION, 1.0);\n    }";
                }
              },
              {
                key: "fragment_source",
                get: function() {
                  return (
                    "\n    precision mediump float;\n\n    uniform vec4 laserColor;\n    uniform sampler2D diffuse;\n    varying vec2 vTexCoord;\n\n    const float fade_point = " +
                    v +
                    ";\n    const float fade_end = " +
                    d +
                    ";\n\n    vec4 fragment_main() {\n      vec2 uv = vTexCoord;\n      float front_fade_factor = 1.0 - clamp(1.0 - (uv.y - fade_point) / (1.0 - fade_point), 0.0, 1.0);\n      float back_fade_factor = clamp((uv.y - fade_point) / (fade_end - fade_point), 0.0, 1.0);\n      vec4 color = laserColor * texture2D(diffuse, vTexCoord);\n      float opacity = color.a * front_fade_factor * back_fade_factor;\n      return vec4(color.rgb * opacity, opacity);\n    }"
                  );
                }
              }
            ]),
            t
          );
        })(s.Material),
        A = (function(e) {
          function t() {
            n(this, t);
            var e = i(
              this,
              (t.__proto__ || Object.getPrototypeOf(t)).call(this)
            );
            return (
              (e.state.cull_face = !1),
              (e.state.blend = !0),
              (e.state.blend_func_src = WebGLRenderingContext.ONE),
              (e.state.depth_test = !1),
              (e.state.depth_mask = !1),
              (e.cursor_color = e.defineUniform("cursorColor", R)),
              e
            );
          }
          return (
            o(t, e),
            a(t, [
              {
                key: "material_name",
                get: function() {
                  return "INPUT_CURSOR";
                }
              },
              {
                key: "vertex_source",
                get: function() {
                  return "\n    attribute vec4 POSITION;\n\n    varying float vLuminance;\n    varying float vOpacity;\n\n    vec4 vertex_main(mat4 proj, mat4 view, mat4 model) {\n      vLuminance = POSITION.z;\n      vOpacity = POSITION.w;\n\n      // Billboarded, constant size vertex transform.\n      vec4 screenPos = proj * view * model * vec4(0.0, 0.0, 0.0, 1.0);\n      screenPos /= screenPos.w;\n      screenPos.xy += POSITION.xy;\n      return screenPos;\n    }";
                }
              },
              {
                key: "fragment_source",
                get: function() {
                  return "\n    precision mediump float;\n\n    uniform vec4 cursorColor;\n    varying float vLuminance;\n    varying float vOpacity;\n\n    vec4 fragment_main() {\n      vec3 color = cursorColor.rgb * vLuminance;\n      float opacity = cursorColor.a * vOpacity;\n      return vec4(color * opacity, opacity);\n    }";
                }
              }
            ]),
            t
          );
        })(s.Material);
      t.InputRenderer = (function(e) {
        function t(e) {
          n(this, t);
          var r = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
          return (
            (r._renderer = e),
            (r._max_input_elements = 32),
            (r._controllers = []),
            (r._controller_node = null),
            (r._controller_node_handedness = null),
            (r._lasers = null),
            (r._cursors = null),
            (r._active_controllers = 0),
            (r._active_lasers = 0),
            (r._active_cursors = 0),
            r
          );
        }
        return (
          o(t, e),
          a(t, [
            {
              key: "setControllerMesh",
              value: function(e) {
                var t =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : "right";
                (this._controller_node = e),
                  (this._controller_node_handedness = t);
              }
            },
            {
              key: "addController",
              value: function(e) {
                if (this._controller_node) {
                  var t = null;
                  this._active_controllers < this._controllers.length
                    ? (t = this._controllers[this._active_controllers])
                    : ((t = this._controller_node.clone()),
                      this.addNode(t),
                      this._controllers.push(t)),
                    (this._active_controllers =
                      (this._active_controllers + 1) %
                      this._max_input_elements),
                    (t.matrix = e),
                    (t.visible = !0);
                }
              }
            },
            {
              key: "addLaserPointer",
              value: function(e) {
                this._lasers ||
                  ((this._lasers = [this._createLaserMesh()]),
                  this.addNode(this._lasers[0]));
                var t = null;
                this._active_lasers < this._lasers.length
                  ? (t = this._lasers[this._active_lasers])
                  : ((t = this._lasers[0].clone()),
                    this.addNode(t),
                    this._lasers.push(t)),
                  (this._active_lasers =
                    (this._active_lasers + 1) % this._max_input_elements),
                  (t.matrix = e),
                  (t.visible = !0);
              }
            },
            {
              key: "addCursor",
              value: function(e) {
                this._cursors ||
                  ((this._cursors = [this._createCursorMesh()]),
                  this.addNode(this._cursors[0]));
                var t = null;
                this._active_cursors < this._cursors.length
                  ? (t = this._cursors[this._active_cursors])
                  : ((t = this._cursors[0].clone()),
                    this.addNode(t),
                    this._cursors.push(t)),
                  (this._active_cursors =
                    (this._active_cursors + 1) % this._max_input_elements),
                  (t.translation = e),
                  (t.visible = !0);
              }
            },
            {
              key: "addInputSources",
              value: function(e, t) {
                if (e.session.getInputSources) {
                  var r = e.session.getInputSources(),
                    n = !0,
                    i = !1,
                    o = void 0;
                  try {
                    for (
                      var a, s = r[Symbol.iterator]();
                      !(n = (a = s.next()).done);
                      n = !0
                    ) {
                      var _ = a.value,
                        u = e.getInputPose(_, t);
                      if (
                        u &&
                        (u.gripMatrix && this.addController(u.gripMatrix),
                        u.pointerMatrix)
                      ) {
                        "hand" == _.pointerOrigin &&
                          this.addLaserPointer(u.pointerMatrix);
                        var l = vec3.fromValues(0, 0, -2);
                        vec3.transformMat4(l, l, u.pointerMatrix),
                          this.addCursor(l);
                      }
                    }
                  } catch (e) {
                    (i = !0), (o = e);
                  } finally {
                    try {
                      !n && s.return && s.return();
                    } finally {
                      if (i) throw o;
                    }
                  }
                }
              }
            },
            {
              key: "reset",
              value: function(e) {
                if ((e || (e = O), this._controllers && e.controllers)) {
                  var t = !0,
                    r = !1,
                    n = void 0;
                  try {
                    for (
                      var i, o = this._controllers[Symbol.iterator]();
                      !(t = (i = o.next()).done);
                      t = !0
                    ) {
                      var a = i.value;
                      a.visible = !1;
                    }
                  } catch (e) {
                    (r = !0), (n = e);
                  } finally {
                    try {
                      !t && o.return && o.return();
                    } finally {
                      if (r) throw n;
                    }
                  }
                  this._active_controllers = 0;
                }
                if (this._lasers && e.lasers) {
                  var s = !0,
                    _ = !1,
                    u = void 0;
                  try {
                    for (
                      var l, f = this._lasers[Symbol.iterator]();
                      !(s = (l = f.next()).done);
                      s = !0
                    ) {
                      var c = l.value;
                      c.visible = !1;
                    }
                  } catch (e) {
                    (_ = !0), (u = e);
                  } finally {
                    try {
                      !s && f.return && f.return();
                    } finally {
                      if (_) throw u;
                    }
                  }
                  this._active_lasers = 0;
                }
                if (this._cursors && e.cursors) {
                  var h = !0,
                    d = !1,
                    v = void 0;
                  try {
                    for (
                      var m, p = this._cursors[Symbol.iterator]();
                      !(h = (m = p.next()).done);
                      h = !0
                    ) {
                      var y = m.value;
                      y.visible = !1;
                    }
                  } catch (e) {
                    (d = !0), (v = e);
                  } finally {
                    try {
                      !h && p.return && p.return();
                    } finally {
                      if (d) throw v;
                    }
                  }
                  this._active_cursors = 0;
                }
              }
            },
            {
              key: "_createLaserMesh",
              value: function() {
                var e = this._renderer._gl,
                  t = 0.5 * h,
                  r = c,
                  n = [
                    0,
                    t,
                    0,
                    0,
                    1,
                    0,
                    t,
                    -r,
                    0,
                    0,
                    0,
                    -t,
                    0,
                    1,
                    1,
                    0,
                    -t,
                    -r,
                    1,
                    0,
                    t,
                    0,
                    0,
                    0,
                    1,
                    t,
                    0,
                    -r,
                    0,
                    0,
                    -t,
                    0,
                    0,
                    1,
                    1,
                    -t,
                    0,
                    -r,
                    1,
                    0,
                    0,
                    -t,
                    0,
                    0,
                    1,
                    0,
                    -t,
                    -r,
                    0,
                    0,
                    0,
                    t,
                    0,
                    1,
                    1,
                    0,
                    t,
                    -r,
                    1,
                    0,
                    -t,
                    0,
                    0,
                    0,
                    1,
                    -t,
                    0,
                    -r,
                    0,
                    0,
                    t,
                    0,
                    0,
                    1,
                    1,
                    t,
                    0,
                    -r,
                    1,
                    0
                  ],
                  i = [
                    0,
                    1,
                    2,
                    1,
                    3,
                    2,
                    4,
                    5,
                    6,
                    5,
                    7,
                    6,
                    8,
                    9,
                    10,
                    9,
                    11,
                    10,
                    12,
                    13,
                    14,
                    13,
                    15,
                    14
                  ],
                  o = this._renderer.createRenderBuffer(
                    e.ARRAY_BUFFER,
                    new Float32Array(n)
                  ),
                  a = this._renderer.createRenderBuffer(
                    e.ELEMENT_ARRAY_BUFFER,
                    new Uint16Array(i)
                  ),
                  s = i.length,
                  l = [
                    new u.PrimitiveAttribute("POSITION", o, 3, e.FLOAT, 20, 0),
                    new u.PrimitiveAttribute(
                      "TEXCOORD_0",
                      o,
                      2,
                      e.FLOAT,
                      20,
                      12
                    )
                  ],
                  f = new u.Primitive(l, s);
                f.setIndexBuffer(a);
                var d = new S(),
                  v = this._renderer.createRenderPrimitive(f, d),
                  m = new _.Node();
                return m.addRenderPrimitive(v), m;
              }
            },
            {
              key: "_createCursorMesh",
              value: function() {
                for (
                  var e = this._renderer._gl,
                    t = [],
                    r = [],
                    n = (2 * Math.PI) / E,
                    i = 0;
                  i < E;
                  ++i
                ) {
                  var o = i * n,
                    a = Math.cos(o),
                    s = Math.sin(o);
                  t.push(a * p, s * p, 1, T), i > 1 && r.push(0, i - 1, i);
                }
                for (var l = E, f = 0; f < E; ++f) {
                  var c = f * n,
                    h = Math.cos(c),
                    d = Math.sin(c);
                  if (
                    (t.push(h * p, d * p, b, x),
                    t.push(h * y, d * y, g, w),
                    f > 0)
                  ) {
                    var v = l + 2 * f;
                    r.push(v - 2, v - 1, v), r.push(v - 1, v + 1, v);
                  }
                }
                var m = l + 2 * E;
                r.push(m - 2, m - 1, l), r.push(m - 1, l + 1, l);
                var R = this._renderer.createRenderBuffer(
                    e.ARRAY_BUFFER,
                    new Float32Array(t)
                  ),
                  O = this._renderer.createRenderBuffer(
                    e.ELEMENT_ARRAY_BUFFER,
                    new Uint16Array(r)
                  ),
                  S = r.length,
                  P = [
                    new u.PrimitiveAttribute("POSITION", R, 4, e.FLOAT, 16, 0)
                  ],
                  C = new u.Primitive(P, S);
                C.setIndexBuffer(O);
                var L = new A(),
                  k = this._renderer.createRenderPrimitive(C, L),
                  N = new _.Node();
                return N.addRenderPrimitive(k), N;
              }
            }
          ]),
          t
        );
      })(_.Node);
    },
    function(e, t, r) {
      "use strict";
      function n(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function i(e, t) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
      }
      function o(e, t) {
        if ("function" != typeof t && null !== t)
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof t
          );
        (e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          t &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, t)
              : (e.__proto__ = t));
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.Skybox = void 0);
      var a = (function() {
          function e(e, t) {
            for (var r = 0; r < t.length; r++) {
              var n = t[r];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n);
            }
          }
          return function(t, r, n) {
            return r && e(t.prototype, r), n && e(t, n), t;
          };
        })(),
        s = r(3),
        _ = r(8),
        u = r(4),
        l = r(6),
        f = WebGLRenderingContext,
        c = (function(e) {
          function t() {
            n(this, t);
            var e = i(
              this,
              (t.__proto__ || Object.getPrototypeOf(t)).call(this)
            );
            return (
              (e.render_order = s.RENDER_ORDER.SKY),
              (e.state.depth_func = f.LEQUAL),
              (e.state.depth_mask = !1),
              (e.image = e.defineSampler("diffuse")),
              (e.tex_coord_scale_offset = e.defineUniform(
                "texCoordScaleOffset",
                [1, 1, 0, 0, 1, 1, 0, 0],
                4
              )),
              e
            );
          }
          return (
            o(t, e),
            a(t, [
              {
                key: "material_name",
                get: function() {
                  return "SKYBOX";
                }
              },
              {
                key: "vertex_source",
                get: function() {
                  return "\n    uniform int EYE_INDEX;\n    uniform vec4 texCoordScaleOffset[2];\n    attribute vec3 POSITION;\n    attribute vec2 TEXCOORD_0;\n    varying vec2 vTexCoord;\n\n    vec4 vertex_main(mat4 proj, mat4 view, mat4 model) {\n      vec4 scaleOffset = texCoordScaleOffset[EYE_INDEX];\n      vTexCoord = (TEXCOORD_0 * scaleOffset.xy) + scaleOffset.zw;\n      // Drop the translation portion of the view matrix\n      view[3].xyz = vec3(0.0, 0.0, 0.0);\n      vec4 out_vec = proj * view * model * vec4(POSITION, 1.0);\n\n      // Returning the W component for both Z and W forces the geometry depth to\n      // the far plane. When combined with a depth func of LEQUAL this makes the\n      // sky write to any depth fragment that has not been written to yet.\n      return out_vec.xyww;\n    }";
                }
              },
              {
                key: "fragment_source",
                get: function() {
                  return "\n    uniform sampler2D diffuse;\n    varying vec2 vTexCoord;\n\n    vec4 fragment_main() {\n      return texture2D(diffuse, vTexCoord);\n    }";
                }
              }
            ]),
            t
          );
        })(s.Material);
      t.Skybox = (function(e) {
        function t(e) {
          n(this, t);
          var r = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
          return (
            (r._image_url = e.image_url),
            (r._display_mode = e.display_mode || "mono"),
            r
          );
        }
        return (
          o(t, e),
          a(t, [
            {
              key: "setRenderer",
              value: function(e) {
                this.clearRenderPrimitives();
                for (var t = [], r = [], n = 40, i = 40, o = 0; o <= n; ++o)
                  for (
                    var a = (o * Math.PI) / n,
                      s = Math.sin(a),
                      u = Math.cos(a),
                      h = o * (i + 1),
                      d = (o + 1) * (i + 1),
                      v = 0;
                    v <= i;
                    ++v
                  ) {
                    var m = (2 * v * Math.PI) / i,
                      p = Math.sin(m) * s,
                      y = u,
                      b = -Math.cos(m) * s,
                      g = v / i,
                      x = o / n;
                    if ((t.push(p, y, b, g, x), o < n && v < i)) {
                      var w = h + v,
                        T = d + v;
                      r.push(w, T, w + 1, T, T + 1, w + 1);
                    }
                  }
                var E = e.createRenderBuffer(
                    f.ARRAY_BUFFER,
                    new Float32Array(t)
                  ),
                  R = e.createRenderBuffer(
                    f.ELEMENT_ARRAY_BUFFER,
                    new Uint16Array(r)
                  ),
                  O = [
                    new _.PrimitiveAttribute("POSITION", E, 3, f.FLOAT, 20, 0),
                    new _.PrimitiveAttribute(
                      "TEXCOORD_0",
                      E,
                      2,
                      f.FLOAT,
                      20,
                      12
                    )
                  ],
                  S = new _.Primitive(O, r.length);
                S.setIndexBuffer(R);
                var A = new c();
                switch (
                  ((A.image.texture = new l.UrlTexture(this._image_url)),
                  this._display_mode)
                ) {
                  case "mono":
                    A.tex_coord_scale_offset.value = [1, 1, 0, 0, 1, 1, 0, 0];
                    break;
                  case "stereoTopBottom":
                    A.tex_coord_scale_offset.value = [
                      1,
                      0.5,
                      0,
                      0,
                      1,
                      0.5,
                      0,
                      0.5
                    ];
                    break;
                  case "stereoLeftRight":
                    A.tex_coord_scale_offset.value = [
                      0.5,
                      1,
                      0,
                      0,
                      0.5,
                      1,
                      0.5,
                      0
                    ];
                }
                var P = e.createRenderPrimitive(S, A);
                this.addRenderPrimitive(P);
              }
            }
          ]),
          t
        );
      })(u.Node);
    },
    function(e, t, r) {
      "use strict";
      function n(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function i(e, t) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
      }
      function o(e, t) {
        if ("function" != typeof t && null !== t)
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof t
          );
        (e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          t &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, t)
              : (e.__proto__ = t));
      }
      function a(e) {
        return (0.9 / d) * e - 0.45;
      }
      function s(e) {
        return Math.min(e, v) * (0.7 / v) - 0.45;
      }
      function _(e) {
        return {
          r: Math.max(0, Math.min(1, 1 - e / 60)),
          g: Math.max(0, Math.min(1, (e - 15) / (v - 15))),
          b: Math.max(0, Math.min(1, (e - 15) / (v - 15)))
        };
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.StatsViewer = void 0);
      var u = (function() {
          function e(e, t) {
            for (var r = 0; r < t.length; r++) {
              var n = t[r];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n);
            }
          }
          return function(t, r, n) {
            return r && e(t.prototype, r), n && e(t, n), t;
          };
        })(),
        l = r(3),
        f = r(4),
        c = r(8),
        h = r(16),
        d = 30,
        v = 90,
        m = (function(e) {
          function t() {
            return (
              n(this, t),
              i(
                this,
                (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)
              )
            );
          }
          return (
            o(t, e),
            u(t, [
              {
                key: "material_name",
                get: function() {
                  return "STATS_VIEWER";
                }
              },
              {
                key: "vertex_source",
                get: function() {
                  return "\n    attribute vec3 POSITION;\n    attribute vec3 COLOR_0;\n    varying vec4 vColor;\n\n    vec4 vertex_main(mat4 proj, mat4 view, mat4 model) {\n      vColor = vec4(COLOR_0, 1.0);\n      return proj * view * model * vec4(POSITION, 1.0);\n    }";
                }
              },
              {
                key: "fragment_source",
                get: function() {
                  return "\n    precision mediump float;\n    varying vec4 vColor;\n\n    vec4 fragment_main() {\n      return vColor;\n    }";
                }
              }
            ]),
            t
          );
        })(l.Material),
        p =
          window.performance && performance.now
            ? performance.now.bind(performance)
            : Date.now;
      t.StatsViewer = (function(e) {
        function t(e) {
          function r(e, t, r, n, i, o, a, s) {
            var _ = u.length / 6;
            u.push(e, t, i, o, a, s),
              u.push(r, n, i, o, a, s),
              u.push(e, n, i, o, a, s),
              u.push(r, t, i, o, a, s),
              l.push(_, _ + 1, _ + 2, _, _ + 3, _ + 1);
          }
          n(this, t);
          var o = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
          (o._performance_monitoring = !1),
            (o._renderer = e),
            (o._start_time = p()),
            (o._prev_frame_time = o._start_time),
            (o._prev_graph_update_time = o._start_time),
            (o._frames = 0),
            (o._fps_average = 0),
            (o._fps_min = 0),
            (o._fps_step = o._performance_monitoring ? 1e3 : 250),
            (o._last_segment = 0),
            (o._fps_vertex_buffer = null),
            (o._fps_render_primitive = null),
            (o._fps_node = null),
            (o._seven_segment_node = null);
          for (var _ = o._renderer.gl, u = [], l = [], v = 0; v < d; ++v) {
            u.push(a(v), s(0), 0.02, 0, 1, 1),
              u.push(a(v + 1), s(0), 0.02, 0, 1, 1),
              u.push(a(v), s(0), 0.02, 0, 1, 1),
              u.push(a(v + 1), s(0), 0.02, 0, 1, 1);
            var y = 4 * v;
            l.push(y, y + 3, y + 1, y + 3, y, y + 2);
          }
          r(-0.5, -0.5, 0.5, 0.5, 0, 0, 0, 0.125),
            r(-0.45, -0.45, 0.45, 0.25, 0.01, 0, 0, 0.4),
            r(-0.45, s(30), 0.45, s(32), 0.015, 0.5, 0, 0.5),
            r(-0.45, s(60), 0.45, s(62), 0.015, 0.2, 0, 0.75),
            (o._fps_vertex_buffer = o._renderer.createRenderBuffer(
              _.ARRAY_BUFFER,
              new Float32Array(u),
              _.DYNAMIC_DRAW
            ));
          var b = o._renderer.createRenderBuffer(
              _.ELEMENT_ARRAY_BUFFER,
              new Uint16Array(l)
            ),
            g = [
              new c.PrimitiveAttribute(
                "POSITION",
                o._fps_vertex_buffer,
                3,
                _.FLOAT,
                24,
                0
              ),
              new c.PrimitiveAttribute(
                "COLOR_0",
                o._fps_vertex_buffer,
                3,
                _.FLOAT,
                24,
                12
              )
            ],
            x = new c.Primitive(g, l.length);
          return (
            x.setIndexBuffer(b),
            (o._fps_render_primitive = o._renderer.createRenderPrimitive(
              x,
              new m()
            )),
            (o._fps_node = new f.Node()),
            o._fps_node.addRenderPrimitive(o._fps_render_primitive),
            o.addNode(o._fps_node),
            (o._seven_segment_node = new h.SevenSegmentText(o._renderer)),
            (o._seven_segment_node.matrix = new Float32Array([
              0.075,
              0,
              0,
              0,
              0,
              0.075,
              0,
              0,
              0,
              0,
              1,
              0,
              -0.3625,
              0.3625,
              0.02,
              1
            ])),
            o.addNode(o._seven_segment_node),
            o
          );
        }
        return (
          o(t, e),
          u(t, [
            {
              key: "begin",
              value: function() {
                this._start_time = p();
              }
            },
            {
              key: "end",
              value: function() {
                var e = p(),
                  t = 1e3 / (e - this._prev_frame_time);
                if (
                  ((this._prev_frame_time = e),
                  (this._fps_min = this._frames
                    ? Math.min(this._fps_min, t)
                    : t),
                  this._frames++,
                  e > this._prev_graph_update_time + this._fps_step)
                ) {
                  var r = e - this._prev_graph_update_time;
                  (this._fps_average = Math.round(1e3 / (r / this._frames))),
                    this._updateGraph(this._fps_min, this._fps_average),
                    this.enable_performance_monitoring &&
                      console.log(
                        "Average FPS: " +
                          this._fps_average +
                          " Min FPS: " +
                          this._fps_min
                      ),
                    (this._prev_graph_update_time = e),
                    (this._frames = 0),
                    (this._fps_min = 0);
                }
              }
            },
            {
              key: "_updateGraph",
              value: function(e, t) {
                var r = _(e),
                  n = s(e - 1),
                  i = s(t + 1),
                  o = [
                    a(this._last_segment),
                    i,
                    0.02,
                    r.r,
                    r.g,
                    r.b,
                    a(this._last_segment + 1),
                    i,
                    0.02,
                    r.r,
                    r.g,
                    r.b,
                    a(this._last_segment),
                    n,
                    0.02,
                    r.r,
                    r.g,
                    r.b,
                    a(this._last_segment + 1),
                    n,
                    0.02,
                    r.r,
                    r.g,
                    r.b
                  ];
                (r.r = 0.2),
                  (r.g = 1),
                  (r.b = 0.2),
                  this._last_segment == d - 1
                    ? (this._renderer.updateRenderBuffer(
                        this._fps_vertex_buffer,
                        new Float32Array(o),
                        24 * this._last_segment * 4
                      ),
                      (o = [
                        a(0),
                        s(v),
                        0.02,
                        r.r,
                        r.g,
                        r.b,
                        a(0.25),
                        s(v),
                        0.02,
                        r.r,
                        r.g,
                        r.b,
                        a(0),
                        s(0),
                        0.02,
                        r.r,
                        r.g,
                        r.b,
                        a(0.25),
                        s(0),
                        0.02,
                        r.r,
                        r.g,
                        r.b
                      ]),
                      this._renderer.updateRenderBuffer(
                        this._fps_vertex_buffer,
                        new Float32Array(o),
                        0
                      ))
                    : (o.push(
                        a(this._last_segment + 1),
                        s(v),
                        0.02,
                        r.r,
                        r.g,
                        r.b,
                        a(this._last_segment + 1.25),
                        s(v),
                        0.02,
                        r.r,
                        r.g,
                        r.b,
                        a(this._last_segment + 1),
                        s(0),
                        0.02,
                        r.r,
                        r.g,
                        r.b,
                        a(this._last_segment + 1.25),
                        s(0),
                        0.02,
                        r.r,
                        r.g,
                        r.b
                      ),
                      this._renderer.updateRenderBuffer(
                        this._fps_vertex_buffer,
                        new Float32Array(o),
                        24 * this._last_segment * 4
                      )),
                  (this._last_segment = (this._last_segment + 1) % d),
                  (this._seven_segment_node.text = this._fps_average + " FP5");
              }
            },
            {
              key: "performance_monitoring",
              get: function() {
                return this._performance_monitoring;
              },
              set: function(e) {
                (this._performance_monitoring = e),
                  (this._fps_step = e ? 1e3 : 250);
              }
            }
          ]),
          t
        );
      })(f.Node);
    },
    function(e, t, r) {
      "use strict";
      function n(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function i(e, t) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
      }
      function o(e, t) {
        if ("function" != typeof t && null !== t)
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof t
          );
        (e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          t &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, t)
              : (e.__proto__ = t));
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.SevenSegmentText = void 0);
      var a = (function() {
          function e(e, t) {
            for (var r = 0; r < t.length; r++) {
              var n = t[r];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n);
            }
          }
          return function(t, r, n) {
            return r && e(t.prototype, r), n && e(t, n), t;
          };
        })(),
        s = r(3),
        _ = r(4),
        u = r(8),
        l = 2,
        f = (function(e) {
          function t() {
            return (
              n(this, t),
              i(
                this,
                (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)
              )
            );
          }
          return (
            o(t, e),
            a(t, [
              {
                key: "material_name",
                get: function() {
                  return "SEVEN_SEGMENT_TEXT";
                }
              },
              {
                key: "vertex_source",
                get: function() {
                  return "\n    attribute vec2 POSITION;\n\n    vec4 vertex_main(mat4 proj, mat4 view, mat4 model) {\n      return proj * view * model * vec4(POSITION, 0.0, 1.0);\n    }";
                }
              },
              {
                key: "fragment_source",
                get: function() {
                  return "\n    precision mediump float;\n    const vec4 color = vec4(0.0, 1.0, 0.0, 1.0);\n\n    vec4 fragment_main() {\n      return color;\n    }";
                }
              }
            ]),
            t
          );
        })(s.Material);
      t.SevenSegmentText = (function(e) {
        function t(e) {
          function r(e, t, r, n, i) {
            var o = s.length / 2;
            s.push(t, r, n, r, n, i, t, i),
              (_[e] = [o, o + 2, o + 1, o, o + 3, o + 2]);
          }
          function o(e, t) {
            for (
              var r = { character: e, offset: 2 * l.length, count: 0 }, n = 0;
              n < t.length;
              ++n
            ) {
              var i = t[n],
                o = _[i];
              (r.count += o.length), l.push.apply(l, o);
            }
            d[e] = r;
          }
          n(this, t);
          var a = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
          (a._renderer = e), (a._text = ""), (a._char_nodes = []);
          var s = [],
            _ = {},
            l = [],
            c = 0.5,
            h = 0.25,
            d = {};
          r(0, -1, 1, c, 1 - h),
            r(1, -1, 0.5 * h, c, 0.5 * -h),
            r(2, -1, -1 + h, c, -1),
            r(3, -1, 1, -1 + h, 0.5 * -h),
            r(4, c - h, 1, c, 0.5 * -h),
            r(5, -1, 0.5 * h, -1 + h, -1),
            r(6, c - h, 0.5 * h, c, -1),
            o("0", [0, 2, 3, 4, 5, 6]),
            o("1", [4, 6]),
            o("2", [0, 1, 2, 4, 5]),
            o("3", [0, 1, 2, 4, 6]),
            o("4", [1, 3, 4, 6]),
            o("5", [0, 1, 2, 3, 6]),
            o("6", [0, 1, 2, 3, 5, 6]),
            o("7", [0, 4, 6]),
            o("8", [0, 1, 2, 3, 4, 5, 6]),
            o("9", [0, 1, 2, 3, 4, 6]),
            o("A", [0, 1, 3, 4, 5, 6]),
            o("B", [1, 2, 3, 5, 6]),
            o("C", [0, 2, 3, 5]),
            o("D", [1, 2, 4, 5, 6]),
            o("E", [0, 1, 2, 4, 6]),
            o("F", [0, 1, 3, 5]),
            o("P", [0, 1, 3, 4, 5]),
            o("-", [1]),
            o(" ", []),
            o("_", [2]);
          var v = a._renderer.gl,
            m = a._renderer.createRenderBuffer(
              v.ARRAY_BUFFER,
              new Float32Array(s)
            ),
            p = a._renderer.createRenderBuffer(
              v.ELEMENT_ARRAY_BUFFER,
              new Uint16Array(l)
            ),
            y = [new u.PrimitiveAttribute("POSITION", m, 2, v.FLOAT, 8, 0)],
            b = new u.Primitive(y, l.length);
          b.setIndexBuffer(p);
          var g = new f();
          a._char_primitives = {};
          for (var x in d) {
            var w = d[x];
            (b.element_count = w.count),
              (b.index_byte_offset = w.offset),
              (a._char_primitives[x] = a._renderer.createRenderPrimitive(b, g));
          }
          return a;
        }
        return (
          o(t, e),
          a(t, [
            {
              key: "text",
              get: function() {
                return this._text;
              },
              set: function(e) {
                this._text = e;
                for (var t = 0, r = null; t < e.length; ++t)
                  if (
                    ((r =
                      e[t] in this._char_primitives
                        ? this._char_primitives[e[t]]
                        : this._char_primitives._),
                    this._char_nodes.length <= t)
                  ) {
                    var n = new _.Node();
                    n.addRenderPrimitive(r);
                    var i = t * l;
                    (n.translation = [i, 0, 0]),
                      this._char_nodes.push(n),
                      this.addNode(n);
                  } else
                    this._char_nodes[t].clearRenderPrimitives(),
                      this._char_nodes[t].addRenderPrimitive(r),
                      (this._char_nodes[t].visible = !0);
                for (; t < this._char_nodes.length; ++t)
                  this._char_nodes[t].visible = !1;
              }
            }
          ]),
          t
        );
      })(_.Node);
    },
    function(e, t, r) {
      "use strict";
      function n(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function i(e) {
        var t = new RegExp("^" + window.location.protocol, "i");
        return !!e.match(t);
      }
      function o(e) {
        var t = /^data:/;
        return !!e.match(t);
      }
      function a(e, t) {
        return i(e) || o(e) ? e : t + e;
      }
      function s(e) {
        switch (e) {
          case "SCALAR":
            return 1;
          case "VEC2":
            return 2;
          case "VEC3":
            return 3;
          case "VEC4":
            return 4;
          default:
            return 0;
        }
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.GLTF2Loader = void 0);
      var _ = (function() {
          function e(e, t) {
            for (var r = 0; r < t.length; r++) {
              var n = t[r];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n);
            }
          }
          return function(t, r, n) {
            return r && e(t.prototype, r), n && e(t, n), t;
          };
        })(),
        u = r(10),
        l = r(4),
        f = r(8),
        c = r(6),
        h = WebGLRenderingContext,
        d = 1179937895,
        v = { JSON: 1313821514, BIN: 5130562 },
        m = ((t.GLTF2Loader = (function() {
          function e(t) {
            n(this, e), (this.renderer = t), (this._gl = t._gl);
          }
          return (
            _(e, [
              {
                key: "loadFromUrl",
                value: function(e) {
                  var t = this;
                  return fetch(e).then(function(r) {
                    var n = e.lastIndexOf("/"),
                      i = 0 !== n ? e.substring(0, n + 1) : "";
                    if (e.endsWith(".gltf"))
                      return r.json().then(function(e) {
                        return t.loadFromJson(e, i);
                      });
                    if (e.endsWith(".glb"))
                      return r.arrayBuffer().then(function(e) {
                        return t.loadFromBinary(e, i);
                      });
                    throw new Error("Unrecognized file extension");
                  });
                }
              },
              {
                key: "loadFromBinary",
                value: function(e, t) {
                  var r = new DataView(e, 0, 12),
                    n = r.getUint32(0, !0),
                    i = r.getUint32(4, !0),
                    o = r.getUint32(8, !0);
                  if (n != d)
                    throw new Error("Invalid magic string in binary header.");
                  if (2 != i)
                    throw new Error("Incompatible version in binary header.");
                  for (var a = {}, s = 12; s < o; ) {
                    var _ = new DataView(e, s, 8),
                      u = _.getUint32(0, !0),
                      l = _.getUint32(4, !0);
                    (a[l] = e.slice(s + 8, s + 8 + u)), (s += u + 8);
                  }
                  if (!a[v.JSON])
                    throw new Error("File contained no json chunk.");
                  var f = new TextDecoder("utf-8"),
                    c = f.decode(a[v.JSON]),
                    h = JSON.parse(c);
                  return this.loadFromJson(h, t, a[v.BIN]);
                }
              },
              {
                key: "loadFromJson",
                value: function(e, t, r) {
                  function n(e) {
                    return e ? M[e.index] : null;
                  }
                  if (!e.asset) throw new Error("Missing asset description.");
                  if ("2.0" != e.asset.minVersion && "2.0" != e.asset.version)
                    throw new Error("Incompatible asset version.");
                  var i = [];
                  if (r) i[0] = new y({}, t, r);
                  else {
                    var o = !0,
                      a = !1,
                      _ = void 0;
                    try {
                      for (
                        var d, v = e.buffers[Symbol.iterator]();
                        !(o = (d = v.next()).done);
                        o = !0
                      ) {
                        var b = d.value;
                        i.push(new y(b, t));
                      }
                    } catch (e) {
                      (a = !0), (_ = e);
                    } finally {
                      try {
                        !o && v.return && v.return();
                      } finally {
                        if (a) throw _;
                      }
                    }
                  }
                  var g = [],
                    x = !0,
                    w = !1,
                    T = void 0;
                  try {
                    for (
                      var E, R = e.bufferViews[Symbol.iterator]();
                      !(x = (E = R.next()).done);
                      x = !0
                    ) {
                      var O = E.value;
                      g.push(new p(O, i));
                    }
                  } catch (e) {
                    (w = !0), (T = e);
                  } finally {
                    try {
                      !x && R.return && R.return();
                    } finally {
                      if (w) throw T;
                    }
                  }
                  var S = [];
                  if (e.images) {
                    var A = !0,
                      P = !1,
                      C = void 0;
                    try {
                      for (
                        var L, k = e.images[Symbol.iterator]();
                        !(A = (L = k.next()).done);
                        A = !0
                      ) {
                        var N = L.value;
                        S.push(new y(N, t));
                      }
                    } catch (e) {
                      (P = !0), (C = e);
                    } finally {
                      try {
                        !A && k.return && k.return();
                      } finally {
                        if (P) throw C;
                      }
                    }
                  }
                  var M = [];
                  if (e.textures) {
                    var D = !0,
                      I = !1,
                      F = void 0;
                    try {
                      for (
                        var B, U = e.textures[Symbol.iterator]();
                        !(D = (B = U.next()).done);
                        D = !0
                      ) {
                        var j = B.value,
                          V = S[j.source],
                          G = V.texture(g);
                        if (j.sampler) {
                          var H = H[j.sampler];
                          (G.sampler.min_filter = H.minFilter),
                            (G.sampler.mag_filter = H.magFilter),
                            (G.sampler.wrap_s = H.wrapS),
                            (G.sampler.wrap_t = H.wrapT);
                        }
                        M.push(G);
                      }
                    } catch (e) {
                      (I = !0), (F = e);
                    } finally {
                      try {
                        !D && U.return && U.return();
                      } finally {
                        if (I) throw F;
                      }
                    }
                  }
                  var X = [];
                  if (e.materials) {
                    var W = !0,
                      K = !1,
                      Y = void 0;
                    try {
                      for (
                        var z, J = e.materials[Symbol.iterator]();
                        !(W = (z = J.next()).done);
                        W = !0
                      ) {
                        var q = z.value,
                          Q = new u.PbrMaterial(),
                          Z = q.pbrMetallicRoughness || {};
                        switch (
                          ((Q.base_color_factor.value = Z.baseColorFactor || [
                            1,
                            1,
                            1,
                            1
                          ]),
                          (Q.base_color.texture = n(Z.baseColorTexture)),
                          (Q.metallic_roughness_factor.value = [
                            Z.metallicFactor || 1,
                            Z.roughnessFactor || 1
                          ]),
                          (Q.metallic_roughness.texture = n(
                            Z.metallicRoughnessTexture
                          )),
                          (Q.normal.texture = n(e.normalTexture)),
                          (Q.occlusion.texture = n(e.occlusionTexture)),
                          (Q.occlusion_strength.value =
                            e.occlusionTexture && e.occlusionTexture.strength
                              ? e.occlusionTexture.strength
                              : 1),
                          (Q.emissive_factor.value = q.emissiveFactor || [
                            0,
                            0,
                            0
                          ]),
                          (Q.emissive.texture = n(e.emissiveTexture)),
                          !Q.emissive.texture &&
                            e.emissiveFactor &&
                            (Q.emissive.texture = new c.ColorTexture(
                              1,
                              1,
                              1,
                              1
                            )),
                          q.alphaMode)
                        ) {
                          case "BLEND":
                            Q.state.blend = !0;
                            break;
                          case "MASK":
                            Q.state.blend = !0;
                            break;
                          default:
                            Q.state.blend = !1;
                        }
                        (Q.state.cull_face = !q.doubleSided), X.push(Q);
                      }
                    } catch (e) {
                      (K = !0), (Y = e);
                    } finally {
                      try {
                        !W && J.return && J.return();
                      } finally {
                        if (K) throw Y;
                      }
                    }
                  }
                  var $ = e.accessors,
                    ee = [],
                    te = !0,
                    re = !1,
                    ne = void 0;
                  try {
                    for (
                      var ie, oe = e.meshes[Symbol.iterator]();
                      !(te = (ie = oe.next()).done);
                      te = !0
                    ) {
                      var ae = ie.value,
                        se = new m();
                      ee.push(se);
                      var _e = !0,
                        ue = !1,
                        le = void 0;
                      try {
                        for (
                          var fe, ce = ae.primitives[Symbol.iterator]();
                          !(_e = (fe = ce.next()).done);
                          _e = !0
                        ) {
                          var he = fe.value,
                            de = null;
                          de =
                            "material" in he ? X[he.material] : new Material();
                          var ve = [],
                            me = 0;
                          for (var pe in he.attributes) {
                            var ye = $[he.attributes[pe]],
                              be = g[ye.bufferView];
                            me = ye.count;
                            var ge = new f.PrimitiveAttribute(
                              pe,
                              be.renderBuffer(this.renderer, h.ARRAY_BUFFER),
                              s(ye.type),
                              ye.componentType,
                              be.byteStride || 0,
                              ye.byteOffset || 0
                            );
                            (ge.normalized = ye.normalized || !1), ve.push(ge);
                          }
                          var xe = new f.Primitive(ve, me, he.mode);
                          if ("indices" in he) {
                            var we = $[he.indices],
                              Te = g[we.bufferView];
                            xe.setIndexBuffer(
                              Te.renderBuffer(
                                this.renderer,
                                h.ELEMENT_ARRAY_BUFFER
                              ),
                              we.byteOffset || 0,
                              we.componentType
                            ),
                              (xe.indexType = we.componentType),
                              (xe.indexByteOffset = we.byteOffset || 0),
                              (xe.element_count = we.count);
                          }
                          se.primitives.push(
                            this.renderer.createRenderPrimitive(xe, de)
                          );
                        }
                      } catch (e) {
                        (ue = !0), (le = e);
                      } finally {
                        try {
                          !_e && ce.return && ce.return();
                        } finally {
                          if (ue) throw le;
                        }
                      }
                    }
                  } catch (e) {
                    (re = !0), (ne = e);
                  } finally {
                    try {
                      !te && oe.return && oe.return();
                    } finally {
                      if (re) throw ne;
                    }
                  }
                  var Ee = new l.Node(),
                    Re = e.scenes[e.scene],
                    Oe = !0,
                    Se = !1,
                    Ae = void 0;
                  try {
                    for (
                      var Pe, Ce = Re.nodes[Symbol.iterator]();
                      !(Oe = (Pe = Ce.next()).done);
                      Oe = !0
                    ) {
                      var Le = Pe.value,
                        ke = e.nodes[Le];
                      Ee.addNode(this.processNodes(ke, e.nodes, ee));
                    }
                  } catch (e) {
                    (Se = !0), (Ae = e);
                  } finally {
                    try {
                      !Oe && Ce.return && Ce.return();
                    } finally {
                      if (Se) throw Ae;
                    }
                  }
                  return Ee;
                }
              },
              {
                key: "processNodes",
                value: function(e, t, r) {
                  var n = new l.Node();
                  if (((n.name = e.name), "mesh" in e)) {
                    var i = r[e.mesh],
                      o = !0,
                      a = !1,
                      s = void 0;
                    try {
                      for (
                        var _, u = i.primitives[Symbol.iterator]();
                        !(o = (_ = u.next()).done);
                        o = !0
                      ) {
                        var f = _.value;
                        n.addRenderPrimitive(f);
                      }
                    } catch (e) {
                      (a = !0), (s = e);
                    } finally {
                      try {
                        !o && u.return && u.return();
                      } finally {
                        if (a) throw s;
                      }
                    }
                  }
                  if (
                    (e.matrix
                      ? (n.matrix = new Float32Array(e.matrix))
                      : (e.translation || e.rotation || e.scale) &&
                        (e.translation &&
                          (n.translation = new Float32Array(e.translation)),
                        e.rotation &&
                          (n.rotation = new Float32Array(e.rotation)),
                        e.scale && (n.scale = new Float32Array(e.scale))),
                    e.children)
                  ) {
                    var c = !0,
                      h = !1,
                      d = void 0;
                    try {
                      for (
                        var v, m = e.children[Symbol.iterator]();
                        !(c = (v = m.next()).done);
                        c = !0
                      ) {
                        var p = v.value,
                          y = t[p];
                        n.addNode(this.processNodes(y, t, r));
                      }
                    } catch (e) {
                      (h = !0), (d = e);
                    } finally {
                      try {
                        !c && m.return && m.return();
                      } finally {
                        if (h) throw d;
                      }
                    }
                  }
                  return n;
                }
              }
            ]),
            e
          );
        })()),
        function e() {
          n(this, e), (this.primitives = []);
        }),
        p = (function() {
          function e(t, r) {
            n(this, e),
              (this.buffer = r[t.buffer]),
              (this.byteOffset = t.byteOffset || 0),
              (this.byteLength = t.byteLength || null),
              (this.byteStride = t.byteStride),
              (this._viewPromise = null),
              (this._renderBuffer = null);
          }
          return (
            _(e, [
              {
                key: "dataView",
                value: function() {
                  var e = this;
                  return (
                    this._viewPromise ||
                      (this._viewPromise = this.buffer
                        .arrayBuffer()
                        .then(function(t) {
                          return new DataView(t, e.byteOffset, e.byteLength);
                        })),
                    this._viewPromise
                  );
                }
              },
              {
                key: "renderBuffer",
                value: function(e, t) {
                  return (
                    this._renderBuffer ||
                      (this._renderBuffer = e.createRenderBuffer(
                        t,
                        this.dataView()
                      )),
                    this._renderBuffer
                  );
                }
              }
            ]),
            e
          );
        })(),
        y = (function() {
          function e(t, r, i) {
            n(this, e),
              (this.json = t),
              (this.baseUrl = r),
              (this._dataPromise = null),
              (this._texture = null),
              i && (this._dataPromise = Promise.resolve(i));
          }
          return (
            _(e, [
              {
                key: "arrayBuffer",
                value: function() {
                  if (!this._dataPromise) {
                    if (o(this.json.uri)) {
                      var e = this.json.uri.replace(
                          "data:application/octet-stream;base64,",
                          ""
                        ),
                        t = Uint8Array.from(atob(e), function(e) {
                          return e.charCodeAt(0);
                        });
                      return (
                        (this._dataPromise = Promise.resolve(t.buffer)),
                        this._dataPromise
                      );
                    }
                    this._dataPromise = fetch(
                      a(this.json.uri, this.baseUrl)
                    ).then(function(e) {
                      return e.arrayBuffer();
                    });
                  }
                  return this._dataPromise;
                }
              },
              {
                key: "texture",
                value: function(e) {
                  var t = this;
                  if (!this._texture) {
                    var r = new Image();
                    if (
                      ((this._texture = new c.ImageTexture(r)), this.json.uri)
                    )
                      o(this.json.uri)
                        ? (r.src = this.json.uri)
                        : (r.src = "" + this.baseUrl + this.json.uri);
                    else {
                      var n = e[this.json.bufferView];
                      n.dataView().then(function(e) {
                        var n = new Blob([e], { type: t.json.mimeType });
                        r.src = window.URL.createObjectURL(n);
                      });
                    }
                  }
                  return this._texture;
                }
              }
            ]),
            e
          );
        })();
    },
    function(e, t, r) {
      "use strict";
      function n(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function i(e, t) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
      }
      function o(e, t) {
        if ("function" != typeof t && null !== t)
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof t
          );
        (e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          t &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, t)
              : (e.__proto__ = t));
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.CubeSeaScene = void 0);
      var a = (function() {
          function e(e, t) {
            for (var r = 0; r < t.length; r++) {
              var n = t[r];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n);
            }
          }
          return function(t, r, n) {
            return r && e(t.prototype, r), n && e(t, n), t;
          };
        })(),
        s = r(11),
        _ = r(3),
        u = (r(8), r(4), r(6)),
        l = r(9),
        f = (function(e) {
          function t() {
            n(this, t);
            var e = i(
              this,
              (t.__proto__ || Object.getPrototypeOf(t)).call(this)
            );
            return (e.base_color = e.defineSampler("baseColor")), e;
          }
          return (
            o(t, e),
            a(t, [
              {
                key: "material_name",
                get: function() {
                  return "CUBE_SEA";
                }
              },
              {
                key: "vertex_source",
                get: function() {
                  return "\n    attribute vec3 POSITION;\n    attribute vec2 TEXCOORD_0;\n    attribute vec3 NORMAL;\n\n    varying vec2 vTexCoord;\n    varying vec3 vLight;\n\n    const vec3 lightDir = vec3(0.75, 0.5, 1.0);\n    const vec3 ambientColor = vec3(0.5, 0.5, 0.5);\n    const vec3 lightColor = vec3(0.75, 0.75, 0.75);\n\n    vec4 vertex_main(mat4 proj, mat4 view, mat4 model) {\n      vec3 normalRotated = vec3(model * vec4(NORMAL, 0.0));\n      float lightFactor = max(dot(normalize(lightDir), normalRotated), 0.0);\n      vLight = ambientColor + (lightColor * lightFactor);\n      vTexCoord = TEXCOORD_0;\n      return proj * view * model * vec4(POSITION, 1.0);\n    }";
                }
              },
              {
                key: "fragment_source",
                get: function() {
                  return "\n    precision mediump float;\n    uniform sampler2D baseColor;\n    varying vec2 vTexCoord;\n    varying vec3 vLight;\n\n    vec4 fragment_main() {\n      return vec4(vLight, 1.0) * texture2D(baseColor, vTexCoord);\n    }";
                }
              }
            ]),
            t
          );
        })(_.Material);
      t.CubeSeaScene = (function(e) {
        function t() {
          var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          n(this, t);
          var r = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
          return (
            (r._grid_size = e.grid_size ? e.grid_size : 10),
            (r._image_url = e.image_url
              ? e.image_url
              : "media/textures/cube-sea.png"),
            r
          );
        }
        return (
          o(t, e),
          a(t, [
            {
              key: "onLoadScene",
              value: function(e) {
                for (
                  var t = new l.BoxBuilder(), r = 0.5 * this._grid_size, n = 0;
                  n < this._grid_size;
                  ++n
                )
                  for (var i = 0; i < this._grid_size; ++i)
                    for (var o = 0; o < this._grid_size; ++o) {
                      var a = [n - r, i - r, o - r];
                      (0 == a[0] && 0 == a[1] && 0 == a[2]) ||
                        t.pushCube(a, 0.4);
                    }
                var s = t.primitive_stream.finishPrimitive(e);
                t.primitive_stream.clear(),
                  t.pushCube([0, 0.25, -0.8], 0.1),
                  t.pushCube([0.8, 0.25, 0], 0.1),
                  t.pushCube([0, 0.25, 0.8], 0.1),
                  t.pushCube([-0.8, 0.25, 0], 0.1);
                var _ = t.primitive_stream.finishPrimitive(e),
                  c = new f();
                return (
                  (c.base_color.texture = new u.UrlTexture(this._image_url)),
                  (this.cube_sea_node = e.createMesh(s, c)),
                  (this.hero_node = e.createMesh(_, c)),
                  this.addNode(this.cube_sea_node),
                  this.addNode(this.hero_node),
                  this.waitForComplete()
                );
              }
            },
            {
              key: "onDrawViews",
              value: function(e, t, r) {
                mat4.fromRotation(this.hero_node.matrix, t / 2e3, [0, 1, 0]),
                  e.drawViews(r, this);
              }
            }
          ]),
          t
        );
      })(s.Scene);
    },
    function(e, t, r) {
      "use strict";
      function n(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function i(e, t) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
      }
      function o(e, t) {
        if ("function" != typeof t && null !== t)
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof t
          );
        (e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          t &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, t)
              : (e.__proto__ = t));
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.GLTF2Scene = void 0);
      var a = (function() {
          function e(e, t) {
            for (var r = 0; r < t.length; r++) {
              var n = t[r];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n);
            }
          }
          return function(t, r, n) {
            return r && e(t.prototype, r), n && e(t, n), t;
          };
        })(),
        s = r(11);
      r(17),
        (t.GLTF2Scene = (function(e) {
          function t(e) {
            n(this, t);
            var r = i(
              this,
              (t.__proto__ || Object.getPrototypeOf(t)).call(this)
            );
            return (r.url = e), (r.gltf_node = null), r;
          }
          return (
            o(t, e),
            a(t, [
              {
                key: "onLoadScene",
                value: function(e) {
                  var t = this;
                  return this.gltf2Loader
                    .loadFromUrl(this.url)
                    .then(function(e) {
                      return (
                        (t.gltf_node = e),
                        t.addNode(t.gltf_node),
                        t.waitForComplete()
                      );
                    });
                }
              }
            ]),
            t
          );
        })(s.Scene));
    }
  ]);
});
