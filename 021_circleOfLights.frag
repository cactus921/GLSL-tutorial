#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

void main(){
    vec2 coord = gl_FragCoord.xy / u_resolution;
    vec3 color = vec3(0.0);

    vec2 translate = vec2(-0.5, -0.5);
    coord += translate;

    for(int i=0; i<40; i++){
        float radius = 0.3;
        float rad = radians(360.0 / 40.0) * float(i);
        color += 0.03 * 0.1/length(coord + vec2(radius * cos(rad + u_time), radius * sin(rad+u_time *0.2)));
    }

    
    gl_FragColor = vec4(color, 1.0);
}