#ifdef GL_ES
precision mediump float;
#endif

const float PI = 3.1415926535;

uniform vec2 u_resolution;
uniform float u_time;

float circleshape(vec2 position, float radius){
    return step(radius, length(position - vec2(0.5)));
}

float rectshape(vec2 position, vec2 scale){
    scale = vec2(0.5) - scale * 0.5;
    vec2 shaper = vec2(step(scale.x, position.x), step(scale.y, position.y));
    shaper *= vec2(step(scale.x, 1.0 - position.x), step(scale.y, 1.0 - position.y));   
    return shaper.x * shaper.y;
}

float polygonshape(vec2 position, float radius, float sides){
    position = position * 2.0 - 1.0;
    float angle = atan(position.x, position.y);
    float slice = PI * 2.0 / sides;
    return step(radius, cos(floor(0.5 + angle / slice)* slice - angle) * length(position));
}

mat2 rotate(float angle){
    return mat2(cos(angle), -sin(angle),
                sin(angle),  cos(angle));
}

mat2 scale(vec2 scale){
    return mat2(scale.x, 0.0,
                0.0,     scale.y);
}

void main(){
    //vec2 position = gl_FragCoord.xy / u_resolution;
    vec2 coord = gl_FragCoord.xy / u_resolution;
    //vec3 color = vec3(0.349, 0.7882, 0.4784);
    vec3 color = vec3(0.0);
    //float circle = circleshape(position, 0.2);
    //color = color * vec3(circle);

    //float rect = rectshape(position, vec2(0.3, 0.2));
    //color = color * vec3(rect);
 
    //float polygon = polygonshape(position, 0.3, 6.0);
    //color = color * vec3(polygon);
    
    // Translate
    vec2 translate = vec2(0.0, 0.0);
    coord += translate * 0.5;
    // Rotate
    coord -= vec2(0.5);
    coord = rotate(sin(u_time)) * coord;
    coord += vec2(0.5);
    // Scale
    coord -= vec2(0.5);
    coord = scale(vec2(0.1 + 2.0, 0.8 + 2.0)) * coord;
    coord += vec2(0.5);

    color += vec3(rectshape(coord, vec2(0.3)));
    gl_FragColor = vec4(color, 1.0);
}