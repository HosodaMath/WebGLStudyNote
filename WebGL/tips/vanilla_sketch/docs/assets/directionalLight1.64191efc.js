var g=Object.defineProperty;var K=(u,e,n)=>e in u?g(u,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):u[e]=n;var q=(u,e,n)=>(K(u,typeof e!="symbol"?e+"":e,n),n);import"./modulepreload-polyfill.b7f2da20.js";/* empty css               */const Q=(u,e,n)=>{const o=u.createProgram();if(!o)throw new Error("Error");if(u.attachShader(o,e),u.attachShader(o,n),u.linkProgram(o),!u.getProgramParameter(o,u.LINK_STATUS))throw new Error(`\u30B7\u30A7\u30FC\u30C0\u30FC\u306E\u30EA\u30F3\u30AF\u306B\u5931\u6557\u3057\u307E\u3057\u305F ${u.getProgramInfoLog}`);return u.useProgram(o),o},W=(u,e,n)=>{const o=u.createShader(u[e]);if(!o)throw new Error("WebGLShader\u306E\u4F5C\u6210\u4E2D\u30A8\u30E9\u30FC\u304C\u8D77\u304D\u307E\u3057\u305F\u3002\u5F37\u5236\u7D42\u4E86\u3057\u307E\u3059\u3002");if(u.shaderSource(o,n),u.compileShader(o),!u.getShaderParameter(o,u.COMPILE_STATUS))throw new Error(`${u.getShaderInfoLog(o)} ${n}`);return o},J=(u,e)=>{const n=u.createVertexArray();if(!n)throw new Error("VertexArrayObject\u306E\u4F5C\u6210\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3002");u.bindVertexArray(n);const o=e.verticesData.length;[...Array(o).keys()].forEach(s=>{const c=u.createBuffer();u.bindBuffer(u.ARRAY_BUFFER,c),u.bufferData(u.ARRAY_BUFFER,new Float32Array(e.verticesData[s]),u.STATIC_DRAW);const i=e.attributeLocationIndex[s],l=e.attributeSize[s],a=u.FLOAT,C=!1,d=0,p=0;u.enableVertexAttribArray(i),u.vertexAttribPointer(i,l,a,C,d,p)});const t=u.createBuffer();if(!t)throw new Error("Error!! IndexBuffer\u306E\u4F5C\u6210\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3002");return u.bindBuffer(u.ELEMENT_ARRAY_BUFFER,t),u.bufferData(u.ELEMENT_ARRAY_BUFFER,new Uint16Array(e.indicesData),u.STATIC_DRAW),u.bindVertexArray(null),u.bindBuffer(u.ARRAY_BUFFER,null),u.bindBuffer(u.ELEMENT_ARRAY_BUFFER,null),{vao:n,ibo:t,indicesData:e.indicesData}},x=(u,e,n,o)=>{n.clearColor(o[0],o[1],o[2],1),n.clear(n.COLOR_BUFFER_BIT|n.DEPTH_BUFFER_BIT),n.clearDepth(1),n.viewport(0,0,u,e)};class Y{static create(){return new Float32Array(3)}static set(e,n,o){const t=this.create();return t[0]=e,t[1]=n,t[2]=o,t}}const O=class{static init(){return new Float32Array(16)}static copy(e,n){let o=n;return o[0]=e[0],o[1]=e[1],o[2]=e[2],o[3]=e[3],o[4]=e[4],o[5]=e[5],o[6]=e[6],o[7]=e[7],o[8]=e[8],o[9]=e[9],o[10]=e[10],o[11]=e[11],o[12]=e[12],o[13]=e[13],o[14]=e[14],o[15]=e[15],o}static identity(e){let n=e;return n[0]=1,n[1]=0,n[2]=0,n[3]=0,n[4]=0,n[5]=1,n[6]=0,n[7]=0,n[8]=0,n[9]=0,n[10]=1,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,n}static multiply(e,n,o){let t=o,r=e[0],s=e[1],c=e[2],i=e[3],l=e[4],a=e[5],C=e[6],d=e[7],p=e[8],h=e[9],f=e[10],y=e[11],S=e[12],F=e[13],E=e[14],D=e[15],v=n[0],M=n[1],w=n[2],A=n[3],L=n[4],B=n[5],T=n[6],I=n[7],V=n[8],b=n[9],_=n[10],P=n[11],z=n[12],U=n[13],N=n[14],j=n[15];return t[0]=v*r+M*l+w*p+A*S,t[1]=v*s+M*a+w*h+A*F,t[2]=v*c+M*C+w*f+A*E,t[3]=v*i+M*d+w*y+A*D,t[4]=L*r+B*l+T*p+I*S,t[5]=L*s+B*a+T*h+I*F,t[6]=L*c+B*C+T*f+I*E,t[7]=L*i+B*d+T*y+I*D,t[8]=V*r+b*l+_*p+P*S,t[9]=V*s+b*a+_*h+P*F,t[10]=V*c+b*C+_*f+P*E,t[11]=V*i+b*d+_*y+P*D,t[12]=z*r+U*l+N*p+j*S,t[13]=z*s+U*a+N*h+j*F,t[14]=z*c+U*C+N*f+j*E,t[15]=z*i+U*d+N*y+j*D,t}static scale(e,n,o){let t=o;return t[0]=e[0]*n[0],t[1]=e[1]*n[0],t[2]=e[2]*n[0],t[3]=e[3]*n[0],t[4]=e[4]*n[1],t[5]=e[5]*n[1],t[6]=e[6]*n[1],t[7]=e[7]*n[1],t[8]=e[8]*n[2],t[9]=e[9]*n[2],t[10]=e[10]*n[2],t[11]=e[11]*n[2],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15],t}static translate(e,n,o){let t=o;return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t[9]=e[9],t[10]=e[10],t[11]=e[11],t[12]=e[0]*n[0]+e[4]*n[1]+e[8]*n[2]+e[12],t[13]=e[1]*n[0]+e[5]*n[1]+e[9]*n[2]+e[13],t[14]=e[2]*n[0]+e[6]*n[1]+e[10]*n[2]+e[14],t[15]=e[3]*n[0]+e[7]*n[1]+e[11]*n[2]+e[15],t}static rotate(e,n,o,t){let r=t;r==null&&(r=O.init());let s=Math.sqrt(o[0]*o[0]+o[1]*o[1]+o[2]*o[2]);if(!s)return null;let c=o[0],i=o[1],l=o[2];s!=1&&(s=1/s,c*=s,i*=s,l*=s);const a=Math.sin(n),C=Math.cos(n),d=1-C,p=e[0],h=e[1],f=e[2],y=e[3],S=e[4],F=e[5],E=e[6],D=e[7],v=e[8],M=e[9],w=e[10],A=e[11],L=c*c*d+C,B=i*c*d+l*a,T=l*c*d-i*a,I=c*i*d-l*a,V=i*i*d+C,b=l*i*d+c*a,_=c*l*d+i*a,P=i*l*d-c*a,z=l*l*d+C;return n?e!=r&&(r[12]=e[12],r[13]=e[13],r[14]=e[14],r[15]=e[15]):r=e,r[0]=p*L+S*B+v*T,r[1]=h*L+F*B+M*T,r[2]=f*L+E*B+w*T,r[3]=y*L+D*B+A*T,r[4]=p*I+S*V+v*b,r[5]=h*I+F*V+M*b,r[6]=f*I+E*V+w*b,r[7]=y*I+D*V+A*b,r[8]=p*_+S*P+v*z,r[9]=h*_+F*P+M*z,r[10]=f*_+E*P+w*z,r[11]=y*_+D*P+A*z,r}static perspective(e,n,o,t,r){let s=r,c=o*Math.tan(e*Math.PI/360),l=c*n*2,a=c*2,C=t-o;return s[0]=o*2/l,s[1]=0,s[2]=0,s[3]=0,s[4]=0,s[5]=o*2/a,s[6]=0,s[7]=0,s[8]=0,s[9]=0,s[10]=-(t+o)/C,s[11]=-1,s[12]=0,s[13]=0,s[14]=-(t*o*2)/C,s[15]=0,s}static ortho(e,n,o,t,r,s,c){let i=c,l=n-e,a=o-t,C=s-r;return i[0]=2/l,i[1]=0,i[2]=0,i[3]=0,i[4]=0,i[5]=2/a,i[6]=0,i[7]=0,i[8]=0,i[9]=0,i[10]=-2/C,i[11]=0,i[12]=-(e+n)/l,i[13]=-(o+t)/a,i[14]=-(s+r)/C,i[15]=1,i}static transpose(e,n){let o=n;return o[0]=e[0],o[1]=e[4],o[2]=e[8],o[3]=e[12],o[4]=e[1],o[5]=e[5],o[6]=e[9],o[7]=e[13],o[8]=e[2],o[9]=e[6],o[10]=e[10],o[11]=e[14],o[12]=e[3],o[13]=e[7],o[14]=e[11],o[15]=e[15],o}static invert(e,n){let o=n,t=e[0],r=e[1],s=e[2],c=e[3],i=e[4],l=e[5],a=e[6],C=e[7],d=e[8],p=e[9],h=e[10],f=e[11],y=e[12],S=e[13],F=e[14],E=e[15],D=t*l-r*i,v=t*a-s*i,M=t*C-c*i,w=r*a-s*l,A=r*C-c*l,L=s*C-c*a,B=d*S-p*y,T=d*F-h*y,I=d*E-f*y,V=p*F-h*S,b=p*E-f*S,_=h*E-f*F,P=1/(D*_-v*b+M*V+w*I-A*T+L*B);return o[0]=(l*_-a*b+C*V)*P,o[1]=(-r*_+s*b-c*V)*P,o[2]=(S*L-F*A+E*w)*P,o[3]=(-p*L+h*A-f*w)*P,o[4]=(-i*_+a*I-C*T)*P,o[5]=(t*_-s*I+c*T)*P,o[6]=(-y*L+F*M-E*v)*P,o[7]=(d*L-h*M+f*v)*P,o[8]=(i*b-l*I+C*B)*P,o[9]=(-t*b+r*I-c*B)*P,o[10]=(y*A-S*M+E*D)*P,o[11]=(-d*A+p*M-f*D)*P,o[12]=(-i*V+l*T-a*B)*P,o[13]=(t*V-r*T+s*B)*P,o[14]=(-y*w+S*v-F*D)*P,o[15]=(d*w-p*v+h*D)*P,o}};let R=O;q(R,"lookAt",(e,n,o,t)=>{const r=e[0],s=e[1],c=e[2],i=n[0],l=n[1],a=n[2],C=o[0],d=o[1],p=o[2];if(r==i&&s==l&&c==a)return O.identity(t);let h=t;h==null&&(h=O.init());let f,y,S,F,E,D,v,M,w,A;return v=r-n[0],M=s-n[1],w=c-n[2],A=1/Math.sqrt(v*v+M*M+w*w),v*=A,M*=A,w*=A,f=d*w-p*M,y=p*v-C*w,S=C*M-d*v,A=Math.sqrt(f*f+y*y+S*S),A?(A=1/A,f*=A,y*=A,S*=A):(f=0,y=0,S=0),F=M*S-w*y,E=w*f-v*S,D=v*y-M*f,A=Math.sqrt(F*F+E*E+D*D),A?(A=1/A,F*=A,E*=A,D*=A):(F=0,E=0,D=0),h[0]=f,h[1]=F,h[2]=v,h[3]=0,h[4]=y,h[5]=E,h[6]=M,h[7]=0,h[8]=S,h[9]=D,h[10]=w,h[11]=0,h[12]=-(f*r+y*s+S*c),h[13]=-(F*r+E*s+D*c),h[14]=-(v*r+M*s+w*c),h[15]=1,h});class m{static sphere(e,n,o,t){let r,s;const c=[],i=[],l=[],a=[],C=[];for(r=0;r<=e;r++){const p=Math.PI/e*r,h=Math.cos(p),f=Math.sin(p);for(s=0;s<=n;s++){const y=Math.PI*2/n*s,S=f*o*Math.cos(y),F=h*o,E=f*o*Math.sin(y),D=f*Math.cos(y),v=f*Math.sin(y);c.push(S,F,E),i.push(D,h,v),l.push(t[0],t[1],t[2],t[3]),a.push(1-1/n*s,1/e*r)}}for(r=0;r<e;r++)for(s=0;s<n;s++){let p=(n+1)*r+s;C.push(p,p+1,p+n+2),C.push(p,p+n+2,p+n+1)}return{vertices:c,normal:i,color:l,textureCoord:a,indices:C}}static sphereColor(e,n,o){let t,r;const s=[],c=[],i=[],l=[],a=[];for(t=0;t<=e;t++){const d=Math.PI/e*t,p=Math.cos(d),h=Math.sin(d);for(r=0;r<=n;r++){const f=Math.PI*2/n*r,y=h*o*Math.cos(f),S=p*o,F=h*o*Math.sin(f),E=h*Math.cos(f),D=h*Math.sin(f);s.push(y,S,F),c.push(E,p,D);const v=[1,.5,0,1];i.push(v[0],v[1],v[2],v[3]),l.push(1-1/n*r,1/e*t)}}for(t=0;t<e;t++)for(r=0;r<n;r++){let d=(n+1)*t+r;a.push(d,d+1,d+n+2),a.push(d,d+n+2,d+n+1)}return{vertices:s,normal:c,color:i,textureCoord:l,indices:a}}}var ee=`#version 300 es\r
precision highp float;\r
precision highp int;\r
// uniform\r
uniform mat4 uModelViewProjectionMatrix;\r
uniform float uPointSize;\r
// attribute\r
layout (location = 0) in vec4 aColor;\r
layout (location = 1) in vec3 aPosition;\r
layout (location = 2) in vec3 aNormal;\r
layout (location = 3) in vec2 aTexCoord;\r
// varying\r
out vec4 vColor;\r
out vec3 vNormal;\r
out vec2 vTexCoord;\r
void main(void){\r
  \r
  vColor = aColor;\r
\r
  vNormal = aNormal;\r
\r
  vTexCoord = aTexCoord;\r
\r
  gl_PointSize = uPointSize;\r
\r
  gl_Position = uModelViewProjectionMatrix * vec4(aPosition, 1.0);\r
\r
}`,ne=`#version 300 es\r
precision highp float;\r
precision highp int;\r
uniform mat4 uInvertMatrix;\r
uniform vec3 uLightDirection;\r
// varying\r
in vec4 vColor;\r
in vec3 vNormal;\r
in vec2 vTexCoord;\r
\r
// \u6700\u7D42\u7684\u306B\u51FA\u529B\u3055\u308C\u308B\u8272\r
out vec4 fragColor;\r
\r
const float PI2 = 6.28318530718;\r
const float TAU = PI2;\r
\r
void main(void){\r
\r
  // vec2 uv = vTexCoord;\r
  vec2 uv = vNormal.xy;\r
\r
  vec3 invertLight = normalize(uInvertMatrix * vec4(uLightDirection, 0.0)).xyz;\r
  float diffuse = clamp(dot(vNormal, invertLight), 0.1, 1.0);\r
  \r
  vec4 bgColor = vec4(uv.x, uv.y, 1.0, 1.0);\r
  bgColor *= vec4(vec3(diffuse), 1.0);\r
\r
  fragColor = bgColor;\r
}`;const te=()=>{const u=document.body,e=document.createElement("canvas");e.classList.add("canvas");let n=e.width=window.innerWidth,o=e.height=window.innerHeight;u.appendChild(e);const t=e.getContext("webgl2");if(!t)throw new Error("Error!! WebGL2\u3092\u30B5\u30DD\u30FC\u30C8\u3057\u3066\u3044\u307E\u305B\u3093\u3002");const r=W(t,"VERTEX_SHADER",ee),s=W(t,"FRAGMENT_SHADER",ne),c=Q(t,r,s),i=[0,1,2,3],l=[4,3,3,2],a=m.sphere(128,128,1,[1,1,.5,1]),C=a.color,d=a.vertices,p=a.normal,h=a.textureCoord,f=a.indices,S=J(t,{attributeLocationIndex:i,attributeSize:l,verticesData:[C,d,p,h],indicesData:f}),F={uModelViewProjectionMatrix:t.getUniformLocation(c,"uModelViewProjectionMatrix"),uInvertMatrix:t.getUniformLocation(c,"uInvertMatrix"),uLightDirection:t.getUniformLocation(c,"uLightDirection"),uPointSize:t.getUniformLocation(c,"uPointSize")},E=R.identity(R.init()),D=R.identity(R.init()),v=R.identity(R.init()),M=R.identity(R.init()),w=R.identity(R.init()),A=R.identity(R.init()),L=Y.set(0,0,3),B=Y.set(0,0,0),T=Y.set(0,1,0),I=[-.5,.5,.5],V=3;t.enable(t.DEPTH_TEST),t.depthFunc(t.LEQUAL);const b=()=>{x(n,o,t,[0,0,0]),t.useProgram(c),R.lookAt(L,B,T,D);const P=90,z=n/o,U=.1,N=100;R.perspective(P,z,U,N,v),R.multiply(v,D,M),R.identity(E);const j=Y.set(0,0,0);R.translate(E,j,E);const H=1,k=Y.set(H,H,H);R.scale(E,k,E),R.multiply(M,E,w),R.invert(E,A),t.uniformMatrix4fv(F.uModelViewProjectionMatrix,!1,w),t.uniformMatrix4fv(F.uInvertMatrix,!1,A),t.uniform3fv(F.uLightDirection,I),t.uniform1f(F.uPointSize,V),t.bindVertexArray(S.vao),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,S.ibo);const G=t.TRIANGLES,X=S.indicesData.length,Z=t.UNSIGNED_SHORT,$=0;t.drawElements(G,X,Z,$),t.bindVertexArray(null),t.bindBuffer(t.ARRAY_BUFFER,null),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,null),requestAnimationFrame(b)};b();const _=()=>{n=e.width=window.innerWidth,o=e.height=window.innerHeight};window.addEventListener("resize",_)};window.addEventListener("load",te);
