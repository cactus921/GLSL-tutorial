#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main(){
    vec2 coord = 6.0 *gl_FragCoord.xy / u_resolution;
    //vec3 color = vec3(0.0);
    //color += sin(coord.x * cos(u_time / 20.0) * 60.0) + sin(coord.y * cos(u_time / 10.0) * 10.0);
    //color += cos(coord.y * sin(u_time / 20.0) * 60.0) + cos(coord.x * sin(u_time / 10.0) * 10.0);   
    //color *= sin(u_time / 10.0) * 0.5;
    //vec2 coord = 5.0* gl_FragCoord.xy / u_resolution; 
    
    for (int n = 1; n < 16; n++){
        float i = float(n);
        coord += vec2(0.7 / i * sin(i*coord.y + u_time + 0.3 * i) + 0.8, 0.4 /i* sin(i*coord.x + u_time + 0.3*i) + 1.6);
    }
    vec3 color = vec3(0.5 * sin(coord.x) + 0.5, 0.5 * sin(coord.y) + 0.5, sin(coord.x + coord.y));

    // make it cartoonish
    float size = 12.0;
    float alpha = sin(floor(coord.y * size) + u_time * 4.0) + 1.0 / 2.0;

    gl_FragColor = vec4(color, 1.0);
}