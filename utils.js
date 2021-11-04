var gl;
var canvas;



function getAttributes(program, table) {
  const numAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
  const attributes = [];

  for (let i = 0; i < numAttributes; i++) {
    const info = gl.getActiveAttrib(program, i);
    const type = table[info.type] ? table[info.type] : "UNKNOWN"

    attributes.push({
      name: info.name,
      type,
      size: info.size
    });
  }

  return attributes;
}


function getRenderInfo() {

  let program = gl.getParameter(gl.CURRENT_PROGRAM)

  const numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  const uniformValues = [];

  const table = {
    [gl.FLOAT]: "float",
    [gl.FLOAT_VEC2]: "float vec2",
    [gl.FLOAT_VEC3]: "float vec3",
    [gl.FLOAT_VEC4]: "float vec4",
    [gl.INT]: "int",
    [gl.INT_VEC2]: "int vec2",
    [gl.INT_VEC3]: "int vec3",
    [gl.INT_VEC4]: "int vec4",
    [gl.BOOL]: "bool",
    [gl.BOOL_VEC2]: "bool vec2",
    [gl.BOOL_VEC3]: "bool vec3",
    [gl.BOOL_VEC4]: "bool vec4",
    [gl.FLOAT_MAT2]: "float mat2",
    [gl.FLOAT_MAT3]: "float mat3",
    [gl.FLOAT_MAT4]: "float mat4",
    [gl.SAMPLER_2D]: "sampler 2D",
    [gl.SAMPLER_CUBE]: "sampler cube",
    // webgl2 context values
    [gl.UNSIGNED_INT]: "unsigned int",
    [gl.UNSIGNED_INT_VEC2]: "unsigned int vec2",
    [gl.UNSIGNED_INT_VEC3]: "unsigned int vec3",
    [gl.UNSIGNED_INT_VEC4]: "unsigned int vec4",
    [gl.FLOAT_MAT2x3]: "float mat2x3",
    [gl.FLOAT_MAT2x4]: "float mat2x4",
    [gl.FLOAT_MAT3x2]: "float mat3x2",
    [gl.FLOAT_MAT3x4]: "float mat3x4",
    [gl.FLOAT_MAT4x2]: "float mat4x2",
    [gl.FLOAT_MAT4x3]: "float mat4x3",
    [gl.SAMPLER_3D]: "sampler 3D",
    [gl.SAMPLER_2D_SHADOW]: "sampler 2D shadow",
    [gl.SAMPLER_2D_ARRAY]: "sampler 2D array",
    [gl.SAMPLER_2D_ARRAY_SAHADOW]: "sampler 2D array shadow",
    [gl.SAMPLER_CUBE_SHADOW]: "sampler cube shadow",
    [gl.INT_SAMPLER_2D]: "int sampler 2D",
    [gl.INT_SAMPLER_3D]: "int sampler 3D",
    [gl.INT_SAMPLER_CUBE]: "int sampler cube",
    [gl.INT_SAMPLER_2D_ARRAY]: "int sampler 2D array",
    [gl.UNSIGNED_INT_SAMPLER_2D]: "unsigned int sampler 2D",
    [gl.UNSIGNED_INT_SAMPLER_3D]: "unsigned int sampler 3D",
    [gl.UNSIGNED_INT_SAMPLER_CUBE]: "unsigned int sampler cube",
    [gl.UNSIGNED_INT_SAMPLER_2D_ARRAY]: "unsigned int sampler 2D array",
  }

  for (let i = 0; i < numUniforms; ++i) {
    const info = gl.getActiveUniform(program, i);
    const type = table[info.type] ? table[info.type] : "UNKNOWN"
    let value = gl.getUniform(program, gl.getUniformLocation(program, info.name));

    uniformValues.push({
      name: info.name,
      type,
      size: info.size,
      value
    });
  }

  const attributes = getAttributes(program, table);

  console.warn("Attributes:");
  console.table(attributes);
  console.warn("Uniforms:");
  console.table(uniformValues);
}

function runDebugger() {
  let all = document.getElementsByTagName('*');

  for (let i = 0; i < all.length; i++) {
    if (all[i].tagName === "CANVAS") {
      canvas = all[i];
      break;
    }
  }

  if (canvas) {
    chrome.runtime.sendMessage({ message: "running debugger" });
    gl = canvas.getContext("webgl2");

    if (gl) {
      console.log("Has WebGL context");
      getRenderInfo();
    } else {
      console.log("No WebGL context");
    }
  } else {
    chrome.runtime.sendMessage({ message: "No canvas found, exiting" });
  }
}

runDebugger();
