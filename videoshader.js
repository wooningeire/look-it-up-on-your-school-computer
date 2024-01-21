const TIMESCALE = 1;


const canvas = document.createElement("canvas");
canvas.style.width = "100%";
document.querySelector(".html5-video-container").append(canvas);

const video = document.querySelector("video");
video.style.opacity = "0";

canvas.width = video.videoWidth;
canvas.height = video.videoHeight;



const gl = canvas.getContext("webgl2");
const vertexShaderSource = `#version 300 es
in vec4 a_pos;

out vec2 v_texcoord;

void main() {
    gl_Position = a_pos;

    // Map [-1, 1] to [0, 1]
    v_texcoord = (a_pos.xy + 1.0) / 2.0;
}`;
const fragmentShaderSource = `#version 300 es

precision mediump float;

uniform float time;
uniform vec2 resolution;
uniform sampler2D tex;

in vec2 v_texcoord;

out vec4 fragColor;

void main() {
    vec2 uv = v_texcoord * vec2(1.0, -1.0);
    uv.y += sin(v_texcoord.x * 20.0 + time) * cos(time) * 0.1 + sin(v_texcoord.x * 40.0 + time * 3.145) * sin(time) * 0.02;
    uv.x += sin(v_texcoord.y * 20.0 + time) * cos(time) * 0.1 + sin(v_texcoord.y * 40.0 + time * 3.145) * sin(time) * 0.02;

    vec4 color = texture(tex, uv);
    color.r *= (sin(uv.x * uv.y * 40.0) + 3.0) / 2.0;

    fragColor = color;
}`;


//#region Shader setup

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderSource);
gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderSource);
gl.compileShader(fragmentShader);

const glProgram = gl.createProgram();
gl.attachShader(glProgram, vertexShader);
gl.attachShader(glProgram, fragmentShader);
gl.linkProgram(glProgram);

gl.useProgram(glProgram);

//#endregion


//#region Setting attributes

const vertCoords = new Float32Array([
    // Coordinates of the triangles that cover the canvas
    -1, -1,
    -1, 1,
    1, -1,

    -1, 1,
    1, -1,
    1, 1,
]);

const COORD_DIMENSION = 2;
const nVerts = vertCoords.length / COORD_DIMENSION;

const vertBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertCoords, gl.STATIC_DRAW);

const posAttr = gl.getAttribLocation(glProgram, "a_pos");
gl.vertexAttribPointer(posAttr, COORD_DIMENSION, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(posAttr);

//#endregion


//#region Setting uniforms

const resolutionUnif = gl.getUniformLocation(glProgram, "resolution");
gl.uniform2fv(resolutionUnif, [canvas.width, canvas.height]);


const timeUnif = gl.getUniformLocation(glProgram, "time");
gl.uniform1f(timeUnif, 0);


const texture = gl.createTexture();
gl.activeTexture(gl.TEXTURE0);
gl.bindTexture(gl.TEXTURE_2D, texture);

gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

gl.bindTexture(gl.TEXTURE_2D, texture);
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);

const textureUnif = gl.getUniformLocation(glProgram, "tex");
gl.uniform1i(textureUnif, 0);

//#endregion

const draw = (now) => {
    gl.uniform1f(timeUnif, now / 1000 * TIMESCALE);

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);

    gl.drawArrays(gl.TRIANGLES, 0, nVerts);
    requestAnimationFrame(draw);
};
draw();