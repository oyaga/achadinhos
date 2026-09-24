var qW="185";var NW=0,SQ=1,FW=2;var V7=1,OW=2,u8=3,n9=0,TJ=1,aJ=2,O9=0,M7=1,jQ=2,vQ=3,yQ=4,RW=5;var c8=100,kW=101,LW=102,DW=103,VW=104,MW=200,BW=201,zW=202,_W=203,CW=204,PW=205,IW=206,wW=207,AW=208,TW=209,SW=210,jW=211,vW=212,yW=213,hW=214,fW=0,bW=1,xW=2,hQ=3,gW=4,pW=5,lW=6,mW=7,dW=0,uW=1,cW=2,K9=0,fQ=1,bQ=2,xQ=3,B7=4,gQ=5,pQ=6,lQ=7;var n8=301,E8=302,L6=303,D6=304,z7=306,s8=1000,i8=1001,V6=1002,Y9=1003,M6=1004;var q8=1005;var CJ=1006,o8=1007;var R9=1008;var X9=1009,nW=1010,sW=1011,_7=1012,mQ=1013,s9=1014,j9=1015,v9=1016,dQ=1017,uQ=1018,a8=1020,iW=35902,oW=35899,aW=1021,rW=1022,k9=1023,N8=1026,F8=1027,tW=1028,cQ=1029,O8=1030,nQ=1031;var sQ=1033,B6=33776,z6=33777,_6=33778,C6=33779,iQ=35840,oQ=35841,aQ=35842,rQ=35843,tQ=36196,eQ=37492,J$=37496,Q$=37488,$$=37489,P6=37490,Z$=37491,W$=37808,H$=37809,K$=37810,Y$=37811,X$=37812,U$=37813,G$=37814,E$=37815,q$=37816,N$=37817,F$=37818,O$=37819,R$=37820,k$=37821,L$=36492,D$=36494,V$=36495,M$=36283,B$=36284,I6=36285,z$=36286,_$=2200;var C$=2300,w6=2301;var P$=0,C7=1,r8=2;var I$=0,eW=1,R8="",L9="srgb",pJ="srgb-linear",w$="linear",$J="srgb";var JH=512,QH=513,$H=514,A6=515,ZH=516,WH=517,T6=518,HH=519;var A$="300 es",T$=2000;function xK(J){for(let Q=J.length-1;Q>=0;--Q)if(J[Q]>=65535)return!0;return!1}function gK(J){return ArrayBuffer.isView(J)&&!(J instanceof DataView)}function l8(J){return document.createElementNS("http://www.w3.org/1999/xhtml",J)}function KH(){let J=l8("canvas");return J.style.display="block",J}var TZ={},m8=null;function D7(...J){let Q="THREE."+J.shift();if(m8)m8("log",Q,...J);else console.log(Q,...J)}function YH(J){let Q=J[0];if(typeof Q==="string"&&Q.startsWith("TSL:")){let $=J[1];if($&&$.isStackTrace)J[0]+=" "+$.getLocation();else J[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return J}function M0(...J){J=YH(J);let Q="THREE."+J.shift();if(m8)m8("warn",Q,...J);else{let $=J[0];if($&&$.isStackTrace)console.warn($.getError(Q));else console.warn(Q,...J)}}function A0(...J){J=YH(J);let Q="THREE."+J.shift();if(m8)m8("error",Q,...J);else{let $=J[0];if($&&$.isStackTrace)console.error($.getError(Q));else console.error(Q,...J)}}function X8(...J){let Q=J.join(" ");if(Q in TZ)return;TZ[Q]=!0,M0(...J)}function XH(J,Q,$){return new Promise(function(Z,W){function H(){switch(J.clientWaitSync(Q,J.SYNC_FLUSH_COMMANDS_BIT,0)){case J.WAIT_FAILED:W();break;case J.TIMEOUT_EXPIRED:setTimeout(H,$);break;default:Z()}}setTimeout(H,$)})}var UH={[0]:1,[2]:6,[4]:7,[3]:5,[1]:0,[6]:2,[7]:4,[5]:3};class D9{addEventListener(J,Q){if(this._listeners===void 0)this._listeners={};let $=this._listeners;if($[J]===void 0)$[J]=[];if($[J].indexOf(Q)===-1)$[J].push(Q)}hasEventListener(J,Q){let $=this._listeners;if($===void 0)return!1;return $[J]!==void 0&&$[J].indexOf(Q)!==-1}removeEventListener(J,Q){let $=this._listeners;if($===void 0)return;let Z=$[J];if(Z!==void 0){let W=Z.indexOf(Q);if(W!==-1)Z.splice(W,1)}}dispatchEvent(J){let Q=this._listeners;if(Q===void 0)return;let $=Q[J.type];if($!==void 0){J.target=this;let Z=$.slice(0);for(let W=0,H=Z.length;W<H;W++)Z[W].call(this,J);J.target=null}}}var wJ=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],SZ=1234567,k7=Math.PI/180,U8=180/Math.PI;function H9(){let J=Math.random()*4294967295|0,Q=Math.random()*4294967295|0,$=Math.random()*4294967295|0,Z=Math.random()*4294967295|0;return(wJ[J&255]+wJ[J>>8&255]+wJ[J>>16&255]+wJ[J>>24&255]+"-"+wJ[Q&255]+wJ[Q>>8&255]+"-"+wJ[Q>>16&15|64]+wJ[Q>>24&255]+"-"+wJ[$&63|128]+wJ[$>>8&255]+"-"+wJ[$>>16&255]+wJ[$>>24&255]+wJ[Z&255]+wJ[Z>>8&255]+wJ[Z>>16&255]+wJ[Z>>24&255]).toLowerCase()}function p0(J,Q,$){return Math.max(Q,Math.min($,J))}function S$(J,Q){return(J%Q+Q)%Q}function pK(J,Q,$,Z,W){return Z+(J-Q)*(W-Z)/($-Q)}function lK(J,Q,$){if(J!==Q)return($-J)/(Q-J);else return 0}function L7(J,Q,$){return(1-$)*J+$*Q}function mK(J,Q,$,Z){return L7(J,Q,1-Math.exp(-$*Z))}function dK(J,Q=1){return Q-Math.abs(S$(J,Q*2)-Q)}function uK(J,Q,$){if(J<=Q)return 0;if(J>=$)return 1;return J=(J-Q)/($-Q),J*J*(3-2*J)}function cK(J,Q,$){if(J<=Q)return 0;if(J>=$)return 1;return J=(J-Q)/($-Q),J*J*J*(J*(J*6-15)+10)}function nK(J,Q){return J+Math.floor(Math.random()*(Q-J+1))}function sK(J,Q){return J+Math.random()*(Q-J)}function iK(J){return J*(0.5-Math.random())}function oK(J){if(J!==void 0)SZ=J;let Q=SZ+=1831565813;return Q=Math.imul(Q^Q>>>15,Q|1),Q^=Q+Math.imul(Q^Q>>>7,Q|61),((Q^Q>>>14)>>>0)/4294967296}function aK(J){return J*k7}function rK(J){return J*U8}function tK(J){return(J&J-1)===0&&J!==0}function eK(J){return Math.pow(2,Math.ceil(Math.log(J)/Math.LN2))}function JY(J){return Math.pow(2,Math.floor(Math.log(J)/Math.LN2))}function QY(J,Q,$,Z,W){let{cos:H,sin:K}=Math,Y=H($/2),X=K($/2),U=H((Q+Z)/2),G=K((Q+Z)/2),q=H((Q-Z)/2),E=K((Q-Z)/2),F=H((Z-Q)/2),k=K((Z-Q)/2);switch(W){case"XYX":J.set(Y*G,X*q,X*E,Y*U);break;case"YZY":J.set(X*E,Y*G,X*q,Y*U);break;case"ZXZ":J.set(X*q,X*E,Y*G,Y*U);break;case"XZX":J.set(Y*G,X*k,X*F,Y*U);break;case"YXY":J.set(X*F,Y*G,X*k,Y*U);break;case"ZYZ":J.set(X*k,X*F,Y*G,Y*U);break;default:M0("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+W)}}function W9(J,Q){switch(Q.constructor){case Float32Array:return J;case Uint32Array:return J/4294967295;case Uint16Array:return J/65535;case Uint8Array:return J/255;case Int32Array:return Math.max(J/2147483647,-1);case Int16Array:return Math.max(J/32767,-1);case Int8Array:return Math.max(J/127,-1);default:throw Error("THREE.MathUtils: Invalid component type.")}}function o0(J,Q){switch(Q.constructor){case Float32Array:return J;case Uint32Array:return Math.round(J*4294967295);case Uint16Array:return Math.round(J*65535);case Uint8Array:return Math.round(J*255);case Int32Array:return Math.round(J*2147483647);case Int16Array:return Math.round(J*32767);case Int8Array:return Math.round(J*127);default:throw Error("THREE.MathUtils: Invalid component type.")}}var j$={DEG2RAD:k7,RAD2DEG:U8,generateUUID:H9,clamp:p0,euclideanModulo:S$,mapLinear:pK,inverseLerp:lK,lerp:L7,damp:mK,pingpong:dK,smoothstep:uK,smootherstep:cK,randInt:nK,randFloat:sK,randFloatSpread:iK,seededRandom:oK,degToRad:aK,radToDeg:rK,isPowerOfTwo:tK,ceilPowerOfTwo:eK,floorPowerOfTwo:JY,setQuaternionFromProperEuler:QY,normalize:o0,denormalize:W9};class y0{static{y0.prototype.isVector2=!0}constructor(J=0,Q=0){this.x=J,this.y=Q}get width(){return this.x}set width(J){this.x=J}get height(){return this.y}set height(J){this.y=J}set(J,Q){return this.x=J,this.y=Q,this}setScalar(J){return this.x=J,this.y=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;default:throw Error("THREE.Vector2: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;default:throw Error("THREE.Vector2: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y)}copy(J){return this.x=J.x,this.y=J.y,this}add(J){return this.x+=J.x,this.y+=J.y,this}addScalar(J){return this.x+=J,this.y+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this}subScalar(J){return this.x-=J,this.y-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this}multiply(J){return this.x*=J.x,this.y*=J.y,this}multiplyScalar(J){return this.x*=J,this.y*=J,this}divide(J){return this.x/=J.x,this.y/=J.y,this}divideScalar(J){return this.multiplyScalar(1/J)}applyMatrix3(J){let Q=this.x,$=this.y,Z=J.elements;return this.x=Z[0]*Q+Z[3]*$+Z[6],this.y=Z[1]*Q+Z[4]*$+Z[7],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this}clamp(J,Q){return this.x=p0(this.x,J.x,Q.x),this.y=p0(this.y,J.y,Q.y),this}clampScalar(J,Q){return this.x=p0(this.x,J,Q),this.y=p0(this.y,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(p0($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(J){return this.x*J.x+this.y*J.y}cross(J){return this.x*J.y-this.y*J.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(J){let Q=Math.sqrt(this.lengthSq()*J.lengthSq());if(Q===0)return Math.PI/2;let $=this.dot(J)/Q;return Math.acos(p0($,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let Q=this.x-J.x,$=this.y-J.y;return Q*Q+$*$}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this}equals(J){return J.x===this.x&&J.y===this.y}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this}rotateAround(J,Q){let $=Math.cos(Q),Z=Math.sin(Q),W=this.x-J.x,H=this.y-J.y;return this.x=W*$-H*Z+J.x,this.y=W*Z+H*$+J.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class vJ{constructor(J=0,Q=0,$=0,Z=1){this.isQuaternion=!0,this._x=J,this._y=Q,this._z=$,this._w=Z}static slerpFlat(J,Q,$,Z,W,H,K){let Y=$[Z+0],X=$[Z+1],U=$[Z+2],G=$[Z+3],q=W[H+0],E=W[H+1],F=W[H+2],k=W[H+3];if(G!==k||Y!==q||X!==E||U!==F){let B=Y*q+X*E+U*F+G*k;if(B<0)q=-q,E=-E,F=-F,k=-k,B=-B;let O=1-K;if(B<0.9995){let N=Math.acos(B),_=Math.sin(N);O=Math.sin(O*N)/_,K=Math.sin(K*N)/_,Y=Y*O+q*K,X=X*O+E*K,U=U*O+F*K,G=G*O+k*K}else{Y=Y*O+q*K,X=X*O+E*K,U=U*O+F*K,G=G*O+k*K;let N=1/Math.sqrt(Y*Y+X*X+U*U+G*G);Y*=N,X*=N,U*=N,G*=N}}J[Q]=Y,J[Q+1]=X,J[Q+2]=U,J[Q+3]=G}static multiplyQuaternionsFlat(J,Q,$,Z,W,H){let K=$[Z],Y=$[Z+1],X=$[Z+2],U=$[Z+3],G=W[H],q=W[H+1],E=W[H+2],F=W[H+3];return J[Q]=K*F+U*G+Y*E-X*q,J[Q+1]=Y*F+U*q+X*G-K*E,J[Q+2]=X*F+U*E+K*q-Y*G,J[Q+3]=U*F-K*G-Y*q-X*E,J}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get w(){return this._w}set w(J){this._w=J,this._onChangeCallback()}set(J,Q,$,Z){return this._x=J,this._y=Q,this._z=$,this._w=Z,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(J){return this._x=J.x,this._y=J.y,this._z=J.z,this._w=J.w,this._onChangeCallback(),this}setFromEuler(J,Q=!0){let{_x:$,_y:Z,_z:W,_order:H}=J,K=Math.cos,Y=Math.sin,X=K($/2),U=K(Z/2),G=K(W/2),q=Y($/2),E=Y(Z/2),F=Y(W/2);switch(H){case"XYZ":this._x=q*U*G+X*E*F,this._y=X*E*G-q*U*F,this._z=X*U*F+q*E*G,this._w=X*U*G-q*E*F;break;case"YXZ":this._x=q*U*G+X*E*F,this._y=X*E*G-q*U*F,this._z=X*U*F-q*E*G,this._w=X*U*G+q*E*F;break;case"ZXY":this._x=q*U*G-X*E*F,this._y=X*E*G+q*U*F,this._z=X*U*F+q*E*G,this._w=X*U*G-q*E*F;break;case"ZYX":this._x=q*U*G-X*E*F,this._y=X*E*G+q*U*F,this._z=X*U*F-q*E*G,this._w=X*U*G+q*E*F;break;case"YZX":this._x=q*U*G+X*E*F,this._y=X*E*G+q*U*F,this._z=X*U*F-q*E*G,this._w=X*U*G-q*E*F;break;case"XZY":this._x=q*U*G-X*E*F,this._y=X*E*G-q*U*F,this._z=X*U*F+q*E*G,this._w=X*U*G+q*E*F;break;default:M0("Quaternion: .setFromEuler() encountered an unknown order: "+H)}if(Q===!0)this._onChangeCallback();return this}setFromAxisAngle(J,Q){let $=Q/2,Z=Math.sin($);return this._x=J.x*Z,this._y=J.y*Z,this._z=J.z*Z,this._w=Math.cos($),this._onChangeCallback(),this}setFromRotationMatrix(J){let Q=J.elements,$=Q[0],Z=Q[4],W=Q[8],H=Q[1],K=Q[5],Y=Q[9],X=Q[2],U=Q[6],G=Q[10],q=$+K+G;if(q>0){let E=0.5/Math.sqrt(q+1);this._w=0.25/E,this._x=(U-Y)*E,this._y=(W-X)*E,this._z=(H-Z)*E}else if($>K&&$>G){let E=2*Math.sqrt(1+$-K-G);this._w=(U-Y)/E,this._x=0.25*E,this._y=(Z+H)/E,this._z=(W+X)/E}else if(K>G){let E=2*Math.sqrt(1+K-$-G);this._w=(W-X)/E,this._x=(Z+H)/E,this._y=0.25*E,this._z=(Y+U)/E}else{let E=2*Math.sqrt(1+G-$-K);this._w=(H-Z)/E,this._x=(W+X)/E,this._y=(Y+U)/E,this._z=0.25*E}return this._onChangeCallback(),this}setFromUnitVectors(J,Q){let $=J.dot(Q)+1;if($<0.00000001)if($=0,Math.abs(J.x)>Math.abs(J.z))this._x=-J.y,this._y=J.x,this._z=0,this._w=$;else this._x=0,this._y=-J.z,this._z=J.y,this._w=$;else this._x=J.y*Q.z-J.z*Q.y,this._y=J.z*Q.x-J.x*Q.z,this._z=J.x*Q.y-J.y*Q.x,this._w=$;return this.normalize()}angleTo(J){return 2*Math.acos(Math.abs(p0(this.dot(J),-1,1)))}rotateTowards(J,Q){let $=this.angleTo(J);if($===0)return this;let Z=Math.min(1,Q/$);return this.slerp(J,Z),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(J){return this._x*J._x+this._y*J._y+this._z*J._z+this._w*J._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let J=this.length();if(J===0)this._x=0,this._y=0,this._z=0,this._w=1;else J=1/J,this._x=this._x*J,this._y=this._y*J,this._z=this._z*J,this._w=this._w*J;return this._onChangeCallback(),this}multiply(J){return this.multiplyQuaternions(this,J)}premultiply(J){return this.multiplyQuaternions(J,this)}multiplyQuaternions(J,Q){let{_x:$,_y:Z,_z:W,_w:H}=J,K=Q._x,Y=Q._y,X=Q._z,U=Q._w;return this._x=$*U+H*K+Z*X-W*Y,this._y=Z*U+H*Y+W*K-$*X,this._z=W*U+H*X+$*Y-Z*K,this._w=H*U-$*K-Z*Y-W*X,this._onChangeCallback(),this}slerp(J,Q){let{_x:$,_y:Z,_z:W,_w:H}=J,K=this.dot(J);if(K<0)$=-$,Z=-Z,W=-W,H=-H,K=-K;let Y=1-Q;if(K<0.9995){let X=Math.acos(K),U=Math.sin(X);Y=Math.sin(Y*X)/U,Q=Math.sin(Q*X)/U,this._x=this._x*Y+$*Q,this._y=this._y*Y+Z*Q,this._z=this._z*Y+W*Q,this._w=this._w*Y+H*Q,this._onChangeCallback()}else this._x=this._x*Y+$*Q,this._y=this._y*Y+Z*Q,this._z=this._z*Y+W*Q,this._w=this._w*Y+H*Q,this.normalize();return this}slerpQuaternions(J,Q,$){return this.copy(J).slerp(Q,$)}random(){let J=2*Math.PI*Math.random(),Q=2*Math.PI*Math.random(),$=Math.random(),Z=Math.sqrt(1-$),W=Math.sqrt($);return this.set(Z*Math.sin(J),Z*Math.cos(J),W*Math.sin(Q),W*Math.cos(Q))}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._w===this._w}fromArray(J,Q=0){return this._x=J[Q],this._y=J[Q+1],this._z=J[Q+2],this._w=J[Q+3],this._onChangeCallback(),this}toArray(J=[],Q=0){return J[Q]=this._x,J[Q+1]=this._y,J[Q+2]=this._z,J[Q+3]=this._w,J}fromBufferAttribute(J,Q){return this._x=J.getX(Q),this._y=J.getY(Q),this._z=J.getZ(Q),this._w=J.getW(Q),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class y{static{y.prototype.isVector3=!0}constructor(J=0,Q=0,$=0){this.x=J,this.y=Q,this.z=$}set(J,Q,$){if($===void 0)$=this.z;return this.x=J,this.y=Q,this.z=$,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;case 2:this.z=Q;break;default:throw Error("THREE.Vector3: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error("THREE.Vector3: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this.z=J.z+Q.z,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this.z+=J.z*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this.z=J.z-Q.z,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this}multiplyVectors(J,Q){return this.x=J.x*Q.x,this.y=J.y*Q.y,this.z=J.z*Q.z,this}applyEuler(J){return this.applyQuaternion(jZ.setFromEuler(J))}applyAxisAngle(J,Q){return this.applyQuaternion(jZ.setFromAxisAngle(J,Q))}applyMatrix3(J){let Q=this.x,$=this.y,Z=this.z,W=J.elements;return this.x=W[0]*Q+W[3]*$+W[6]*Z,this.y=W[1]*Q+W[4]*$+W[7]*Z,this.z=W[2]*Q+W[5]*$+W[8]*Z,this}applyNormalMatrix(J){return this.applyMatrix3(J).normalize()}applyMatrix4(J){let Q=this.x,$=this.y,Z=this.z,W=J.elements,H=1/(W[3]*Q+W[7]*$+W[11]*Z+W[15]);return this.x=(W[0]*Q+W[4]*$+W[8]*Z+W[12])*H,this.y=(W[1]*Q+W[5]*$+W[9]*Z+W[13])*H,this.z=(W[2]*Q+W[6]*$+W[10]*Z+W[14])*H,this}applyQuaternion(J){let Q=this.x,$=this.y,Z=this.z,W=J.x,H=J.y,K=J.z,Y=J.w,X=2*(H*Z-K*$),U=2*(K*Q-W*Z),G=2*(W*$-H*Q);return this.x=Q+Y*X+H*G-K*U,this.y=$+Y*U+K*X-W*G,this.z=Z+Y*G+W*U-H*X,this}project(J){return this.applyMatrix4(J.matrixWorldInverse).applyMatrix4(J.projectionMatrix)}unproject(J){return this.applyMatrix4(J.projectionMatrixInverse).applyMatrix4(J.matrixWorld)}transformDirection(J){let Q=this.x,$=this.y,Z=this.z,W=J.elements;return this.x=W[0]*Q+W[4]*$+W[8]*Z,this.y=W[1]*Q+W[5]*$+W[9]*Z,this.z=W[2]*Q+W[6]*$+W[10]*Z,this.normalize()}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this}divideScalar(J){return this.multiplyScalar(1/J)}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this}clamp(J,Q){return this.x=p0(this.x,J.x,Q.x),this.y=p0(this.y,J.y,Q.y),this.z=p0(this.z,J.z,Q.z),this}clampScalar(J,Q){return this.x=p0(this.x,J,Q),this.y=p0(this.y,J,Q),this.z=p0(this.z,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(p0($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this.z+=(J.z-this.z)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this.z=J.z+(Q.z-J.z)*$,this}cross(J){return this.crossVectors(this,J)}crossVectors(J,Q){let{x:$,y:Z,z:W}=J,H=Q.x,K=Q.y,Y=Q.z;return this.x=Z*Y-W*K,this.y=W*H-$*Y,this.z=$*K-Z*H,this}projectOnVector(J){let Q=J.lengthSq();if(Q===0)return this.set(0,0,0);let $=J.dot(this)/Q;return this.copy(J).multiplyScalar($)}projectOnPlane(J){return WQ.copy(this).projectOnVector(J),this.sub(WQ)}reflect(J){return this.sub(WQ.copy(J).multiplyScalar(2*this.dot(J)))}angleTo(J){let Q=Math.sqrt(this.lengthSq()*J.lengthSq());if(Q===0)return Math.PI/2;let $=this.dot(J)/Q;return Math.acos(p0($,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let Q=this.x-J.x,$=this.y-J.y,Z=this.z-J.z;return Q*Q+$*$+Z*Z}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)+Math.abs(this.z-J.z)}setFromSpherical(J){return this.setFromSphericalCoords(J.radius,J.phi,J.theta)}setFromSphericalCoords(J,Q,$){let Z=Math.sin(Q)*J;return this.x=Z*Math.sin($),this.y=Math.cos(Q)*J,this.z=Z*Math.cos($),this}setFromCylindrical(J){return this.setFromCylindricalCoords(J.radius,J.theta,J.y)}setFromCylindricalCoords(J,Q,$){return this.x=J*Math.sin(Q),this.y=$,this.z=J*Math.cos(Q),this}setFromMatrixPosition(J){let Q=J.elements;return this.x=Q[12],this.y=Q[13],this.z=Q[14],this}setFromMatrixScale(J){let Q=this.setFromMatrixColumn(J,0).length(),$=this.setFromMatrixColumn(J,1).length(),Z=this.setFromMatrixColumn(J,2).length();return this.x=Q,this.y=$,this.z=Z,this}setFromMatrixColumn(J,Q){return this.fromArray(J.elements,Q*4)}setFromMatrix3Column(J,Q){return this.fromArray(J.elements,Q*3)}setFromEuler(J){return this.x=J._x,this.y=J._y,this.z=J._z,this}setFromColor(J){return this.x=J.r,this.y=J.g,this.z=J.b,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this.z=J[Q+2],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J[Q+2]=this.z,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this.z=J.getZ(Q),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let J=Math.random()*Math.PI*2,Q=Math.random()*2-1,$=Math.sqrt(1-Q*Q);return this.x=$*Math.cos(J),this.y=Q,this.z=$*Math.sin(J),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}var WQ=new y,jZ=new vJ;class T0{static{T0.prototype.isMatrix3=!0}constructor(J,Q,$,Z,W,H,K,Y,X){if(this.elements=[1,0,0,0,1,0,0,0,1],J!==void 0)this.set(J,Q,$,Z,W,H,K,Y,X)}set(J,Q,$,Z,W,H,K,Y,X){let U=this.elements;return U[0]=J,U[1]=Z,U[2]=K,U[3]=Q,U[4]=W,U[5]=Y,U[6]=$,U[7]=H,U[8]=X,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(J){let Q=this.elements,$=J.elements;return Q[0]=$[0],Q[1]=$[1],Q[2]=$[2],Q[3]=$[3],Q[4]=$[4],Q[5]=$[5],Q[6]=$[6],Q[7]=$[7],Q[8]=$[8],this}extractBasis(J,Q,$){return J.setFromMatrix3Column(this,0),Q.setFromMatrix3Column(this,1),$.setFromMatrix3Column(this,2),this}setFromMatrix4(J){let Q=J.elements;return this.set(Q[0],Q[4],Q[8],Q[1],Q[5],Q[9],Q[2],Q[6],Q[10]),this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,Q){let $=J.elements,Z=Q.elements,W=this.elements,H=$[0],K=$[3],Y=$[6],X=$[1],U=$[4],G=$[7],q=$[2],E=$[5],F=$[8],k=Z[0],B=Z[3],O=Z[6],N=Z[1],_=Z[4],C=Z[7],D=Z[2],P=Z[5],I=Z[8];return W[0]=H*k+K*N+Y*D,W[3]=H*B+K*_+Y*P,W[6]=H*O+K*C+Y*I,W[1]=X*k+U*N+G*D,W[4]=X*B+U*_+G*P,W[7]=X*O+U*C+G*I,W[2]=q*k+E*N+F*D,W[5]=q*B+E*_+F*P,W[8]=q*O+E*C+F*I,this}multiplyScalar(J){let Q=this.elements;return Q[0]*=J,Q[3]*=J,Q[6]*=J,Q[1]*=J,Q[4]*=J,Q[7]*=J,Q[2]*=J,Q[5]*=J,Q[8]*=J,this}determinant(){let J=this.elements,Q=J[0],$=J[1],Z=J[2],W=J[3],H=J[4],K=J[5],Y=J[6],X=J[7],U=J[8];return Q*H*U-Q*K*X-$*W*U+$*K*Y+Z*W*X-Z*H*Y}invert(){let J=this.elements,Q=J[0],$=J[1],Z=J[2],W=J[3],H=J[4],K=J[5],Y=J[6],X=J[7],U=J[8],G=U*H-K*X,q=K*Y-U*W,E=X*W-H*Y,F=Q*G+$*q+Z*E;if(F===0)return this.set(0,0,0,0,0,0,0,0,0);let k=1/F;return J[0]=G*k,J[1]=(Z*X-U*$)*k,J[2]=(K*$-Z*H)*k,J[3]=q*k,J[4]=(U*Q-Z*Y)*k,J[5]=(Z*W-K*Q)*k,J[6]=E*k,J[7]=($*Y-X*Q)*k,J[8]=(H*Q-$*W)*k,this}transpose(){let J,Q=this.elements;return J=Q[1],Q[1]=Q[3],Q[3]=J,J=Q[2],Q[2]=Q[6],Q[6]=J,J=Q[5],Q[5]=Q[7],Q[7]=J,this}getNormalMatrix(J){return this.setFromMatrix4(J).invert().transpose()}transposeIntoArray(J){let Q=this.elements;return J[0]=Q[0],J[1]=Q[3],J[2]=Q[6],J[3]=Q[1],J[4]=Q[4],J[5]=Q[7],J[6]=Q[2],J[7]=Q[5],J[8]=Q[8],this}setUvTransform(J,Q,$,Z,W,H,K){let Y=Math.cos(W),X=Math.sin(W);return this.set($*Y,$*X,-$*(Y*H+X*K)+H+J,-Z*X,Z*Y,-Z*(-X*H+Y*K)+K+Q,0,0,1),this}scale(J,Q){return X8("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(HQ.makeScale(J,Q)),this}rotate(J){return X8("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(HQ.makeRotation(-J)),this}translate(J,Q){return X8("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(HQ.makeTranslation(J,Q)),this}makeTranslation(J,Q){if(J.isVector2)this.set(1,0,J.x,0,1,J.y,0,0,1);else this.set(1,0,J,0,1,Q,0,0,1);return this}makeRotation(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,-$,0,$,Q,0,0,0,1),this}makeScale(J,Q){return this.set(J,0,0,0,Q,0,0,0,1),this}equals(J){let Q=this.elements,$=J.elements;for(let Z=0;Z<9;Z++)if(Q[Z]!==$[Z])return!1;return!0}fromArray(J,Q=0){for(let $=0;$<9;$++)this.elements[$]=J[$+Q];return this}toArray(J=[],Q=0){let $=this.elements;return J[Q]=$[0],J[Q+1]=$[1],J[Q+2]=$[2],J[Q+3]=$[3],J[Q+4]=$[4],J[Q+5]=$[5],J[Q+6]=$[6],J[Q+7]=$[7],J[Q+8]=$[8],J}clone(){return new this.constructor().fromArray(this.elements)}}var HQ=new T0,vZ=new T0().set(0.4123908,0.3575843,0.1804808,0.212639,0.7151687,0.0721923,0.0193308,0.1191948,0.9505322),yZ=new T0().set(3.2409699,-1.5373832,-0.4986108,-0.9692436,1.8759675,0.0415551,0.0556301,-0.203977,1.0569715);function $Y(){let J={enabled:!0,workingColorSpace:"srgb-linear",spaces:{},convert:function(W,H,K){if(this.enabled===!1||H===K||!H||!K)return W;if(this.spaces[H].transfer==="srgb")W.r=S9(W.r),W.g=S9(W.g),W.b=S9(W.b);if(this.spaces[H].primaries!==this.spaces[K].primaries)W.applyMatrix3(this.spaces[H].toXYZ),W.applyMatrix3(this.spaces[K].fromXYZ);if(this.spaces[K].transfer==="srgb")W.r=p8(W.r),W.g=p8(W.g),W.b=p8(W.b);return W},workingToColorSpace:function(W,H){return this.convert(W,this.workingColorSpace,H)},colorSpaceToWorking:function(W,H){return this.convert(W,H,this.workingColorSpace)},getPrimaries:function(W){return this.spaces[W].primaries},getTransfer:function(W){if(W==="")return"linear";return this.spaces[W].transfer},getToneMappingMode:function(W){return this.spaces[W].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(W,H=this.workingColorSpace){return W.fromArray(this.spaces[H].luminanceCoefficients)},define:function(W){Object.assign(this.spaces,W)},_getMatrix:function(W,H,K){return W.copy(this.spaces[H].toXYZ).multiply(this.spaces[K].fromXYZ)},_getDrawingBufferColorSpace:function(W){return this.spaces[W].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(W=this.workingColorSpace){return this.spaces[W].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(W,H){return X8("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),J.workingToColorSpace(W,H)},toWorkingColorSpace:function(W,H){return X8("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),J.colorSpaceToWorking(W,H)}},Q=[0.64,0.33,0.3,0.6,0.15,0.06],$=[0.2126,0.7152,0.0722],Z=[0.3127,0.329];return J.define({["srgb-linear"]:{primaries:Q,whitePoint:Z,transfer:"linear",toXYZ:vZ,fromXYZ:yZ,luminanceCoefficients:$,workingColorSpaceConfig:{unpackColorSpace:"srgb"},outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}},["srgb"]:{primaries:Q,whitePoint:Z,transfer:"srgb",toXYZ:vZ,fromXYZ:yZ,luminanceCoefficients:$,outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}}}),J}var b0=$Y();function S9(J){return J<0.04045?J*0.0773993808:Math.pow(J*0.9478672986+0.0521327014,2.4)}function p8(J){return J<0.0031308?J*12.92:1.055*Math.pow(J,0.41666)-0.055}var P8;class v${static getDataURL(J,Q="image/png"){if(/^data:/i.test(J.src))return J.src;if(typeof HTMLCanvasElement>"u")return J.src;let $;if(J instanceof HTMLCanvasElement)$=J;else{if(P8===void 0)P8=l8("canvas");P8.width=J.width,P8.height=J.height;let Z=P8.getContext("2d");if(J instanceof ImageData)Z.putImageData(J,0,0);else Z.drawImage(J,0,0,J.width,J.height);$=P8}return $.toDataURL(Q)}static sRGBToLinear(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap){let Q=l8("canvas");Q.width=J.width,Q.height=J.height;let $=Q.getContext("2d");$.drawImage(J,0,0,J.width,J.height);let Z=$.getImageData(0,0,J.width,J.height),W=Z.data;for(let H=0;H<W.length;H++)W[H]=S9(W[H]/255)*255;return $.putImageData(Z,0,0),Q}else if(J.data){let Q=J.data.slice(0);for(let $=0;$<Q.length;$++)if(Q instanceof Uint8Array||Q instanceof Uint8ClampedArray)Q[$]=Math.floor(S9(Q[$]/255)*255);else Q[$]=S9(Q[$]);return{data:Q,width:J.width,height:J.height}}else return M0("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),J}}var ZY=0;class P7{constructor(J=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ZY++}),this.uuid=H9(),this.data=J,this.dataReady=!0,this.version=0}getSize(J){let Q=this.data;if(typeof HTMLVideoElement<"u"&&Q instanceof HTMLVideoElement)J.set(Q.videoWidth,Q.videoHeight,0);else if(typeof VideoFrame<"u"&&Q instanceof VideoFrame)J.set(Q.displayWidth,Q.displayHeight,0);else if(Q!==null)J.set(Q.width,Q.height,Q.depth||0);else J.set(0,0,0);return J}set needsUpdate(J){if(J===!0)this.version++}toJSON(J){let Q=J===void 0||typeof J==="string";if(!Q&&J.images[this.uuid]!==void 0)return J.images[this.uuid];let $={uuid:this.uuid,url:""},Z=this.data;if(Z!==null){let W;if(Array.isArray(Z)){W=[];for(let H=0,K=Z.length;H<K;H++)if(Z[H].isDataTexture)W.push(KQ(Z[H].image));else W.push(KQ(Z[H]))}else W=KQ(Z);$.url=W}if(!Q)J.images[this.uuid]=$;return $}}function KQ(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap)return v$.getDataURL(J);else if(J.data)return{data:Array.from(J.data),width:J.width,height:J.height,type:J.data.constructor.name};else return M0("Texture: Unable to serialize Texture."),{}}var WY=0,YQ=new y;class FJ extends D9{constructor(J=FJ.DEFAULT_IMAGE,Q=FJ.DEFAULT_MAPPING,$=1001,Z=1001,W=1006,H=1008,K=1023,Y=1009,X=FJ.DEFAULT_ANISOTROPY,U=""){super();this.isTexture=!0,Object.defineProperty(this,"id",{value:WY++}),this.uuid=H9(),this.name="",this.source=new P7(J),this.mipmaps=[],this.mapping=Q,this.channel=0,this.wrapS=$,this.wrapT=Z,this.magFilter=W,this.minFilter=H,this.anisotropy=X,this.format=K,this.internalFormat=null,this.type=Y,this.offset=new y0(0,0),this.repeat=new y0(1,1),this.center=new y0(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new T0,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=U,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=J&&J.depth&&J.depth>1?!0:!1,this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(YQ).x}get height(){return this.source.getSize(YQ).y}get depth(){return this.source.getSize(YQ).z}get image(){return this.source.data}set image(J){this.source.data=J}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(J,Q){this.updateRanges.push({start:J,count:Q})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(J){return this.name=J.name,this.source=J.source,this.mipmaps=J.mipmaps.slice(0),this.mapping=J.mapping,this.channel=J.channel,this.wrapS=J.wrapS,this.wrapT=J.wrapT,this.magFilter=J.magFilter,this.minFilter=J.minFilter,this.anisotropy=J.anisotropy,this.format=J.format,this.internalFormat=J.internalFormat,this.type=J.type,this.normalized=J.normalized,this.offset.copy(J.offset),this.repeat.copy(J.repeat),this.center.copy(J.center),this.rotation=J.rotation,this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrix.copy(J.matrix),this.generateMipmaps=J.generateMipmaps,this.premultiplyAlpha=J.premultiplyAlpha,this.flipY=J.flipY,this.unpackAlignment=J.unpackAlignment,this.colorSpace=J.colorSpace,this.renderTarget=J.renderTarget,this.isRenderTargetTexture=J.isRenderTargetTexture,this.isArrayTexture=J.isArrayTexture,this.userData=JSON.parse(JSON.stringify(J.userData)),this.needsUpdate=!0,this}setValues(J){for(let Q in J){let $=J[Q];if($===void 0){M0(`Texture.setValues(): parameter '${Q}' has value of undefined.`);continue}let Z=this[Q];if(Z===void 0){M0(`Texture.setValues(): property '${Q}' does not exist.`);continue}if(Z&&$&&(Z.isVector2&&$.isVector2))Z.copy($);else if(Z&&$&&(Z.isVector3&&$.isVector3))Z.copy($);else if(Z&&$&&(Z.isMatrix3&&$.isMatrix3))Z.copy($);else this[Q]=$}}toJSON(J){let Q=J===void 0||typeof J==="string";if(!Q&&J.textures[this.uuid]!==void 0)return J.textures[this.uuid];let $={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(J).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(Object.keys(this.userData).length>0)$.userData=this.userData;if(!Q)J.textures[this.uuid]=$;return $}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(J){if(this.mapping!==300)return J;if(J.applyMatrix3(this.matrix),J.x<0||J.x>1)switch(this.wrapS){case 1000:J.x=J.x-Math.floor(J.x);break;case 1001:J.x=J.x<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.x)%2)===1)J.x=Math.ceil(J.x)-J.x;else J.x=J.x-Math.floor(J.x);break}if(J.y<0||J.y>1)switch(this.wrapT){case 1000:J.y=J.y-Math.floor(J.y);break;case 1001:J.y=J.y<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.y)%2)===1)J.y=Math.ceil(J.y)-J.y;else J.y=J.y-Math.floor(J.y);break}if(this.flipY)J.y=1-J.y;return J}set needsUpdate(J){if(J===!0)this.version++,this.source.needsUpdate=!0}set needsPMREMUpdate(J){if(J===!0)this.pmremVersion++}}FJ.DEFAULT_IMAGE=null;FJ.DEFAULT_MAPPING=300;FJ.DEFAULT_ANISOTROPY=1;class a0{static{a0.prototype.isVector4=!0}constructor(J=0,Q=0,$=0,Z=1){this.x=J,this.y=Q,this.z=$,this.w=Z}get width(){return this.z}set width(J){this.z=J}get height(){return this.w}set height(J){this.w=J}set(J,Q,$,Z){return this.x=J,this.y=Q,this.z=$,this.w=Z,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this.w=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setW(J){return this.w=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;case 2:this.z=Q;break;case 3:this.w=Q;break;default:throw Error("THREE.Vector4: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error("THREE.Vector4: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this.w=J.w!==void 0?J.w:1,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this.w+=J.w,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this.w+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this.z=J.z+Q.z,this.w=J.w+Q.w,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this.z+=J.z*Q,this.w+=J.w*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this.w-=J.w,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this.w-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this.z=J.z-Q.z,this.w=J.w-Q.w,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this.w*=J.w,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this.w*=J,this}applyMatrix4(J){let Q=this.x,$=this.y,Z=this.z,W=this.w,H=J.elements;return this.x=H[0]*Q+H[4]*$+H[8]*Z+H[12]*W,this.y=H[1]*Q+H[5]*$+H[9]*Z+H[13]*W,this.z=H[2]*Q+H[6]*$+H[10]*Z+H[14]*W,this.w=H[3]*Q+H[7]*$+H[11]*Z+H[15]*W,this}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this.w/=J.w,this}divideScalar(J){return this.multiplyScalar(1/J)}setAxisAngleFromQuaternion(J){this.w=2*Math.acos(J.w);let Q=Math.sqrt(1-J.w*J.w);if(Q<0.0001)this.x=1,this.y=0,this.z=0;else this.x=J.x/Q,this.y=J.y/Q,this.z=J.z/Q;return this}setAxisAngleFromRotationMatrix(J){let Q,$,Z,W,H=0.01,K=0.1,Y=J.elements,X=Y[0],U=Y[4],G=Y[8],q=Y[1],E=Y[5],F=Y[9],k=Y[2],B=Y[6],O=Y[10];if(Math.abs(U-q)<0.01&&Math.abs(G-k)<0.01&&Math.abs(F-B)<0.01){if(Math.abs(U+q)<0.1&&Math.abs(G+k)<0.1&&Math.abs(F+B)<0.1&&Math.abs(X+E+O-3)<0.1)return this.set(1,0,0,0),this;Q=Math.PI;let _=(X+1)/2,C=(E+1)/2,D=(O+1)/2,P=(U+q)/4,I=(G+k)/4,w=(F+B)/4;if(_>C&&_>D)if(_<0.01)$=0,Z=0.707106781,W=0.707106781;else $=Math.sqrt(_),Z=P/$,W=I/$;else if(C>D)if(C<0.01)$=0.707106781,Z=0,W=0.707106781;else Z=Math.sqrt(C),$=P/Z,W=w/Z;else if(D<0.01)$=0.707106781,Z=0.707106781,W=0;else W=Math.sqrt(D),$=I/W,Z=w/W;return this.set($,Z,W,Q),this}let N=Math.sqrt((B-F)*(B-F)+(G-k)*(G-k)+(q-U)*(q-U));if(Math.abs(N)<0.001)N=1;return this.x=(B-F)/N,this.y=(G-k)/N,this.z=(q-U)/N,this.w=Math.acos((X+E+O-1)/2),this}setFromMatrixPosition(J){let Q=J.elements;return this.x=Q[12],this.y=Q[13],this.z=Q[14],this.w=Q[15],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this.w=Math.min(this.w,J.w),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this.w=Math.max(this.w,J.w),this}clamp(J,Q){return this.x=p0(this.x,J.x,Q.x),this.y=p0(this.y,J.y,Q.y),this.z=p0(this.z,J.z,Q.z),this.w=p0(this.w,J.w,Q.w),this}clampScalar(J,Q){return this.x=p0(this.x,J,Q),this.y=p0(this.y,J,Q),this.z=p0(this.z,J,Q),this.w=p0(this.w,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(p0($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z+this.w*J.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this.z+=(J.z-this.z)*Q,this.w+=(J.w-this.w)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this.z=J.z+(Q.z-J.z)*$,this.w=J.w+(Q.w-J.w)*$,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z&&J.w===this.w}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this.z=J[Q+2],this.w=J[Q+3],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J[Q+2]=this.z,J[Q+3]=this.w,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this.z=J.getZ(Q),this.w=J.getW(Q),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class y$ extends D9{constructor(J=1,Q=1,$={}){super();$=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},$),this.isRenderTarget=!0,this.width=J,this.height=Q,this.depth=$.depth,this.scissor=new a0(0,0,J,Q),this.scissorTest=!1,this.viewport=new a0(0,0,J,Q),this.textures=[];let Z={width:J,height:Q,depth:$.depth},W=new FJ(Z),H=$.count;for(let K=0;K<H;K++)this.textures[K]=W.clone(),this.textures[K].isRenderTargetTexture=!0,this.textures[K].renderTarget=this;this._setTextureOptions($),this.depthBuffer=$.depthBuffer,this.stencilBuffer=$.stencilBuffer,this.resolveDepthBuffer=$.resolveDepthBuffer,this.resolveStencilBuffer=$.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=$.depthTexture,this.samples=$.samples,this.multiview=$.multiview,this.useArrayDepthTexture=$.useArrayDepthTexture}_setTextureOptions(J={}){let Q={minFilter:1006,generateMipmaps:!1,flipY:!1,internalFormat:null};if(J.mapping!==void 0)Q.mapping=J.mapping;if(J.wrapS!==void 0)Q.wrapS=J.wrapS;if(J.wrapT!==void 0)Q.wrapT=J.wrapT;if(J.wrapR!==void 0)Q.wrapR=J.wrapR;if(J.magFilter!==void 0)Q.magFilter=J.magFilter;if(J.minFilter!==void 0)Q.minFilter=J.minFilter;if(J.format!==void 0)Q.format=J.format;if(J.type!==void 0)Q.type=J.type;if(J.anisotropy!==void 0)Q.anisotropy=J.anisotropy;if(J.colorSpace!==void 0)Q.colorSpace=J.colorSpace;if(J.flipY!==void 0)Q.flipY=J.flipY;if(J.generateMipmaps!==void 0)Q.generateMipmaps=J.generateMipmaps;if(J.internalFormat!==void 0)Q.internalFormat=J.internalFormat;for(let $=0;$<this.textures.length;$++)this.textures[$].setValues(Q)}get texture(){return this.textures[0]}set texture(J){this.textures[0]=J}set depthTexture(J){if(this._depthTexture!==null)this._depthTexture.renderTarget=null;if(J!==null)J.renderTarget=this;this._depthTexture=J}get depthTexture(){return this._depthTexture}setSize(J,Q,$=1){if(this.width!==J||this.height!==Q||this.depth!==$){this.width=J,this.height=Q,this.depth=$;for(let Z=0,W=this.textures.length;Z<W;Z++)if(this.textures[Z].image.width=J,this.textures[Z].image.height=Q,this.textures[Z].image.depth=$,this.textures[Z].isData3DTexture!==!0)this.textures[Z].isArrayTexture=this.textures[Z].image.depth>1;this.dispose()}this.viewport.set(0,0,J,Q),this.scissor.set(0,0,J,Q)}clone(){return new this.constructor().copy(this)}copy(J){this.width=J.width,this.height=J.height,this.depth=J.depth,this.scissor.copy(J.scissor),this.scissorTest=J.scissorTest,this.viewport.copy(J.viewport),this.textures.length=0;for(let Q=0,$=J.textures.length;Q<$;Q++){this.textures[Q]=J.textures[Q].clone(),this.textures[Q].isRenderTargetTexture=!0,this.textures[Q].renderTarget=this;let Z=Object.assign({},J.textures[Q].image);this.textures[Q].source=new P7(Z)}if(this.depthBuffer=J.depthBuffer,this.stencilBuffer=J.stencilBuffer,this.resolveDepthBuffer=J.resolveDepthBuffer,this.resolveStencilBuffer=J.resolveStencilBuffer,J.depthTexture!==null)this.depthTexture=J.depthTexture.clone();return this.samples=J.samples,this.multiview=J.multiview,this.useArrayDepthTexture=J.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class rJ extends y${constructor(J=1,Q=1,$={}){super(J,Q,$);this.isWebGLRenderTarget=!0}}class S6 extends FJ{constructor(J=null,Q=1,$=1,Z=1){super(null);this.isDataArrayTexture=!0,this.image={data:J,width:Q,height:$,depth:Z},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(J){this.layerUpdates.add(J)}clearLayerUpdates(){this.layerUpdates.clear()}}class h$ extends FJ{constructor(J=null,Q=1,$=1,Z=1){super(null);this.isData3DTexture=!0,this.image={data:J,width:Q,height:$,depth:Z},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class j0{static{j0.prototype.isMatrix4=!0}constructor(J,Q,$,Z,W,H,K,Y,X,U,G,q,E,F,k,B){if(this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],J!==void 0)this.set(J,Q,$,Z,W,H,K,Y,X,U,G,q,E,F,k,B)}set(J,Q,$,Z,W,H,K,Y,X,U,G,q,E,F,k,B){let O=this.elements;return O[0]=J,O[4]=Q,O[8]=$,O[12]=Z,O[1]=W,O[5]=H,O[9]=K,O[13]=Y,O[2]=X,O[6]=U,O[10]=G,O[14]=q,O[3]=E,O[7]=F,O[11]=k,O[15]=B,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new j0().fromArray(this.elements)}copy(J){let Q=this.elements,$=J.elements;return Q[0]=$[0],Q[1]=$[1],Q[2]=$[2],Q[3]=$[3],Q[4]=$[4],Q[5]=$[5],Q[6]=$[6],Q[7]=$[7],Q[8]=$[8],Q[9]=$[9],Q[10]=$[10],Q[11]=$[11],Q[12]=$[12],Q[13]=$[13],Q[14]=$[14],Q[15]=$[15],this}copyPosition(J){let Q=this.elements,$=J.elements;return Q[12]=$[12],Q[13]=$[13],Q[14]=$[14],this}setFromMatrix3(J){let Q=J.elements;return this.set(Q[0],Q[3],Q[6],0,Q[1],Q[4],Q[7],0,Q[2],Q[5],Q[8],0,0,0,0,1),this}extractBasis(J,Q,$){if(this.determinantAffine()===0)return J.set(1,0,0),Q.set(0,1,0),$.set(0,0,1),this;return J.setFromMatrixColumn(this,0),Q.setFromMatrixColumn(this,1),$.setFromMatrixColumn(this,2),this}makeBasis(J,Q,$){return this.set(J.x,Q.x,$.x,0,J.y,Q.y,$.y,0,J.z,Q.z,$.z,0,0,0,0,1),this}extractRotation(J){if(J.determinantAffine()===0)return this.identity();let Q=this.elements,$=J.elements,Z=1/I8.setFromMatrixColumn(J,0).length(),W=1/I8.setFromMatrixColumn(J,1).length(),H=1/I8.setFromMatrixColumn(J,2).length();return Q[0]=$[0]*Z,Q[1]=$[1]*Z,Q[2]=$[2]*Z,Q[3]=0,Q[4]=$[4]*W,Q[5]=$[5]*W,Q[6]=$[6]*W,Q[7]=0,Q[8]=$[8]*H,Q[9]=$[9]*H,Q[10]=$[10]*H,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,this}makeRotationFromEuler(J){let Q=this.elements,$=J.x,Z=J.y,W=J.z,H=Math.cos($),K=Math.sin($),Y=Math.cos(Z),X=Math.sin(Z),U=Math.cos(W),G=Math.sin(W);if(J.order==="XYZ"){let q=H*U,E=H*G,F=K*U,k=K*G;Q[0]=Y*U,Q[4]=-Y*G,Q[8]=X,Q[1]=E+F*X,Q[5]=q-k*X,Q[9]=-K*Y,Q[2]=k-q*X,Q[6]=F+E*X,Q[10]=H*Y}else if(J.order==="YXZ"){let q=Y*U,E=Y*G,F=X*U,k=X*G;Q[0]=q+k*K,Q[4]=F*K-E,Q[8]=H*X,Q[1]=H*G,Q[5]=H*U,Q[9]=-K,Q[2]=E*K-F,Q[6]=k+q*K,Q[10]=H*Y}else if(J.order==="ZXY"){let q=Y*U,E=Y*G,F=X*U,k=X*G;Q[0]=q-k*K,Q[4]=-H*G,Q[8]=F+E*K,Q[1]=E+F*K,Q[5]=H*U,Q[9]=k-q*K,Q[2]=-H*X,Q[6]=K,Q[10]=H*Y}else if(J.order==="ZYX"){let q=H*U,E=H*G,F=K*U,k=K*G;Q[0]=Y*U,Q[4]=F*X-E,Q[8]=q*X+k,Q[1]=Y*G,Q[5]=k*X+q,Q[9]=E*X-F,Q[2]=-X,Q[6]=K*Y,Q[10]=H*Y}else if(J.order==="YZX"){let q=H*Y,E=H*X,F=K*Y,k=K*X;Q[0]=Y*U,Q[4]=k-q*G,Q[8]=F*G+E,Q[1]=G,Q[5]=H*U,Q[9]=-K*U,Q[2]=-X*U,Q[6]=E*G+F,Q[10]=q-k*G}else if(J.order==="XZY"){let q=H*Y,E=H*X,F=K*Y,k=K*X;Q[0]=Y*U,Q[4]=-G,Q[8]=X*U,Q[1]=q*G+k,Q[5]=H*U,Q[9]=E*G-F,Q[2]=F*G-E,Q[6]=K*U,Q[10]=k*G+q}return Q[3]=0,Q[7]=0,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,this}makeRotationFromQuaternion(J){return this.compose(HY,J,KY)}lookAt(J,Q,$){let Z=this.elements;if(xJ.subVectors(J,Q),xJ.lengthSq()===0)xJ.z=1;if(xJ.normalize(),p9.crossVectors($,xJ),p9.lengthSq()===0){if(Math.abs($.z)===1)xJ.x+=0.0001;else xJ.z+=0.0001;xJ.normalize(),p9.crossVectors($,xJ)}return p9.normalize(),u7.crossVectors(xJ,p9),Z[0]=p9.x,Z[4]=u7.x,Z[8]=xJ.x,Z[1]=p9.y,Z[5]=u7.y,Z[9]=xJ.y,Z[2]=p9.z,Z[6]=u7.z,Z[10]=xJ.z,this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,Q){let $=J.elements,Z=Q.elements,W=this.elements,H=$[0],K=$[4],Y=$[8],X=$[12],U=$[1],G=$[5],q=$[9],E=$[13],F=$[2],k=$[6],B=$[10],O=$[14],N=$[3],_=$[7],C=$[11],D=$[15],P=Z[0],I=Z[4],w=Z[8],L=Z[12],z=Z[1],g=Z[5],A=Z[9],m=Z[13],a=Z[2],p=Z[6],n=Z[10],u=Z[14],h=Z[3],o=Z[7],r=Z[11],W0=Z[15];return W[0]=H*P+K*z+Y*a+X*h,W[4]=H*I+K*g+Y*p+X*o,W[8]=H*w+K*A+Y*n+X*r,W[12]=H*L+K*m+Y*u+X*W0,W[1]=U*P+G*z+q*a+E*h,W[5]=U*I+G*g+q*p+E*o,W[9]=U*w+G*A+q*n+E*r,W[13]=U*L+G*m+q*u+E*W0,W[2]=F*P+k*z+B*a+O*h,W[6]=F*I+k*g+B*p+O*o,W[10]=F*w+k*A+B*n+O*r,W[14]=F*L+k*m+B*u+O*W0,W[3]=N*P+_*z+C*a+D*h,W[7]=N*I+_*g+C*p+D*o,W[11]=N*w+_*A+C*n+D*r,W[15]=N*L+_*m+C*u+D*W0,this}multiplyScalar(J){let Q=this.elements;return Q[0]*=J,Q[4]*=J,Q[8]*=J,Q[12]*=J,Q[1]*=J,Q[5]*=J,Q[9]*=J,Q[13]*=J,Q[2]*=J,Q[6]*=J,Q[10]*=J,Q[14]*=J,Q[3]*=J,Q[7]*=J,Q[11]*=J,Q[15]*=J,this}determinant(){let J=this.elements,Q=J[0],$=J[4],Z=J[8],W=J[12],H=J[1],K=J[5],Y=J[9],X=J[13],U=J[2],G=J[6],q=J[10],E=J[14],F=J[3],k=J[7],B=J[11],O=J[15],N=Y*E-X*q,_=K*E-X*G,C=K*q-Y*G,D=H*E-X*U,P=H*q-Y*U,I=H*G-K*U;return Q*(k*N-B*_+O*C)-$*(F*N-B*D+O*P)+Z*(F*_-k*D+O*I)-W*(F*C-k*P+B*I)}determinantAffine(){let J=this.elements,Q=J[0],$=J[4],Z=J[8],W=J[1],H=J[5],K=J[9],Y=J[2],X=J[6],U=J[10];return Q*(H*U-K*X)-$*(W*U-K*Y)+Z*(W*X-H*Y)}transpose(){let J=this.elements,Q;return Q=J[1],J[1]=J[4],J[4]=Q,Q=J[2],J[2]=J[8],J[8]=Q,Q=J[6],J[6]=J[9],J[9]=Q,Q=J[3],J[3]=J[12],J[12]=Q,Q=J[7],J[7]=J[13],J[13]=Q,Q=J[11],J[11]=J[14],J[14]=Q,this}setPosition(J,Q,$){let Z=this.elements;if(J.isVector3)Z[12]=J.x,Z[13]=J.y,Z[14]=J.z;else Z[12]=J,Z[13]=Q,Z[14]=$;return this}invert(){let J=this.elements,Q=J[0],$=J[1],Z=J[2],W=J[3],H=J[4],K=J[5],Y=J[6],X=J[7],U=J[8],G=J[9],q=J[10],E=J[11],F=J[12],k=J[13],B=J[14],O=J[15],N=Q*K-$*H,_=Q*Y-Z*H,C=Q*X-W*H,D=$*Y-Z*K,P=$*X-W*K,I=Z*X-W*Y,w=U*k-G*F,L=U*B-q*F,z=U*O-E*F,g=G*B-q*k,A=G*O-E*k,m=q*O-E*B,a=N*m-_*A+C*g+D*z-P*L+I*w;if(a===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let p=1/a;return J[0]=(K*m-Y*A+X*g)*p,J[1]=(Z*A-$*m-W*g)*p,J[2]=(k*I-B*P+O*D)*p,J[3]=(q*P-G*I-E*D)*p,J[4]=(Y*z-H*m-X*L)*p,J[5]=(Q*m-Z*z+W*L)*p,J[6]=(B*C-F*I-O*_)*p,J[7]=(U*I-q*C+E*_)*p,J[8]=(H*A-K*z+X*w)*p,J[9]=($*z-Q*A-W*w)*p,J[10]=(F*P-k*C+O*N)*p,J[11]=(G*C-U*P-E*N)*p,J[12]=(K*L-H*g-Y*w)*p,J[13]=(Q*g-$*L+Z*w)*p,J[14]=(k*_-F*D-B*N)*p,J[15]=(U*D-G*_+q*N)*p,this}scale(J){let Q=this.elements,$=J.x,Z=J.y,W=J.z;return Q[0]*=$,Q[4]*=Z,Q[8]*=W,Q[1]*=$,Q[5]*=Z,Q[9]*=W,Q[2]*=$,Q[6]*=Z,Q[10]*=W,Q[3]*=$,Q[7]*=Z,Q[11]*=W,this}getMaxScaleOnAxis(){let J=this.elements,Q=J[0]*J[0]+J[1]*J[1]+J[2]*J[2],$=J[4]*J[4]+J[5]*J[5]+J[6]*J[6],Z=J[8]*J[8]+J[9]*J[9]+J[10]*J[10];return Math.sqrt(Math.max(Q,$,Z))}makeTranslation(J,Q,$){if(J.isVector3)this.set(1,0,0,J.x,0,1,0,J.y,0,0,1,J.z,0,0,0,1);else this.set(1,0,0,J,0,1,0,Q,0,0,1,$,0,0,0,1);return this}makeRotationX(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(1,0,0,0,0,Q,-$,0,0,$,Q,0,0,0,0,1),this}makeRotationY(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,0,$,0,0,1,0,0,-$,0,Q,0,0,0,0,1),this}makeRotationZ(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,-$,0,0,$,Q,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(J,Q){let $=Math.cos(Q),Z=Math.sin(Q),W=1-$,H=J.x,K=J.y,Y=J.z,X=W*H,U=W*K;return this.set(X*H+$,X*K-Z*Y,X*Y+Z*K,0,X*K+Z*Y,U*K+$,U*Y-Z*H,0,X*Y-Z*K,U*Y+Z*H,W*Y*Y+$,0,0,0,0,1),this}makeScale(J,Q,$){return this.set(J,0,0,0,0,Q,0,0,0,0,$,0,0,0,0,1),this}makeShear(J,Q,$,Z,W,H){return this.set(1,$,W,0,J,1,H,0,Q,Z,1,0,0,0,0,1),this}compose(J,Q,$){let Z=this.elements,W=Q._x,H=Q._y,K=Q._z,Y=Q._w,X=W+W,U=H+H,G=K+K,q=W*X,E=W*U,F=W*G,k=H*U,B=H*G,O=K*G,N=Y*X,_=Y*U,C=Y*G,D=$.x,P=$.y,I=$.z;return Z[0]=(1-(k+O))*D,Z[1]=(E+C)*D,Z[2]=(F-_)*D,Z[3]=0,Z[4]=(E-C)*P,Z[5]=(1-(q+O))*P,Z[6]=(B+N)*P,Z[7]=0,Z[8]=(F+_)*I,Z[9]=(B-N)*I,Z[10]=(1-(q+k))*I,Z[11]=0,Z[12]=J.x,Z[13]=J.y,Z[14]=J.z,Z[15]=1,this}decompose(J,Q,$){let Z=this.elements;J.x=Z[12],J.y=Z[13],J.z=Z[14];let W=this.determinantAffine();if(W===0)return $.set(1,1,1),Q.identity(),this;let H=I8.set(Z[0],Z[1],Z[2]).length(),K=I8.set(Z[4],Z[5],Z[6]).length(),Y=I8.set(Z[8],Z[9],Z[10]).length();if(W<0)H=-H;Q9.copy(this);let X=1/H,U=1/K,G=1/Y;return Q9.elements[0]*=X,Q9.elements[1]*=X,Q9.elements[2]*=X,Q9.elements[4]*=U,Q9.elements[5]*=U,Q9.elements[6]*=U,Q9.elements[8]*=G,Q9.elements[9]*=G,Q9.elements[10]*=G,Q.setFromRotationMatrix(Q9),$.x=H,$.y=K,$.z=Y,this}makePerspective(J,Q,$,Z,W,H,K=2000,Y=!1){let X=this.elements,U=2*W/(Q-J),G=2*W/($-Z),q=(Q+J)/(Q-J),E=($+Z)/($-Z),F,k;if(Y)F=W/(H-W),k=H*W/(H-W);else if(K===2000)F=-(H+W)/(H-W),k=-2*H*W/(H-W);else if(K===2001)F=-H/(H-W),k=-H*W/(H-W);else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+K);return X[0]=U,X[4]=0,X[8]=q,X[12]=0,X[1]=0,X[5]=G,X[9]=E,X[13]=0,X[2]=0,X[6]=0,X[10]=F,X[14]=k,X[3]=0,X[7]=0,X[11]=-1,X[15]=0,this}makeOrthographic(J,Q,$,Z,W,H,K=2000,Y=!1){let X=this.elements,U=2/(Q-J),G=2/($-Z),q=-(Q+J)/(Q-J),E=-($+Z)/($-Z),F,k;if(Y)F=1/(H-W),k=H/(H-W);else if(K===2000)F=-2/(H-W),k=-(H+W)/(H-W);else if(K===2001)F=-1/(H-W),k=-W/(H-W);else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+K);return X[0]=U,X[4]=0,X[8]=0,X[12]=q,X[1]=0,X[5]=G,X[9]=0,X[13]=E,X[2]=0,X[6]=0,X[10]=F,X[14]=k,X[3]=0,X[7]=0,X[11]=0,X[15]=1,this}equals(J){let Q=this.elements,$=J.elements;for(let Z=0;Z<16;Z++)if(Q[Z]!==$[Z])return!1;return!0}fromArray(J,Q=0){for(let $=0;$<16;$++)this.elements[$]=J[$+Q];return this}toArray(J=[],Q=0){let $=this.elements;return J[Q]=$[0],J[Q+1]=$[1],J[Q+2]=$[2],J[Q+3]=$[3],J[Q+4]=$[4],J[Q+5]=$[5],J[Q+6]=$[6],J[Q+7]=$[7],J[Q+8]=$[8],J[Q+9]=$[9],J[Q+10]=$[10],J[Q+11]=$[11],J[Q+12]=$[12],J[Q+13]=$[13],J[Q+14]=$[14],J[Q+15]=$[15],J}}var I8=new y,Q9=new j0,HY=new y(0,0,0),KY=new y(1,1,1),p9=new y,u7=new y,xJ=new y,hZ=new j0,fZ=new vJ;class F9{constructor(J=0,Q=0,$=0,Z=F9.DEFAULT_ORDER){this.isEuler=!0,this._x=J,this._y=Q,this._z=$,this._order=Z}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get order(){return this._order}set order(J){this._order=J,this._onChangeCallback()}set(J,Q,$,Z=this._order){return this._x=J,this._y=Q,this._z=$,this._order=Z,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(J){return this._x=J._x,this._y=J._y,this._z=J._z,this._order=J._order,this._onChangeCallback(),this}setFromRotationMatrix(J,Q=this._order,$=!0){let Z=J.elements,W=Z[0],H=Z[4],K=Z[8],Y=Z[1],X=Z[5],U=Z[9],G=Z[2],q=Z[6],E=Z[10];switch(Q){case"XYZ":if(this._y=Math.asin(p0(K,-1,1)),Math.abs(K)<0.9999999)this._x=Math.atan2(-U,E),this._z=Math.atan2(-H,W);else this._x=Math.atan2(q,X),this._z=0;break;case"YXZ":if(this._x=Math.asin(-p0(U,-1,1)),Math.abs(U)<0.9999999)this._y=Math.atan2(K,E),this._z=Math.atan2(Y,X);else this._y=Math.atan2(-G,W),this._z=0;break;case"ZXY":if(this._x=Math.asin(p0(q,-1,1)),Math.abs(q)<0.9999999)this._y=Math.atan2(-G,E),this._z=Math.atan2(-H,X);else this._y=0,this._z=Math.atan2(Y,W);break;case"ZYX":if(this._y=Math.asin(-p0(G,-1,1)),Math.abs(G)<0.9999999)this._x=Math.atan2(q,E),this._z=Math.atan2(Y,W);else this._x=0,this._z=Math.atan2(-H,X);break;case"YZX":if(this._z=Math.asin(p0(Y,-1,1)),Math.abs(Y)<0.9999999)this._x=Math.atan2(-U,X),this._y=Math.atan2(-G,W);else this._x=0,this._y=Math.atan2(K,E);break;case"XZY":if(this._z=Math.asin(-p0(H,-1,1)),Math.abs(H)<0.9999999)this._x=Math.atan2(q,X),this._y=Math.atan2(K,W);else this._x=Math.atan2(-U,E),this._y=0;break;default:M0("Euler: .setFromRotationMatrix() encountered an unknown order: "+Q)}if(this._order=Q,$===!0)this._onChangeCallback();return this}setFromQuaternion(J,Q,$){return hZ.makeRotationFromQuaternion(J),this.setFromRotationMatrix(hZ,Q,$)}setFromVector3(J,Q=this._order){return this.set(J.x,J.y,J.z,Q)}reorder(J){return fZ.setFromEuler(this),this.setFromQuaternion(fZ,J)}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._order===this._order}fromArray(J){if(this._x=J[0],this._y=J[1],this._z=J[2],J[3]!==void 0)this._order=J[3];return this._onChangeCallback(),this}toArray(J=[],Q=0){return J[Q]=this._x,J[Q+1]=this._y,J[Q+2]=this._z,J[Q+3]=this._order,J}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}F9.DEFAULT_ORDER="XYZ";class j6{constructor(){this.mask=1}set(J){this.mask=(1<<J|0)>>>0}enable(J){this.mask|=1<<J|0}enableAll(){this.mask=-1}toggle(J){this.mask^=1<<J|0}disable(J){this.mask&=~(1<<J|0)}disableAll(){this.mask=0}test(J){return(this.mask&J.mask)!==0}isEnabled(J){return(this.mask&(1<<J|0))!==0}}var YY=0,bZ=new y,w8=new vJ,_9=new j0,c7=new y,U7=new y,XY=new y,UY=new vJ,xZ=new y(1,0,0),gZ=new y(0,1,0),pZ=new y(0,0,1),lZ={type:"added"},GY={type:"removed"},A8={type:"childadded",child:null},XQ={type:"childremoved",child:null};class t0 extends D9{constructor(){super();this.isObject3D=!0,Object.defineProperty(this,"id",{value:YY++}),this.uuid=H9(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=t0.DEFAULT_UP.clone();let J=new y,Q=new F9,$=new vJ,Z=new y(1,1,1);function W(){$.setFromEuler(Q,!1)}function H(){Q.setFromQuaternion($,void 0,!1)}Q._onChange(W),$._onChange(H),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:J},rotation:{configurable:!0,enumerable:!0,value:Q},quaternion:{configurable:!0,enumerable:!0,value:$},scale:{configurable:!0,enumerable:!0,value:Z},modelViewMatrix:{value:new j0},normalMatrix:{value:new T0}}),this.matrix=new j0,this.matrixWorld=new j0,this.matrixAutoUpdate=t0.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=t0.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new j6,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(J){if(this.matrixAutoUpdate)this.updateMatrix();this.matrix.premultiply(J),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(J){return this.quaternion.premultiply(J),this}setRotationFromAxisAngle(J,Q){this.quaternion.setFromAxisAngle(J,Q)}setRotationFromEuler(J){this.quaternion.setFromEuler(J,!0)}setRotationFromMatrix(J){this.quaternion.setFromRotationMatrix(J)}setRotationFromQuaternion(J){this.quaternion.copy(J)}rotateOnAxis(J,Q){return w8.setFromAxisAngle(J,Q),this.quaternion.multiply(w8),this}rotateOnWorldAxis(J,Q){return w8.setFromAxisAngle(J,Q),this.quaternion.premultiply(w8),this}rotateX(J){return this.rotateOnAxis(xZ,J)}rotateY(J){return this.rotateOnAxis(gZ,J)}rotateZ(J){return this.rotateOnAxis(pZ,J)}translateOnAxis(J,Q){return bZ.copy(J).applyQuaternion(this.quaternion),this.position.add(bZ.multiplyScalar(Q)),this}translateX(J){return this.translateOnAxis(xZ,J)}translateY(J){return this.translateOnAxis(gZ,J)}translateZ(J){return this.translateOnAxis(pZ,J)}localToWorld(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(this.matrixWorld)}worldToLocal(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(_9.copy(this.matrixWorld).invert())}lookAt(J,Q,$){if(J.isVector3)c7.copy(J);else c7.set(J,Q,$);let Z=this.parent;if(this.updateWorldMatrix(!0,!1),U7.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight)_9.lookAt(U7,c7,this.up);else _9.lookAt(c7,U7,this.up);if(this.quaternion.setFromRotationMatrix(_9),Z)_9.extractRotation(Z.matrixWorld),w8.setFromRotationMatrix(_9),this.quaternion.premultiply(w8.invert())}add(J){if(arguments.length>1){for(let Q=0;Q<arguments.length;Q++)this.add(arguments[Q]);return this}if(J===this)return A0("Object3D.add: object can't be added as a child of itself.",J),this;if(J&&J.isObject3D)J.removeFromParent(),J.parent=this,this.children.push(J),J.dispatchEvent(lZ),A8.child=J,this.dispatchEvent(A8),A8.child=null;else A0("Object3D.add: object not an instance of THREE.Object3D.",J);return this}remove(J){if(arguments.length>1){for(let $=0;$<arguments.length;$++)this.remove(arguments[$]);return this}let Q=this.children.indexOf(J);if(Q!==-1)J.parent=null,this.children.splice(Q,1),J.dispatchEvent(GY),XQ.child=J,this.dispatchEvent(XQ),XQ.child=null;return this}removeFromParent(){let J=this.parent;if(J!==null)J.remove(this);return this}clear(){return this.remove(...this.children)}attach(J){if(this.updateWorldMatrix(!0,!1),_9.copy(this.matrixWorld).invert(),J.parent!==null)J.parent.updateWorldMatrix(!0,!1),_9.multiply(J.parent.matrixWorld);return J.applyMatrix4(_9),J.removeFromParent(),J.parent=this,this.children.push(J),J.updateWorldMatrix(!1,!0),J.dispatchEvent(lZ),A8.child=J,this.dispatchEvent(A8),A8.child=null,this}getObjectById(J){return this.getObjectByProperty("id",J)}getObjectByName(J){return this.getObjectByProperty("name",J)}getObjectByProperty(J,Q){if(this[J]===Q)return this;for(let $=0,Z=this.children.length;$<Z;$++){let H=this.children[$].getObjectByProperty(J,Q);if(H!==void 0)return H}return}getObjectsByProperty(J,Q,$=[]){if(this[J]===Q)$.push(this);let Z=this.children;for(let W=0,H=Z.length;W<H;W++)Z[W].getObjectsByProperty(J,Q,$);return $}getWorldPosition(J){return this.updateWorldMatrix(!0,!1),J.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(U7,J,XY),J}getWorldScale(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(U7,UY,J),J}getWorldDirection(J){this.updateWorldMatrix(!0,!1);let Q=this.matrixWorld.elements;return J.set(Q[8],Q[9],Q[10]).normalize()}raycast(){}traverse(J){J(this);let Q=this.children;for(let $=0,Z=Q.length;$<Z;$++)Q[$].traverse(J)}traverseVisible(J){if(this.visible===!1)return;J(this);let Q=this.children;for(let $=0,Z=Q.length;$<Z;$++)Q[$].traverseVisible(J)}traverseAncestors(J){let Q=this.parent;if(Q!==null)J(Q),Q.traverseAncestors(J)}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let J=this.pivot;if(J!==null){let{x:Q,y:$,z:Z}=J,W=this.matrix.elements;W[12]+=Q-W[0]*Q-W[4]*$-W[8]*Z,W[13]+=$-W[1]*Q-W[5]*$-W[9]*Z,W[14]+=Z-W[2]*Q-W[6]*$-W[10]*Z}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(J){if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||J){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,J=!0}let Q=this.children;for(let $=0,Z=Q.length;$<Z;$++)Q[$].updateMatrixWorld(J)}updateWorldMatrix(J,Q,$=!1){let Z=this.parent;if(J===!0&&Z!==null)Z.updateWorldMatrix(!0,!1);if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||$){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,$=!0}if(Q===!0){let W=this.children;for(let H=0,K=W.length;H<K;H++)W[H].updateWorldMatrix(!1,!0,$)}}toJSON(J){let Q=J===void 0||typeof J==="string",$={};if(Q)J={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},$.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"};let Z={};if(Z.uuid=this.uuid,Z.type=this.type,this.name!=="")Z.name=this.name;if(this.castShadow===!0)Z.castShadow=!0;if(this.receiveShadow===!0)Z.receiveShadow=!0;if(this.visible===!1)Z.visible=!1;if(this.frustumCulled===!1)Z.frustumCulled=!1;if(this.renderOrder!==0)Z.renderOrder=this.renderOrder;if(this.static!==!1)Z.static=this.static;if(Object.keys(this.userData).length>0)Z.userData=this.userData;if(Z.layers=this.layers.mask,Z.matrix=this.matrix.toArray(),Z.up=this.up.toArray(),this.pivot!==null)Z.pivot=this.pivot.toArray();if(this.matrixAutoUpdate===!1)Z.matrixAutoUpdate=!1;if(this.morphTargetDictionary!==void 0)Z.morphTargetDictionary=Object.assign({},this.morphTargetDictionary);if(this.morphTargetInfluences!==void 0)Z.morphTargetInfluences=this.morphTargetInfluences.slice();if(this.isInstancedMesh){if(Z.type="InstancedMesh",Z.count=this.count,Z.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null)Z.instanceColor=this.instanceColor.toJSON()}if(this.isBatchedMesh){if(Z.type="BatchedMesh",Z.perObjectFrustumCulled=this.perObjectFrustumCulled,Z.sortObjects=this.sortObjects,Z.drawRanges=this._drawRanges,Z.reservedRanges=this._reservedRanges,Z.geometryInfo=this._geometryInfo.map((K)=>({...K,boundingBox:K.boundingBox?K.boundingBox.toJSON():void 0,boundingSphere:K.boundingSphere?K.boundingSphere.toJSON():void 0})),Z.instanceInfo=this._instanceInfo.map((K)=>({...K})),Z.availableInstanceIds=this._availableInstanceIds.slice(),Z.availableGeometryIds=this._availableGeometryIds.slice(),Z.nextIndexStart=this._nextIndexStart,Z.nextVertexStart=this._nextVertexStart,Z.geometryCount=this._geometryCount,Z.maxInstanceCount=this._maxInstanceCount,Z.maxVertexCount=this._maxVertexCount,Z.maxIndexCount=this._maxIndexCount,Z.geometryInitialized=this._geometryInitialized,Z.matricesTexture=this._matricesTexture.toJSON(J),Z.indirectTexture=this._indirectTexture.toJSON(J),this._colorsTexture!==null)Z.colorsTexture=this._colorsTexture.toJSON(J);if(this.boundingSphere!==null)Z.boundingSphere=this.boundingSphere.toJSON();if(this.boundingBox!==null)Z.boundingBox=this.boundingBox.toJSON()}function W(K,Y){if(K[Y.uuid]===void 0)K[Y.uuid]=Y.toJSON(J);return Y.uuid}if(this.isScene){if(this.background){if(this.background.isColor)Z.background=this.background.toJSON();else if(this.background.isTexture)Z.background=this.background.toJSON(J).uuid}if(this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0)Z.environment=this.environment.toJSON(J).uuid}else if(this.isMesh||this.isLine||this.isPoints){Z.geometry=W(J.geometries,this.geometry);let K=this.geometry.parameters;if(K!==void 0&&K.shapes!==void 0){let Y=K.shapes;if(Array.isArray(Y))for(let X=0,U=Y.length;X<U;X++){let G=Y[X];W(J.shapes,G)}else W(J.shapes,Y)}}if(this.isSkinnedMesh){if(Z.bindMode=this.bindMode,Z.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0)W(J.skeletons,this.skeleton),Z.skeleton=this.skeleton.uuid}if(this.material!==void 0)if(Array.isArray(this.material)){let K=[];for(let Y=0,X=this.material.length;Y<X;Y++)K.push(W(J.materials,this.material[Y]));Z.material=K}else Z.material=W(J.materials,this.material);if(this.children.length>0){Z.children=[];for(let K=0;K<this.children.length;K++)Z.children.push(this.children[K].toJSON(J).object)}if(this.animations.length>0){Z.animations=[];for(let K=0;K<this.animations.length;K++){let Y=this.animations[K];Z.animations.push(W(J.animations,Y))}}if(Q){let K=H(J.geometries),Y=H(J.materials),X=H(J.textures),U=H(J.images),G=H(J.shapes),q=H(J.skeletons),E=H(J.animations),F=H(J.nodes);if(K.length>0)$.geometries=K;if(Y.length>0)$.materials=Y;if(X.length>0)$.textures=X;if(U.length>0)$.images=U;if(G.length>0)$.shapes=G;if(q.length>0)$.skeletons=q;if(E.length>0)$.animations=E;if(F.length>0)$.nodes=F}return $.object=Z,$;function H(K){let Y=[];for(let X in K){let U=K[X];delete U.metadata,Y.push(U)}return Y}}clone(J){return new this.constructor().copy(this,J)}copy(J,Q=!0){if(this.name=J.name,this.up.copy(J.up),this.position.copy(J.position),this.rotation.order=J.rotation.order,this.quaternion.copy(J.quaternion),this.scale.copy(J.scale),this.pivot=J.pivot!==null?J.pivot.clone():null,this.matrix.copy(J.matrix),this.matrixWorld.copy(J.matrixWorld),this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrixWorldAutoUpdate=J.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=J.matrixWorldNeedsUpdate,this.layers.mask=J.layers.mask,this.visible=J.visible,this.castShadow=J.castShadow,this.receiveShadow=J.receiveShadow,this.frustumCulled=J.frustumCulled,this.renderOrder=J.renderOrder,this.static=J.static,this.animations=J.animations.slice(),this.userData=JSON.parse(JSON.stringify(J.userData)),Q===!0)for(let $=0;$<J.children.length;$++){let Z=J.children[$];this.add(Z.clone())}return this}}t0.DEFAULT_UP=new y(0,1,0);t0.DEFAULT_MATRIX_AUTO_UPDATE=!0;t0.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class q9 extends t0{constructor(){super();this.isGroup=!0,this.type="Group"}}var EY={type:"move"};class I7{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){if(this._hand===null)this._hand=new q9,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1};return this._hand}getTargetRaySpace(){if(this._targetRay===null)this._targetRay=new q9,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new y,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new y;return this._targetRay}getGripSpace(){if(this._grip===null)this._grip=new q9,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new y,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new y,this._grip.eventsEnabled=!1;return this._grip}dispatchEvent(J){if(this._targetRay!==null)this._targetRay.dispatchEvent(J);if(this._grip!==null)this._grip.dispatchEvent(J);if(this._hand!==null)this._hand.dispatchEvent(J);return this}connect(J){if(J&&J.hand){let Q=this._hand;if(Q)for(let $ of J.hand.values())this._getHandJoint(Q,$)}return this.dispatchEvent({type:"connected",data:J}),this}disconnect(J){if(this.dispatchEvent({type:"disconnected",data:J}),this._targetRay!==null)this._targetRay.visible=!1;if(this._grip!==null)this._grip.visible=!1;if(this._hand!==null)this._hand.visible=!1;return this}update(J,Q,$){let Z=null,W=null,H=null,K=this._targetRay,Y=this._grip,X=this._hand;if(J&&Q.session.visibilityState!=="visible-blurred"){if(X&&J.hand){H=!0;for(let k of J.hand.values()){let B=Q.getJointPose(k,$),O=this._getHandJoint(X,k);if(B!==null)O.matrix.fromArray(B.transform.matrix),O.matrix.decompose(O.position,O.rotation,O.scale),O.matrixWorldNeedsUpdate=!0,O.jointRadius=B.radius;O.visible=B!==null}let U=X.joints["index-finger-tip"],G=X.joints["thumb-tip"],q=U.position.distanceTo(G.position),E=0.02,F=0.005;if(X.inputState.pinching&&q>E+F)X.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:J.handedness,target:this});else if(!X.inputState.pinching&&q<=E-F)X.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:J.handedness,target:this})}else if(Y!==null&&J.gripSpace){if(W=Q.getPose(J.gripSpace,$),W!==null){if(Y.matrix.fromArray(W.transform.matrix),Y.matrix.decompose(Y.position,Y.rotation,Y.scale),Y.matrixWorldNeedsUpdate=!0,W.linearVelocity)Y.hasLinearVelocity=!0,Y.linearVelocity.copy(W.linearVelocity);else Y.hasLinearVelocity=!1;if(W.angularVelocity)Y.hasAngularVelocity=!0,Y.angularVelocity.copy(W.angularVelocity);else Y.hasAngularVelocity=!1;if(Y.eventsEnabled)Y.dispatchEvent({type:"gripUpdated",data:J,target:this})}}if(K!==null){if(Z=Q.getPose(J.targetRaySpace,$),Z===null&&W!==null)Z=W;if(Z!==null){if(K.matrix.fromArray(Z.transform.matrix),K.matrix.decompose(K.position,K.rotation,K.scale),K.matrixWorldNeedsUpdate=!0,Z.linearVelocity)K.hasLinearVelocity=!0,K.linearVelocity.copy(Z.linearVelocity);else K.hasLinearVelocity=!1;if(Z.angularVelocity)K.hasAngularVelocity=!0,K.angularVelocity.copy(Z.angularVelocity);else K.hasAngularVelocity=!1;this.dispatchEvent(EY)}}}if(K!==null)K.visible=Z!==null;if(Y!==null)Y.visible=W!==null;if(X!==null)X.visible=H!==null;return this}_getHandJoint(J,Q){if(J.joints[Q.jointName]===void 0){let $=new q9;$.matrixAutoUpdate=!1,$.visible=!1,J.joints[Q.jointName]=$,J.add($)}return J.joints[Q.jointName]}}var GH={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},l9={h:0,s:0,l:0},n7={h:0,s:0,l:0};function UQ(J,Q,$){if($<0)$+=1;if($>1)$-=1;if($<0.16666666666666666)return J+(Q-J)*6*$;if($<0.5)return Q;if($<0.6666666666666666)return J+(Q-J)*6*(0.6666666666666666-$);return J}class I0{constructor(J,Q,$){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(J,Q,$)}set(J,Q,$){if(Q===void 0&&$===void 0){let Z=J;if(Z&&Z.isColor)this.copy(Z);else if(typeof Z==="number")this.setHex(Z);else if(typeof Z==="string")this.setStyle(Z)}else this.setRGB(J,Q,$);return this}setScalar(J){return this.r=J,this.g=J,this.b=J,this}setHex(J,Q="srgb"){return J=Math.floor(J),this.r=(J>>16&255)/255,this.g=(J>>8&255)/255,this.b=(J&255)/255,b0.colorSpaceToWorking(this,Q),this}setRGB(J,Q,$,Z=b0.workingColorSpace){return this.r=J,this.g=Q,this.b=$,b0.colorSpaceToWorking(this,Z),this}setHSL(J,Q,$,Z=b0.workingColorSpace){if(J=S$(J,1),Q=p0(Q,0,1),$=p0($,0,1),Q===0)this.r=this.g=this.b=$;else{let W=$<=0.5?$*(1+Q):$+Q-$*Q,H=2*$-W;this.r=UQ(H,W,J+0.3333333333333333),this.g=UQ(H,W,J),this.b=UQ(H,W,J-0.3333333333333333)}return b0.colorSpaceToWorking(this,Z),this}setStyle(J,Q="srgb"){function $(W){if(W===void 0)return;if(parseFloat(W)<1)M0("Color: Alpha component of "+J+" will be ignored.")}let Z;if(Z=/^(\w+)\(([^\)]*)\)/.exec(J)){let W,H=Z[1],K=Z[2];switch(H){case"rgb":case"rgba":if(W=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(K))return $(W[4]),this.setRGB(Math.min(255,parseInt(W[1],10))/255,Math.min(255,parseInt(W[2],10))/255,Math.min(255,parseInt(W[3],10))/255,Q);if(W=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(K))return $(W[4]),this.setRGB(Math.min(100,parseInt(W[1],10))/100,Math.min(100,parseInt(W[2],10))/100,Math.min(100,parseInt(W[3],10))/100,Q);break;case"hsl":case"hsla":if(W=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(K))return $(W[4]),this.setHSL(parseFloat(W[1])/360,parseFloat(W[2])/100,parseFloat(W[3])/100,Q);break;default:M0("Color: Unknown color model "+J)}}else if(Z=/^\#([A-Fa-f\d]+)$/.exec(J)){let W=Z[1],H=W.length;if(H===3)return this.setRGB(parseInt(W.charAt(0),16)/15,parseInt(W.charAt(1),16)/15,parseInt(W.charAt(2),16)/15,Q);else if(H===6)return this.setHex(parseInt(W,16),Q);else M0("Color: Invalid hex color "+J)}else if(J&&J.length>0)return this.setColorName(J,Q);return this}setColorName(J,Q="srgb"){let $=GH[J.toLowerCase()];if($!==void 0)this.setHex($,Q);else M0("Color: Unknown color "+J);return this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(J){return this.r=J.r,this.g=J.g,this.b=J.b,this}copySRGBToLinear(J){return this.r=S9(J.r),this.g=S9(J.g),this.b=S9(J.b),this}copyLinearToSRGB(J){return this.r=p8(J.r),this.g=p8(J.g),this.b=p8(J.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(J="srgb"){return b0.workingToColorSpace(AJ.copy(this),J),Math.round(p0(AJ.r*255,0,255))*65536+Math.round(p0(AJ.g*255,0,255))*256+Math.round(p0(AJ.b*255,0,255))}getHexString(J="srgb"){return("000000"+this.getHex(J).toString(16)).slice(-6)}getHSL(J,Q=b0.workingColorSpace){b0.workingToColorSpace(AJ.copy(this),Q);let{r:$,g:Z,b:W}=AJ,H=Math.max($,Z,W),K=Math.min($,Z,W),Y,X,U=(K+H)/2;if(K===H)Y=0,X=0;else{let G=H-K;switch(X=U<=0.5?G/(H+K):G/(2-H-K),H){case $:Y=(Z-W)/G+(Z<W?6:0);break;case Z:Y=(W-$)/G+2;break;case W:Y=($-Z)/G+4;break}Y/=6}return J.h=Y,J.s=X,J.l=U,J}getRGB(J,Q=b0.workingColorSpace){return b0.workingToColorSpace(AJ.copy(this),Q),J.r=AJ.r,J.g=AJ.g,J.b=AJ.b,J}getStyle(J="srgb"){b0.workingToColorSpace(AJ.copy(this),J);let{r:Q,g:$,b:Z}=AJ;if(J!=="srgb")return`color(${J} ${Q.toFixed(3)} ${$.toFixed(3)} ${Z.toFixed(3)})`;return`rgb(${Math.round(Q*255)},${Math.round($*255)},${Math.round(Z*255)})`}offsetHSL(J,Q,$){return this.getHSL(l9),this.setHSL(l9.h+J,l9.s+Q,l9.l+$)}add(J){return this.r+=J.r,this.g+=J.g,this.b+=J.b,this}addColors(J,Q){return this.r=J.r+Q.r,this.g=J.g+Q.g,this.b=J.b+Q.b,this}addScalar(J){return this.r+=J,this.g+=J,this.b+=J,this}sub(J){return this.r=Math.max(0,this.r-J.r),this.g=Math.max(0,this.g-J.g),this.b=Math.max(0,this.b-J.b),this}multiply(J){return this.r*=J.r,this.g*=J.g,this.b*=J.b,this}multiplyScalar(J){return this.r*=J,this.g*=J,this.b*=J,this}lerp(J,Q){return this.r+=(J.r-this.r)*Q,this.g+=(J.g-this.g)*Q,this.b+=(J.b-this.b)*Q,this}lerpColors(J,Q,$){return this.r=J.r+(Q.r-J.r)*$,this.g=J.g+(Q.g-J.g)*$,this.b=J.b+(Q.b-J.b)*$,this}lerpHSL(J,Q){this.getHSL(l9),J.getHSL(n7);let $=L7(l9.h,n7.h,Q),Z=L7(l9.s,n7.s,Q),W=L7(l9.l,n7.l,Q);return this.setHSL($,Z,W),this}setFromVector3(J){return this.r=J.x,this.g=J.y,this.b=J.z,this}applyMatrix3(J){let Q=this.r,$=this.g,Z=this.b,W=J.elements;return this.r=W[0]*Q+W[3]*$+W[6]*Z,this.g=W[1]*Q+W[4]*$+W[7]*Z,this.b=W[2]*Q+W[5]*$+W[8]*Z,this}equals(J){return J.r===this.r&&J.g===this.g&&J.b===this.b}fromArray(J,Q=0){return this.r=J[Q],this.g=J[Q+1],this.b=J[Q+2],this}toArray(J=[],Q=0){return J[Q]=this.r,J[Q+1]=this.g,J[Q+2]=this.b,J}fromBufferAttribute(J,Q){return this.r=J.getX(Q),this.g=J.getY(Q),this.b=J.getZ(Q),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}var AJ=new I0;I0.NAMES=GH;class t8 extends t0{constructor(){super();if(this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new F9,this.environmentIntensity=1,this.environmentRotation=new F9,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(J,Q){if(super.copy(J,Q),J.background!==null)this.background=J.background.clone();if(J.environment!==null)this.environment=J.environment.clone();if(J.fog!==null)this.fog=J.fog.clone();if(this.backgroundBlurriness=J.backgroundBlurriness,this.backgroundIntensity=J.backgroundIntensity,this.backgroundRotation.copy(J.backgroundRotation),this.environmentIntensity=J.environmentIntensity,this.environmentRotation.copy(J.environmentRotation),J.overrideMaterial!==null)this.overrideMaterial=J.overrideMaterial.clone();return this.matrixAutoUpdate=J.matrixAutoUpdate,this}toJSON(J){let Q=super.toJSON(J);if(this.fog!==null)Q.object.fog=this.fog.toJSON();if(this.backgroundBlurriness>0)Q.object.backgroundBlurriness=this.backgroundBlurriness;if(this.backgroundIntensity!==1)Q.object.backgroundIntensity=this.backgroundIntensity;if(Q.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1)Q.object.environmentIntensity=this.environmentIntensity;return Q.object.environmentRotation=this.environmentRotation.toArray(),Q}}var $9=new y,C9=new y,GQ=new y,P9=new y,T8=new y,S8=new y,mZ=new y,EQ=new y,qQ=new y,NQ=new y,FQ=new a0,OQ=new a0,RQ=new a0;class oJ{constructor(J=new y,Q=new y,$=new y){this.a=J,this.b=Q,this.c=$}static getNormal(J,Q,$,Z){Z.subVectors($,Q),$9.subVectors(J,Q),Z.cross($9);let W=Z.lengthSq();if(W>0)return Z.multiplyScalar(1/Math.sqrt(W));return Z.set(0,0,0)}static getBarycoord(J,Q,$,Z,W){$9.subVectors(Z,Q),C9.subVectors($,Q),GQ.subVectors(J,Q);let H=$9.dot($9),K=$9.dot(C9),Y=$9.dot(GQ),X=C9.dot(C9),U=C9.dot(GQ),G=H*X-K*K;if(G===0)return W.set(0,0,0),null;let q=1/G,E=(X*Y-K*U)*q,F=(H*U-K*Y)*q;return W.set(1-E-F,F,E)}static containsPoint(J,Q,$,Z){if(this.getBarycoord(J,Q,$,Z,P9)===null)return!1;return P9.x>=0&&P9.y>=0&&P9.x+P9.y<=1}static getInterpolation(J,Q,$,Z,W,H,K,Y){if(this.getBarycoord(J,Q,$,Z,P9)===null){if(Y.x=0,Y.y=0,"z"in Y)Y.z=0;if("w"in Y)Y.w=0;return null}return Y.setScalar(0),Y.addScaledVector(W,P9.x),Y.addScaledVector(H,P9.y),Y.addScaledVector(K,P9.z),Y}static getInterpolatedAttribute(J,Q,$,Z,W,H){return FQ.setScalar(0),OQ.setScalar(0),RQ.setScalar(0),FQ.fromBufferAttribute(J,Q),OQ.fromBufferAttribute(J,$),RQ.fromBufferAttribute(J,Z),H.setScalar(0),H.addScaledVector(FQ,W.x),H.addScaledVector(OQ,W.y),H.addScaledVector(RQ,W.z),H}static isFrontFacing(J,Q,$,Z){return $9.subVectors($,Q),C9.subVectors(J,Q),$9.cross(C9).dot(Z)<0}set(J,Q,$){return this.a.copy(J),this.b.copy(Q),this.c.copy($),this}setFromPointsAndIndices(J,Q,$,Z){return this.a.copy(J[Q]),this.b.copy(J[$]),this.c.copy(J[Z]),this}setFromAttributeAndIndices(J,Q,$,Z){return this.a.fromBufferAttribute(J,Q),this.b.fromBufferAttribute(J,$),this.c.fromBufferAttribute(J,Z),this}clone(){return new this.constructor().copy(this)}copy(J){return this.a.copy(J.a),this.b.copy(J.b),this.c.copy(J.c),this}getArea(){return $9.subVectors(this.c,this.b),C9.subVectors(this.a,this.b),$9.cross(C9).length()*0.5}getMidpoint(J){return J.addVectors(this.a,this.b).add(this.c).multiplyScalar(0.3333333333333333)}getNormal(J){return oJ.getNormal(this.a,this.b,this.c,J)}getPlane(J){return J.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(J,Q){return oJ.getBarycoord(J,this.a,this.b,this.c,Q)}getInterpolation(J,Q,$,Z,W){return oJ.getInterpolation(J,this.a,this.b,this.c,Q,$,Z,W)}containsPoint(J){return oJ.containsPoint(J,this.a,this.b,this.c)}isFrontFacing(J){return oJ.isFrontFacing(this.a,this.b,this.c,J)}intersectsBox(J){return J.intersectsTriangle(this)}closestPointToPoint(J,Q){let $=this.a,Z=this.b,W=this.c,H,K;T8.subVectors(Z,$),S8.subVectors(W,$),EQ.subVectors(J,$);let Y=T8.dot(EQ),X=S8.dot(EQ);if(Y<=0&&X<=0)return Q.copy($);qQ.subVectors(J,Z);let U=T8.dot(qQ),G=S8.dot(qQ);if(U>=0&&G<=U)return Q.copy(Z);let q=Y*G-U*X;if(q<=0&&Y>=0&&U<=0)return H=Y/(Y-U),Q.copy($).addScaledVector(T8,H);NQ.subVectors(J,W);let E=T8.dot(NQ),F=S8.dot(NQ);if(F>=0&&E<=F)return Q.copy(W);let k=E*X-Y*F;if(k<=0&&X>=0&&F<=0)return K=X/(X-F),Q.copy($).addScaledVector(S8,K);let B=U*F-E*G;if(B<=0&&G-U>=0&&E-F>=0)return mZ.subVectors(W,Z),K=(G-U)/(G-U+(E-F)),Q.copy(Z).addScaledVector(mZ,K);let O=1/(B+k+q);return H=k*O,K=q*O,Q.copy($).addScaledVector(T8,H).addScaledVector(S8,K)}equals(J){return J.a.equals(this.a)&&J.b.equals(this.b)&&J.c.equals(this.c)}}class tJ{constructor(J=new y(1/0,1/0,1/0),Q=new y(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=J,this.max=Q}set(J,Q){return this.min.copy(J),this.max.copy(Q),this}setFromArray(J){this.makeEmpty();for(let Q=0,$=J.length;Q<$;Q+=3)this.expandByPoint(Z9.fromArray(J,Q));return this}setFromBufferAttribute(J){this.makeEmpty();for(let Q=0,$=J.count;Q<$;Q++)this.expandByPoint(Z9.fromBufferAttribute(J,Q));return this}setFromPoints(J){this.makeEmpty();for(let Q=0,$=J.length;Q<$;Q++)this.expandByPoint(J[Q]);return this}setFromCenterAndSize(J,Q){let $=Z9.copy(Q).multiplyScalar(0.5);return this.min.copy(J).sub($),this.max.copy(J).add($),this}setFromObject(J,Q=!1){return this.makeEmpty(),this.expandByObject(J,Q)}clone(){return new this.constructor().copy(this)}copy(J){return this.min.copy(J.min),this.max.copy(J.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(J){return this.isEmpty()?J.set(0,0,0):J.addVectors(this.min,this.max).multiplyScalar(0.5)}getSize(J){return this.isEmpty()?J.set(0,0,0):J.subVectors(this.max,this.min)}expandByPoint(J){return this.min.min(J),this.max.max(J),this}expandByVector(J){return this.min.sub(J),this.max.add(J),this}expandByScalar(J){return this.min.addScalar(-J),this.max.addScalar(J),this}expandByObject(J,Q=!1){J.updateWorldMatrix(!1,!1);let $=J.geometry;if($!==void 0){let W=$.getAttribute("position");if(Q===!0&&W!==void 0&&J.isInstancedMesh!==!0)for(let H=0,K=W.count;H<K;H++){if(J.isMesh===!0)J.getVertexPosition(H,Z9);else Z9.fromBufferAttribute(W,H);Z9.applyMatrix4(J.matrixWorld),this.expandByPoint(Z9)}else{if(J.boundingBox!==void 0){if(J.boundingBox===null)J.computeBoundingBox();s7.copy(J.boundingBox)}else{if($.boundingBox===null)$.computeBoundingBox();s7.copy($.boundingBox)}s7.applyMatrix4(J.matrixWorld),this.union(s7)}}let Z=J.children;for(let W=0,H=Z.length;W<H;W++)this.expandByObject(Z[W],Q);return this}containsPoint(J){return J.x>=this.min.x&&J.x<=this.max.x&&J.y>=this.min.y&&J.y<=this.max.y&&J.z>=this.min.z&&J.z<=this.max.z}containsBox(J){return this.min.x<=J.min.x&&J.max.x<=this.max.x&&this.min.y<=J.min.y&&J.max.y<=this.max.y&&this.min.z<=J.min.z&&J.max.z<=this.max.z}getParameter(J,Q){return Q.set((J.x-this.min.x)/(this.max.x-this.min.x),(J.y-this.min.y)/(this.max.y-this.min.y),(J.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(J){return J.max.x>=this.min.x&&J.min.x<=this.max.x&&J.max.y>=this.min.y&&J.min.y<=this.max.y&&J.max.z>=this.min.z&&J.min.z<=this.max.z}intersectsSphere(J){return this.clampPoint(J.center,Z9),Z9.distanceToSquared(J.center)<=J.radius*J.radius}intersectsPlane(J){let Q,$;if(J.normal.x>0)Q=J.normal.x*this.min.x,$=J.normal.x*this.max.x;else Q=J.normal.x*this.max.x,$=J.normal.x*this.min.x;if(J.normal.y>0)Q+=J.normal.y*this.min.y,$+=J.normal.y*this.max.y;else Q+=J.normal.y*this.max.y,$+=J.normal.y*this.min.y;if(J.normal.z>0)Q+=J.normal.z*this.min.z,$+=J.normal.z*this.max.z;else Q+=J.normal.z*this.max.z,$+=J.normal.z*this.min.z;return Q<=-J.constant&&$>=-J.constant}intersectsTriangle(J){if(this.isEmpty())return!1;this.getCenter(G7),i7.subVectors(this.max,G7),j8.subVectors(J.a,G7),v8.subVectors(J.b,G7),y8.subVectors(J.c,G7),m9.subVectors(v8,j8),d9.subVectors(y8,v8),W8.subVectors(j8,y8);let Q=[0,-m9.z,m9.y,0,-d9.z,d9.y,0,-W8.z,W8.y,m9.z,0,-m9.x,d9.z,0,-d9.x,W8.z,0,-W8.x,-m9.y,m9.x,0,-d9.y,d9.x,0,-W8.y,W8.x,0];if(!kQ(Q,j8,v8,y8,i7))return!1;if(Q=[1,0,0,0,1,0,0,0,1],!kQ(Q,j8,v8,y8,i7))return!1;return o7.crossVectors(m9,d9),Q=[o7.x,o7.y,o7.z],kQ(Q,j8,v8,y8,i7)}clampPoint(J,Q){return Q.copy(J).clamp(this.min,this.max)}distanceToPoint(J){return this.clampPoint(J,Z9).distanceTo(J)}getBoundingSphere(J){if(this.isEmpty())J.makeEmpty();else this.getCenter(J.center),J.radius=this.getSize(Z9).length()*0.5;return J}intersect(J){if(this.min.max(J.min),this.max.min(J.max),this.isEmpty())this.makeEmpty();return this}union(J){return this.min.min(J.min),this.max.max(J.max),this}applyMatrix4(J){if(this.isEmpty())return this;return I9[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(J),I9[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(J),I9[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(J),I9[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(J),I9[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(J),I9[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(J),I9[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(J),I9[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(J),this.setFromPoints(I9),this}translate(J){return this.min.add(J),this.max.add(J),this}equals(J){return J.min.equals(this.min)&&J.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(J){return this.min.fromArray(J.min),this.max.fromArray(J.max),this}}var I9=[new y,new y,new y,new y,new y,new y,new y,new y],Z9=new y,s7=new tJ,j8=new y,v8=new y,y8=new y,m9=new y,d9=new y,W8=new y,G7=new y,i7=new y,o7=new y,H8=new y;function kQ(J,Q,$,Z,W){for(let H=0,K=J.length-3;H<=K;H+=3){H8.fromArray(J,H);let Y=W.x*Math.abs(H8.x)+W.y*Math.abs(H8.y)+W.z*Math.abs(H8.z),X=Q.dot(H8),U=$.dot(H8),G=Z.dot(H8);if(Math.max(-Math.max(X,U,G),Math.min(X,U,G))>Y)return!1}return!0}var RJ=new y,a7=new y0,qY=0;class DJ extends D9{constructor(J,Q,$=!1){super();if(Array.isArray(J))throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:qY++}),this.name="",this.array=J,this.itemSize=Q,this.count=J!==void 0?J.length/Q:0,this.normalized=$,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(J){if(J===!0)this.version++}setUsage(J){return this.usage=J,this}addUpdateRange(J,Q){this.updateRanges.push({start:J,count:Q})}clearUpdateRanges(){this.updateRanges.length=0}copy(J){return this.name=J.name,this.array=new J.array.constructor(J.array),this.itemSize=J.itemSize,this.count=J.count,this.normalized=J.normalized,this.usage=J.usage,this.gpuType=J.gpuType,this}copyAt(J,Q,$){J*=this.itemSize,$*=Q.itemSize;for(let Z=0,W=this.itemSize;Z<W;Z++)this.array[J+Z]=Q.array[$+Z];return this}copyArray(J){return this.array.set(J),this}applyMatrix3(J){if(this.itemSize===2)for(let Q=0,$=this.count;Q<$;Q++)a7.fromBufferAttribute(this,Q),a7.applyMatrix3(J),this.setXY(Q,a7.x,a7.y);else if(this.itemSize===3)for(let Q=0,$=this.count;Q<$;Q++)RJ.fromBufferAttribute(this,Q),RJ.applyMatrix3(J),this.setXYZ(Q,RJ.x,RJ.y,RJ.z);return this}applyMatrix4(J){for(let Q=0,$=this.count;Q<$;Q++)RJ.fromBufferAttribute(this,Q),RJ.applyMatrix4(J),this.setXYZ(Q,RJ.x,RJ.y,RJ.z);return this}applyNormalMatrix(J){for(let Q=0,$=this.count;Q<$;Q++)RJ.fromBufferAttribute(this,Q),RJ.applyNormalMatrix(J),this.setXYZ(Q,RJ.x,RJ.y,RJ.z);return this}transformDirection(J){for(let Q=0,$=this.count;Q<$;Q++)RJ.fromBufferAttribute(this,Q),RJ.transformDirection(J),this.setXYZ(Q,RJ.x,RJ.y,RJ.z);return this}set(J,Q=0){return this.array.set(J,Q),this}getComponent(J,Q){let $=this.array[J*this.itemSize+Q];if(this.normalized)$=W9($,this.array);return $}setComponent(J,Q,$){if(this.normalized)$=o0($,this.array);return this.array[J*this.itemSize+Q]=$,this}getX(J){let Q=this.array[J*this.itemSize];if(this.normalized)Q=W9(Q,this.array);return Q}setX(J,Q){if(this.normalized)Q=o0(Q,this.array);return this.array[J*this.itemSize]=Q,this}getY(J){let Q=this.array[J*this.itemSize+1];if(this.normalized)Q=W9(Q,this.array);return Q}setY(J,Q){if(this.normalized)Q=o0(Q,this.array);return this.array[J*this.itemSize+1]=Q,this}getZ(J){let Q=this.array[J*this.itemSize+2];if(this.normalized)Q=W9(Q,this.array);return Q}setZ(J,Q){if(this.normalized)Q=o0(Q,this.array);return this.array[J*this.itemSize+2]=Q,this}getW(J){let Q=this.array[J*this.itemSize+3];if(this.normalized)Q=W9(Q,this.array);return Q}setW(J,Q){if(this.normalized)Q=o0(Q,this.array);return this.array[J*this.itemSize+3]=Q,this}setXY(J,Q,$){if(J*=this.itemSize,this.normalized)Q=o0(Q,this.array),$=o0($,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this}setXYZ(J,Q,$,Z){if(J*=this.itemSize,this.normalized)Q=o0(Q,this.array),$=o0($,this.array),Z=o0(Z,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this.array[J+2]=Z,this}setXYZW(J,Q,$,Z,W){if(J*=this.itemSize,this.normalized)Q=o0(Q,this.array),$=o0($,this.array),Z=o0(Z,this.array),W=o0(W,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this.array[J+2]=Z,this.array[J+3]=W,this}onUpload(J){return this.onUploadCallback=J,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let J={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};if(this.name!=="")J.name=this.name;if(this.usage!==35044)J.usage=this.usage;return J}dispose(){this.dispatchEvent({type:"dispose"})}}class v6 extends DJ{constructor(J,Q,$){super(new Uint16Array(J),Q,$)}}class y6 extends DJ{constructor(J,Q,$){super(new Uint32Array(J),Q,$)}}class hJ extends DJ{constructor(J,Q,$){super(new Float32Array(J),Q,$)}}var NY=new tJ,E7=new y,LQ=new y;class lJ{constructor(J=new y,Q=-1){this.isSphere=!0,this.center=J,this.radius=Q}set(J,Q){return this.center.copy(J),this.radius=Q,this}setFromPoints(J,Q){let $=this.center;if(Q!==void 0)$.copy(Q);else NY.setFromPoints(J).getCenter($);let Z=0;for(let W=0,H=J.length;W<H;W++)Z=Math.max(Z,$.distanceToSquared(J[W]));return this.radius=Math.sqrt(Z),this}copy(J){return this.center.copy(J.center),this.radius=J.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(J){return J.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(J){return J.distanceTo(this.center)-this.radius}intersectsSphere(J){let Q=this.radius+J.radius;return J.center.distanceToSquared(this.center)<=Q*Q}intersectsBox(J){return J.intersectsSphere(this)}intersectsPlane(J){return Math.abs(J.distanceToPoint(this.center))<=this.radius}clampPoint(J,Q){let $=this.center.distanceToSquared(J);if(Q.copy(J),$>this.radius*this.radius)Q.sub(this.center).normalize(),Q.multiplyScalar(this.radius).add(this.center);return Q}getBoundingBox(J){if(this.isEmpty())return J.makeEmpty(),J;return J.set(this.center,this.center),J.expandByScalar(this.radius),J}applyMatrix4(J){return this.center.applyMatrix4(J),this.radius=this.radius*J.getMaxScaleOnAxis(),this}translate(J){return this.center.add(J),this}expandByPoint(J){if(this.isEmpty())return this.center.copy(J),this.radius=0,this;E7.subVectors(J,this.center);let Q=E7.lengthSq();if(Q>this.radius*this.radius){let $=Math.sqrt(Q),Z=($-this.radius)*0.5;this.center.addScaledVector(E7,Z/$),this.radius+=Z}return this}union(J){if(J.isEmpty())return this;if(this.isEmpty())return this.copy(J),this;if(this.center.equals(J.center)===!0)this.radius=Math.max(this.radius,J.radius);else LQ.subVectors(J.center,this.center).setLength(J.radius),this.expandByPoint(E7.copy(J.center).add(LQ)),this.expandByPoint(E7.copy(J.center).sub(LQ));return this}equals(J){return J.center.equals(this.center)&&J.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(J){return this.radius=J.radius,this.center.fromArray(J.center),this}}var FY=0,iJ=new j0,DQ=new t0,h8=new y,gJ=new tJ,q7=new tJ,_J=new y;class yJ extends D9{constructor(){super();this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:FY++}),this.uuid=H9(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(J){if(Array.isArray(J))this.index=new((xK(J))?y6:v6)(J,1);else this.index=J;return this}setIndirect(J,Q=0){return this.indirect=J,this.indirectOffset=Q,this}getIndirect(){return this.indirect}getAttribute(J){return this.attributes[J]}setAttribute(J,Q){return this.attributes[J]=Q,this}deleteAttribute(J){return delete this.attributes[J],this}hasAttribute(J){return this.attributes[J]!==void 0}addGroup(J,Q,$=0){this.groups.push({start:J,count:Q,materialIndex:$})}clearGroups(){this.groups=[]}setDrawRange(J,Q){this.drawRange.start=J,this.drawRange.count=Q}applyMatrix4(J){let Q=this.attributes.position;if(Q!==void 0)Q.applyMatrix4(J),Q.needsUpdate=!0;let $=this.attributes.normal;if($!==void 0){let W=new T0().getNormalMatrix(J);$.applyNormalMatrix(W),$.needsUpdate=!0}let Z=this.attributes.tangent;if(Z!==void 0)Z.transformDirection(J),Z.needsUpdate=!0;if(this.boundingBox!==null)this.computeBoundingBox();if(this.boundingSphere!==null)this.computeBoundingSphere();return this._transformed=!0,this}applyQuaternion(J){return iJ.makeRotationFromQuaternion(J),this.applyMatrix4(iJ),this}rotateX(J){return iJ.makeRotationX(J),this.applyMatrix4(iJ),this}rotateY(J){return iJ.makeRotationY(J),this.applyMatrix4(iJ),this}rotateZ(J){return iJ.makeRotationZ(J),this.applyMatrix4(iJ),this}translate(J,Q,$){return iJ.makeTranslation(J,Q,$),this.applyMatrix4(iJ),this}scale(J,Q,$){return iJ.makeScale(J,Q,$),this.applyMatrix4(iJ),this}lookAt(J){return DQ.lookAt(J),DQ.updateMatrix(),this.applyMatrix4(DQ.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(h8).negate(),this.translate(h8.x,h8.y,h8.z),this}setFromPoints(J){let Q=this.getAttribute("position");if(Q===void 0){let $=[];for(let Z=0,W=J.length;Z<W;Z++){let H=J[Z];$.push(H.x,H.y,H.z||0)}this.setAttribute("position",new hJ($,3))}else{let $=Math.min(J.length,Q.count);for(let Z=0;Z<$;Z++){let W=J[Z];Q.setXYZ(Z,W.x,W.y,W.z||0)}if(J.length>Q.count)M0("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.");Q.needsUpdate=!0}return this}computeBoundingBox(){if(this.boundingBox===null)this.boundingBox=new tJ;let J=this.attributes.position,Q=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){A0("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new y(-1/0,-1/0,-1/0),new y(1/0,1/0,1/0));return}if(J!==void 0){if(this.boundingBox.setFromBufferAttribute(J),Q)for(let $=0,Z=Q.length;$<Z;$++){let W=Q[$];if(gJ.setFromBufferAttribute(W),this.morphTargetsRelative)_J.addVectors(this.boundingBox.min,gJ.min),this.boundingBox.expandByPoint(_J),_J.addVectors(this.boundingBox.max,gJ.max),this.boundingBox.expandByPoint(_J);else this.boundingBox.expandByPoint(gJ.min),this.boundingBox.expandByPoint(gJ.max)}}else this.boundingBox.makeEmpty();if(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))A0('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){if(this.boundingSphere===null)this.boundingSphere=new lJ;let J=this.attributes.position,Q=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){A0("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new y,1/0);return}if(J){let $=this.boundingSphere.center;if(gJ.setFromBufferAttribute(J),Q)for(let W=0,H=Q.length;W<H;W++){let K=Q[W];if(q7.setFromBufferAttribute(K),this.morphTargetsRelative)_J.addVectors(gJ.min,q7.min),gJ.expandByPoint(_J),_J.addVectors(gJ.max,q7.max),gJ.expandByPoint(_J);else gJ.expandByPoint(q7.min),gJ.expandByPoint(q7.max)}gJ.getCenter($);let Z=0;for(let W=0,H=J.count;W<H;W++)_J.fromBufferAttribute(J,W),Z=Math.max(Z,$.distanceToSquared(_J));if(Q)for(let W=0,H=Q.length;W<H;W++){let K=Q[W],Y=this.morphTargetsRelative;for(let X=0,U=K.count;X<U;X++){if(_J.fromBufferAttribute(K,X),Y)h8.fromBufferAttribute(J,X),_J.add(h8);Z=Math.max(Z,$.distanceToSquared(_J))}}if(this.boundingSphere.radius=Math.sqrt(Z),isNaN(this.boundingSphere.radius))A0('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let J=this.index,Q=this.attributes;if(J===null||Q.position===void 0||Q.normal===void 0||Q.uv===void 0){A0("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let{position:$,normal:Z,uv:W}=Q,H=this.getAttribute("tangent");if(H===void 0||H.count!==$.count)H=new DJ(new Float32Array(4*$.count),4),this.setAttribute("tangent",H);let K=[],Y=[];for(let w=0;w<$.count;w++)K[w]=new y,Y[w]=new y;let X=new y,U=new y,G=new y,q=new y0,E=new y0,F=new y0,k=new y,B=new y;function O(w,L,z){X.fromBufferAttribute($,w),U.fromBufferAttribute($,L),G.fromBufferAttribute($,z),q.fromBufferAttribute(W,w),E.fromBufferAttribute(W,L),F.fromBufferAttribute(W,z),U.sub(X),G.sub(X),E.sub(q),F.sub(q);let g=1/(E.x*F.y-F.x*E.y);if(!isFinite(g))return;k.copy(U).multiplyScalar(F.y).addScaledVector(G,-E.y).multiplyScalar(g),B.copy(G).multiplyScalar(E.x).addScaledVector(U,-F.x).multiplyScalar(g),K[w].add(k),K[L].add(k),K[z].add(k),Y[w].add(B),Y[L].add(B),Y[z].add(B)}let N=this.groups;if(N.length===0)N=[{start:0,count:J.count}];for(let w=0,L=N.length;w<L;++w){let z=N[w],g=z.start,A=z.count;for(let m=g,a=g+A;m<a;m+=3)O(J.getX(m+0),J.getX(m+1),J.getX(m+2))}let _=new y,C=new y,D=new y,P=new y;function I(w){D.fromBufferAttribute(Z,w),P.copy(D);let L=K[w];_.copy(L),_.sub(D.multiplyScalar(D.dot(L))).normalize(),C.crossVectors(P,L);let g=C.dot(Y[w])<0?-1:1;H.setXYZW(w,_.x,_.y,_.z,g)}for(let w=0,L=N.length;w<L;++w){let z=N[w],g=z.start,A=z.count;for(let m=g,a=g+A;m<a;m+=3)I(J.getX(m+0)),I(J.getX(m+1)),I(J.getX(m+2))}this._transformed=!0}computeVertexNormals(){let J=this.index,Q=this.getAttribute("position");if(Q!==void 0){let $=this.getAttribute("normal");if($===void 0||$.count!==Q.count)$=new DJ(new Float32Array(Q.count*3),3),this.setAttribute("normal",$);else for(let q=0,E=$.count;q<E;q++)$.setXYZ(q,0,0,0);let Z=new y,W=new y,H=new y,K=new y,Y=new y,X=new y,U=new y,G=new y;if(J)for(let q=0,E=J.count;q<E;q+=3){let F=J.getX(q+0),k=J.getX(q+1),B=J.getX(q+2);Z.fromBufferAttribute(Q,F),W.fromBufferAttribute(Q,k),H.fromBufferAttribute(Q,B),U.subVectors(H,W),G.subVectors(Z,W),U.cross(G),K.fromBufferAttribute($,F),Y.fromBufferAttribute($,k),X.fromBufferAttribute($,B),K.add(U),Y.add(U),X.add(U),$.setXYZ(F,K.x,K.y,K.z),$.setXYZ(k,Y.x,Y.y,Y.z),$.setXYZ(B,X.x,X.y,X.z)}else for(let q=0,E=Q.count;q<E;q+=3)Z.fromBufferAttribute(Q,q+0),W.fromBufferAttribute(Q,q+1),H.fromBufferAttribute(Q,q+2),U.subVectors(H,W),G.subVectors(Z,W),U.cross(G),$.setXYZ(q+0,U.x,U.y,U.z),$.setXYZ(q+1,U.x,U.y,U.z),$.setXYZ(q+2,U.x,U.y,U.z);this.normalizeNormals(),$.needsUpdate=!0}}normalizeNormals(){let J=this.attributes.normal;for(let Q=0,$=J.count;Q<$;Q++)_J.fromBufferAttribute(J,Q),_J.normalize(),J.setXYZ(Q,_J.x,_J.y,_J.z)}toNonIndexed(){function J(K,Y){let{array:X,itemSize:U,normalized:G}=K,q=new X.constructor(Y.length*U),E=0,F=0;for(let k=0,B=Y.length;k<B;k++){if(K.isInterleavedBufferAttribute)E=Y[k]*K.data.stride+K.offset;else E=Y[k]*U;for(let O=0;O<U;O++)q[F++]=X[E++]}return new DJ(q,U,G)}if(this.index===null)return M0("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let Q=new yJ,$=this.index.array,Z=this.attributes;for(let K in Z){let Y=Z[K],X=J(Y,$);Q.setAttribute(K,X)}let W=this.morphAttributes;for(let K in W){let Y=[],X=W[K];for(let U=0,G=X.length;U<G;U++){let q=X[U],E=J(q,$);Y.push(E)}Q.morphAttributes[K]=Y}Q.morphTargetsRelative=this.morphTargetsRelative;let H=this.groups;for(let K=0,Y=H.length;K<Y;K++){let X=H[K];Q.addGroup(X.start,X.count,X.materialIndex)}return Q}toJSON(){let J={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(J.uuid=this.uuid,J.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!=="")J.name=this.name;if(Object.keys(this.userData).length>0)J.userData=this.userData;if(this.parameters!==void 0&&this._transformed!==!0){let Y=this.parameters;for(let X in Y)if(Y[X]!==void 0)J[X]=Y[X];return J}J.data={attributes:{}};let Q=this.index;if(Q!==null)J.data.index={type:Q.array.constructor.name,array:Array.prototype.slice.call(Q.array)};let $=this.attributes;for(let Y in $){let X=$[Y];J.data.attributes[Y]=X.toJSON(J.data)}let Z={},W=!1;for(let Y in this.morphAttributes){let X=this.morphAttributes[Y],U=[];for(let G=0,q=X.length;G<q;G++){let E=X[G];U.push(E.toJSON(J.data))}if(U.length>0)Z[Y]=U,W=!0}if(W)J.data.morphAttributes=Z,J.data.morphTargetsRelative=this.morphTargetsRelative;let H=this.groups;if(H.length>0)J.data.groups=JSON.parse(JSON.stringify(H));let K=this.boundingSphere;if(K!==null)J.data.boundingSphere=K.toJSON();return J}clone(){return new this.constructor().copy(this)}copy(J){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let Q={};this.name=J.name;let $=J.index;if($!==null)this.setIndex($.clone());let Z=J.attributes;for(let X in Z){let U=Z[X];this.setAttribute(X,U.clone(Q))}let W=J.morphAttributes;for(let X in W){let U=[],G=W[X];for(let q=0,E=G.length;q<E;q++)U.push(G[q].clone(Q));this.morphAttributes[X]=U}this.morphTargetsRelative=J.morphTargetsRelative;let H=J.groups;for(let X=0,U=H.length;X<U;X++){let G=H[X];this.addGroup(G.start,G.count,G.materialIndex)}let K=J.boundingBox;if(K!==null)this.boundingBox=K.clone();let Y=J.boundingSphere;if(Y!==null)this.boundingSphere=Y.clone();return this.drawRange.start=J.drawRange.start,this.drawRange.count=J.drawRange.count,this.userData=J.userData,this._transformed=J._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class w7{constructor(J,Q){this.isInterleavedBuffer=!0,this.array=J,this.stride=Q,this.count=J!==void 0?J.length/Q:0,this.usage=35044,this.updateRanges=[],this.version=0,this.uuid=H9()}onUploadCallback(){}set needsUpdate(J){if(J===!0)this.version++}setUsage(J){return this.usage=J,this}addUpdateRange(J,Q){this.updateRanges.push({start:J,count:Q})}clearUpdateRanges(){this.updateRanges.length=0}copy(J){return this.array=new J.array.constructor(J.array),this.count=J.count,this.stride=J.stride,this.usage=J.usage,this}copyAt(J,Q,$){J*=this.stride,$*=Q.stride;for(let Z=0,W=this.stride;Z<W;Z++)this.array[J+Z]=Q.array[$+Z];return this}set(J,Q=0){return this.array.set(J,Q),this}clone(J){if(J.arrayBuffers===void 0)J.arrayBuffers={};if(this.array.buffer._uuid===void 0)this.array.buffer._uuid=H9();if(J.arrayBuffers[this.array.buffer._uuid]===void 0)J.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer;let Q=new this.array.constructor(J.arrayBuffers[this.array.buffer._uuid]),$=new this.constructor(Q,this.stride);return $.setUsage(this.usage),$}onUpload(J){return this.onUploadCallback=J,this}toJSON(J){if(J.arrayBuffers===void 0)J.arrayBuffers={};if(this.array.buffer._uuid===void 0)this.array.buffer._uuid=H9();if(J.arrayBuffers[this.array.buffer._uuid]===void 0)J.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer));return{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}var jJ=new y;class e8{constructor(J,Q,$,Z=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=J,this.itemSize=Q,this.offset=$,this.normalized=Z}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(J){this.data.needsUpdate=J}applyMatrix4(J){for(let Q=0,$=this.data.count;Q<$;Q++)jJ.fromBufferAttribute(this,Q),jJ.applyMatrix4(J),this.setXYZ(Q,jJ.x,jJ.y,jJ.z);return this}applyNormalMatrix(J){for(let Q=0,$=this.count;Q<$;Q++)jJ.fromBufferAttribute(this,Q),jJ.applyNormalMatrix(J),this.setXYZ(Q,jJ.x,jJ.y,jJ.z);return this}transformDirection(J){for(let Q=0,$=this.count;Q<$;Q++)jJ.fromBufferAttribute(this,Q),jJ.transformDirection(J),this.setXYZ(Q,jJ.x,jJ.y,jJ.z);return this}getComponent(J,Q){let $=this.array[J*this.data.stride+this.offset+Q];if(this.normalized)$=W9($,this.array);return $}setComponent(J,Q,$){if(this.normalized)$=o0($,this.array);return this.data.array[J*this.data.stride+this.offset+Q]=$,this}setX(J,Q){if(this.normalized)Q=o0(Q,this.array);return this.data.array[J*this.data.stride+this.offset]=Q,this}setY(J,Q){if(this.normalized)Q=o0(Q,this.array);return this.data.array[J*this.data.stride+this.offset+1]=Q,this}setZ(J,Q){if(this.normalized)Q=o0(Q,this.array);return this.data.array[J*this.data.stride+this.offset+2]=Q,this}setW(J,Q){if(this.normalized)Q=o0(Q,this.array);return this.data.array[J*this.data.stride+this.offset+3]=Q,this}getX(J){let Q=this.data.array[J*this.data.stride+this.offset];if(this.normalized)Q=W9(Q,this.array);return Q}getY(J){let Q=this.data.array[J*this.data.stride+this.offset+1];if(this.normalized)Q=W9(Q,this.array);return Q}getZ(J){let Q=this.data.array[J*this.data.stride+this.offset+2];if(this.normalized)Q=W9(Q,this.array);return Q}getW(J){let Q=this.data.array[J*this.data.stride+this.offset+3];if(this.normalized)Q=W9(Q,this.array);return Q}setXY(J,Q,$){if(J=J*this.data.stride+this.offset,this.normalized)Q=o0(Q,this.array),$=o0($,this.array);return this.data.array[J+0]=Q,this.data.array[J+1]=$,this}setXYZ(J,Q,$,Z){if(J=J*this.data.stride+this.offset,this.normalized)Q=o0(Q,this.array),$=o0($,this.array),Z=o0(Z,this.array);return this.data.array[J+0]=Q,this.data.array[J+1]=$,this.data.array[J+2]=Z,this}setXYZW(J,Q,$,Z,W){if(J=J*this.data.stride+this.offset,this.normalized)Q=o0(Q,this.array),$=o0($,this.array),Z=o0(Z,this.array),W=o0(W,this.array);return this.data.array[J+0]=Q,this.data.array[J+1]=$,this.data.array[J+2]=Z,this.data.array[J+3]=W,this}clone(J){if(J===void 0){D7("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let Q=[];for(let $=0;$<this.count;$++){let Z=$*this.data.stride+this.offset;for(let W=0;W<this.itemSize;W++)Q.push(this.data.array[Z+W])}return new DJ(new this.array.constructor(Q),this.itemSize,this.normalized)}else{if(J.interleavedBuffers===void 0)J.interleavedBuffers={};if(J.interleavedBuffers[this.data.uuid]===void 0)J.interleavedBuffers[this.data.uuid]=this.data.clone(J);return new e8(J.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}}toJSON(J){if(J===void 0){D7("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let Q=[];for(let $=0;$<this.count;$++){let Z=$*this.data.stride+this.offset;for(let W=0;W<this.itemSize;W++)Q.push(this.data.array[Z+W])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:Q,normalized:this.normalized}}else{if(J.interleavedBuffers===void 0)J.interleavedBuffers={};if(J.interleavedBuffers[this.data.uuid]===void 0)J.interleavedBuffers[this.data.uuid]=this.data.toJSON(J);return{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}}var OY=0;class fJ extends D9{constructor(){super();this.isMaterial=!0,Object.defineProperty(this,"id",{value:OY++}),this.uuid=H9(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new I0(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(J){if(this._alphaTest>0!==J>0)this.version++;this._alphaTest=J}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(J){if(J===void 0)return;for(let Q in J){let $=J[Q];if($===void 0){M0(`Material: parameter '${Q}' has value of undefined.`);continue}let Z=this[Q];if(Z===void 0){M0(`Material: '${Q}' is not a property of THREE.${this.type}.`);continue}if(Z&&Z.isColor)Z.set($);else if(Z&&Z.isVector2&&($&&$.isVector2)||Z&&Z.isEuler&&($&&$.isEuler)||Z&&Z.isVector3&&($&&$.isVector3))Z.copy($);else this[Q]=$}}toJSON(J){let Q=J===void 0||typeof J==="string";if(Q)J={textures:{},images:{}};let $={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};if($.uuid=this.uuid,$.type=this.type,this.name!=="")$.name=this.name;if(this.color&&this.color.isColor)$.color=this.color.getHex();if(this.roughness!==void 0)$.roughness=this.roughness;if(this.metalness!==void 0)$.metalness=this.metalness;if(this.sheen!==void 0)$.sheen=this.sheen;if(this.sheenColor&&this.sheenColor.isColor)$.sheenColor=this.sheenColor.getHex();if(this.sheenRoughness!==void 0)$.sheenRoughness=this.sheenRoughness;if(this.emissive&&this.emissive.isColor)$.emissive=this.emissive.getHex();if(this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1)$.emissiveIntensity=this.emissiveIntensity;if(this.specular&&this.specular.isColor)$.specular=this.specular.getHex();if(this.specularIntensity!==void 0)$.specularIntensity=this.specularIntensity;if(this.specularColor&&this.specularColor.isColor)$.specularColor=this.specularColor.getHex();if(this.shininess!==void 0)$.shininess=this.shininess;if(this.clearcoat!==void 0)$.clearcoat=this.clearcoat;if(this.clearcoatRoughness!==void 0)$.clearcoatRoughness=this.clearcoatRoughness;if(this.clearcoatMap&&this.clearcoatMap.isTexture)$.clearcoatMap=this.clearcoatMap.toJSON(J).uuid;if(this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture)$.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(J).uuid;if(this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture)$.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(J).uuid,$.clearcoatNormalScale=this.clearcoatNormalScale.toArray();if(this.sheenColorMap&&this.sheenColorMap.isTexture)$.sheenColorMap=this.sheenColorMap.toJSON(J).uuid;if(this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture)$.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(J).uuid;if(this.dispersion!==void 0)$.dispersion=this.dispersion;if(this.iridescence!==void 0)$.iridescence=this.iridescence;if(this.iridescenceIOR!==void 0)$.iridescenceIOR=this.iridescenceIOR;if(this.iridescenceThicknessRange!==void 0)$.iridescenceThicknessRange=this.iridescenceThicknessRange;if(this.iridescenceMap&&this.iridescenceMap.isTexture)$.iridescenceMap=this.iridescenceMap.toJSON(J).uuid;if(this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture)$.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(J).uuid;if(this.anisotropy!==void 0)$.anisotropy=this.anisotropy;if(this.anisotropyRotation!==void 0)$.anisotropyRotation=this.anisotropyRotation;if(this.anisotropyMap&&this.anisotropyMap.isTexture)$.anisotropyMap=this.anisotropyMap.toJSON(J).uuid;if(this.map&&this.map.isTexture)$.map=this.map.toJSON(J).uuid;if(this.matcap&&this.matcap.isTexture)$.matcap=this.matcap.toJSON(J).uuid;if(this.alphaMap&&this.alphaMap.isTexture)$.alphaMap=this.alphaMap.toJSON(J).uuid;if(this.lightMap&&this.lightMap.isTexture)$.lightMap=this.lightMap.toJSON(J).uuid,$.lightMapIntensity=this.lightMapIntensity;if(this.aoMap&&this.aoMap.isTexture)$.aoMap=this.aoMap.toJSON(J).uuid,$.aoMapIntensity=this.aoMapIntensity;if(this.bumpMap&&this.bumpMap.isTexture)$.bumpMap=this.bumpMap.toJSON(J).uuid,$.bumpScale=this.bumpScale;if(this.normalMap&&this.normalMap.isTexture)$.normalMap=this.normalMap.toJSON(J).uuid,$.normalMapType=this.normalMapType,$.normalScale=this.normalScale.toArray();if(this.displacementMap&&this.displacementMap.isTexture)$.displacementMap=this.displacementMap.toJSON(J).uuid,$.displacementScale=this.displacementScale,$.displacementBias=this.displacementBias;if(this.roughnessMap&&this.roughnessMap.isTexture)$.roughnessMap=this.roughnessMap.toJSON(J).uuid;if(this.metalnessMap&&this.metalnessMap.isTexture)$.metalnessMap=this.metalnessMap.toJSON(J).uuid;if(this.emissiveMap&&this.emissiveMap.isTexture)$.emissiveMap=this.emissiveMap.toJSON(J).uuid;if(this.specularMap&&this.specularMap.isTexture)$.specularMap=this.specularMap.toJSON(J).uuid;if(this.specularIntensityMap&&this.specularIntensityMap.isTexture)$.specularIntensityMap=this.specularIntensityMap.toJSON(J).uuid;if(this.specularColorMap&&this.specularColorMap.isTexture)$.specularColorMap=this.specularColorMap.toJSON(J).uuid;if(this.envMap&&this.envMap.isTexture){if($.envMap=this.envMap.toJSON(J).uuid,this.combine!==void 0)$.combine=this.combine}if(this.envMapRotation!==void 0)$.envMapRotation=this.envMapRotation.toArray();if(this.envMapIntensity!==void 0)$.envMapIntensity=this.envMapIntensity;if(this.reflectivity!==void 0)$.reflectivity=this.reflectivity;if(this.refractionRatio!==void 0)$.refractionRatio=this.refractionRatio;if(this.gradientMap&&this.gradientMap.isTexture)$.gradientMap=this.gradientMap.toJSON(J).uuid;if(this.transmission!==void 0)$.transmission=this.transmission;if(this.transmissionMap&&this.transmissionMap.isTexture)$.transmissionMap=this.transmissionMap.toJSON(J).uuid;if(this.thickness!==void 0)$.thickness=this.thickness;if(this.thicknessMap&&this.thicknessMap.isTexture)$.thicknessMap=this.thicknessMap.toJSON(J).uuid;if(this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0)$.attenuationDistance=this.attenuationDistance;if(this.attenuationColor!==void 0)$.attenuationColor=this.attenuationColor.getHex();if(this.size!==void 0)$.size=this.size;if(this.shadowSide!==null)$.shadowSide=this.shadowSide;if(this.sizeAttenuation!==void 0)$.sizeAttenuation=this.sizeAttenuation;if(this.blending!==1)$.blending=this.blending;if(this.side!==0)$.side=this.side;if(this.vertexColors===!0)$.vertexColors=!0;if(this.opacity<1)$.opacity=this.opacity;if(this.transparent===!0)$.transparent=!0;if(this.blendSrc!==204)$.blendSrc=this.blendSrc;if(this.blendDst!==205)$.blendDst=this.blendDst;if(this.blendEquation!==100)$.blendEquation=this.blendEquation;if(this.blendSrcAlpha!==null)$.blendSrcAlpha=this.blendSrcAlpha;if(this.blendDstAlpha!==null)$.blendDstAlpha=this.blendDstAlpha;if(this.blendEquationAlpha!==null)$.blendEquationAlpha=this.blendEquationAlpha;if(this.blendColor&&this.blendColor.isColor)$.blendColor=this.blendColor.getHex();if(this.blendAlpha!==0)$.blendAlpha=this.blendAlpha;if(this.depthFunc!==3)$.depthFunc=this.depthFunc;if(this.depthTest===!1)$.depthTest=this.depthTest;if(this.depthWrite===!1)$.depthWrite=this.depthWrite;if(this.colorWrite===!1)$.colorWrite=this.colorWrite;if(this.stencilWriteMask!==255)$.stencilWriteMask=this.stencilWriteMask;if(this.stencilFunc!==519)$.stencilFunc=this.stencilFunc;if(this.stencilRef!==0)$.stencilRef=this.stencilRef;if(this.stencilFuncMask!==255)$.stencilFuncMask=this.stencilFuncMask;if(this.stencilFail!==7680)$.stencilFail=this.stencilFail;if(this.stencilZFail!==7680)$.stencilZFail=this.stencilZFail;if(this.stencilZPass!==7680)$.stencilZPass=this.stencilZPass;if(this.stencilWrite===!0)$.stencilWrite=this.stencilWrite;if(this.rotation!==void 0&&this.rotation!==0)$.rotation=this.rotation;if(this.polygonOffset===!0)$.polygonOffset=!0;if(this.polygonOffsetFactor!==0)$.polygonOffsetFactor=this.polygonOffsetFactor;if(this.polygonOffsetUnits!==0)$.polygonOffsetUnits=this.polygonOffsetUnits;if(this.linewidth!==void 0&&this.linewidth!==1)$.linewidth=this.linewidth;if(this.dashSize!==void 0)$.dashSize=this.dashSize;if(this.gapSize!==void 0)$.gapSize=this.gapSize;if(this.scale!==void 0)$.scale=this.scale;if(this.dithering===!0)$.dithering=!0;if(this.alphaTest>0)$.alphaTest=this.alphaTest;if(this.alphaHash===!0)$.alphaHash=!0;if(this.alphaToCoverage===!0)$.alphaToCoverage=!0;if(this.premultipliedAlpha===!0)$.premultipliedAlpha=!0;if(this.forceSinglePass===!0)$.forceSinglePass=!0;if(this.allowOverride===!1)$.allowOverride=!1;if(this.wireframe===!0)$.wireframe=!0;if(this.wireframeLinewidth>1)$.wireframeLinewidth=this.wireframeLinewidth;if(this.wireframeLinecap!=="round")$.wireframeLinecap=this.wireframeLinecap;if(this.wireframeLinejoin!=="round")$.wireframeLinejoin=this.wireframeLinejoin;if(this.flatShading===!0)$.flatShading=!0;if(this.visible===!1)$.visible=!1;if(this.toneMapped===!1)$.toneMapped=!1;if(this.fog===!1)$.fog=!1;if(Object.keys(this.userData).length>0)$.userData=this.userData;function Z(W){let H=[];for(let K in W){let Y=W[K];delete Y.metadata,H.push(Y)}return H}if(Q){let W=Z(J.textures),H=Z(J.images);if(W.length>0)$.textures=W;if(H.length>0)$.images=H}return $}fromJSON(J,Q){if(J.uuid!==void 0)this.uuid=J.uuid;if(J.name!==void 0)this.name=J.name;if(J.color!==void 0&&this.color!==void 0)this.color.setHex(J.color);if(J.roughness!==void 0)this.roughness=J.roughness;if(J.metalness!==void 0)this.metalness=J.metalness;if(J.sheen!==void 0)this.sheen=J.sheen;if(J.sheenColor!==void 0)this.sheenColor=new I0().setHex(J.sheenColor);if(J.sheenRoughness!==void 0)this.sheenRoughness=J.sheenRoughness;if(J.emissive!==void 0&&this.emissive!==void 0)this.emissive.setHex(J.emissive);if(J.specular!==void 0&&this.specular!==void 0)this.specular.setHex(J.specular);if(J.specularIntensity!==void 0)this.specularIntensity=J.specularIntensity;if(J.specularColor!==void 0&&this.specularColor!==void 0)this.specularColor.setHex(J.specularColor);if(J.shininess!==void 0)this.shininess=J.shininess;if(J.clearcoat!==void 0)this.clearcoat=J.clearcoat;if(J.clearcoatRoughness!==void 0)this.clearcoatRoughness=J.clearcoatRoughness;if(J.dispersion!==void 0)this.dispersion=J.dispersion;if(J.iridescence!==void 0)this.iridescence=J.iridescence;if(J.iridescenceIOR!==void 0)this.iridescenceIOR=J.iridescenceIOR;if(J.iridescenceThicknessRange!==void 0)this.iridescenceThicknessRange=J.iridescenceThicknessRange;if(J.transmission!==void 0)this.transmission=J.transmission;if(J.thickness!==void 0)this.thickness=J.thickness;if(J.attenuationDistance!==void 0)this.attenuationDistance=J.attenuationDistance;if(J.attenuationColor!==void 0&&this.attenuationColor!==void 0)this.attenuationColor.setHex(J.attenuationColor);if(J.anisotropy!==void 0)this.anisotropy=J.anisotropy;if(J.anisotropyRotation!==void 0)this.anisotropyRotation=J.anisotropyRotation;if(J.fog!==void 0)this.fog=J.fog;if(J.flatShading!==void 0)this.flatShading=J.flatShading;if(J.blending!==void 0)this.blending=J.blending;if(J.combine!==void 0)this.combine=J.combine;if(J.side!==void 0)this.side=J.side;if(J.shadowSide!==void 0)this.shadowSide=J.shadowSide;if(J.opacity!==void 0)this.opacity=J.opacity;if(J.transparent!==void 0)this.transparent=J.transparent;if(J.alphaTest!==void 0)this.alphaTest=J.alphaTest;if(J.alphaHash!==void 0)this.alphaHash=J.alphaHash;if(J.depthFunc!==void 0)this.depthFunc=J.depthFunc;if(J.depthTest!==void 0)this.depthTest=J.depthTest;if(J.depthWrite!==void 0)this.depthWrite=J.depthWrite;if(J.colorWrite!==void 0)this.colorWrite=J.colorWrite;if(J.blendSrc!==void 0)this.blendSrc=J.blendSrc;if(J.blendDst!==void 0)this.blendDst=J.blendDst;if(J.blendEquation!==void 0)this.blendEquation=J.blendEquation;if(J.blendSrcAlpha!==void 0)this.blendSrcAlpha=J.blendSrcAlpha;if(J.blendDstAlpha!==void 0)this.blendDstAlpha=J.blendDstAlpha;if(J.blendEquationAlpha!==void 0)this.blendEquationAlpha=J.blendEquationAlpha;if(J.blendColor!==void 0&&this.blendColor!==void 0)this.blendColor.setHex(J.blendColor);if(J.blendAlpha!==void 0)this.blendAlpha=J.blendAlpha;if(J.stencilWriteMask!==void 0)this.stencilWriteMask=J.stencilWriteMask;if(J.stencilFunc!==void 0)this.stencilFunc=J.stencilFunc;if(J.stencilRef!==void 0)this.stencilRef=J.stencilRef;if(J.stencilFuncMask!==void 0)this.stencilFuncMask=J.stencilFuncMask;if(J.stencilFail!==void 0)this.stencilFail=J.stencilFail;if(J.stencilZFail!==void 0)this.stencilZFail=J.stencilZFail;if(J.stencilZPass!==void 0)this.stencilZPass=J.stencilZPass;if(J.stencilWrite!==void 0)this.stencilWrite=J.stencilWrite;if(J.wireframe!==void 0)this.wireframe=J.wireframe;if(J.wireframeLinewidth!==void 0)this.wireframeLinewidth=J.wireframeLinewidth;if(J.wireframeLinecap!==void 0)this.wireframeLinecap=J.wireframeLinecap;if(J.wireframeLinejoin!==void 0)this.wireframeLinejoin=J.wireframeLinejoin;if(J.rotation!==void 0)this.rotation=J.rotation;if(J.linewidth!==void 0)this.linewidth=J.linewidth;if(J.dashSize!==void 0)this.dashSize=J.dashSize;if(J.gapSize!==void 0)this.gapSize=J.gapSize;if(J.scale!==void 0)this.scale=J.scale;if(J.polygonOffset!==void 0)this.polygonOffset=J.polygonOffset;if(J.polygonOffsetFactor!==void 0)this.polygonOffsetFactor=J.polygonOffsetFactor;if(J.polygonOffsetUnits!==void 0)this.polygonOffsetUnits=J.polygonOffsetUnits;if(J.dithering!==void 0)this.dithering=J.dithering;if(J.alphaToCoverage!==void 0)this.alphaToCoverage=J.alphaToCoverage;if(J.premultipliedAlpha!==void 0)this.premultipliedAlpha=J.premultipliedAlpha;if(J.forceSinglePass!==void 0)this.forceSinglePass=J.forceSinglePass;if(J.allowOverride!==void 0)this.allowOverride=J.allowOverride;if(J.visible!==void 0)this.visible=J.visible;if(J.toneMapped!==void 0)this.toneMapped=J.toneMapped;if(J.userData!==void 0)this.userData=J.userData;if(J.vertexColors!==void 0)if(typeof J.vertexColors==="number")this.vertexColors=J.vertexColors>0;else this.vertexColors=J.vertexColors;if(J.size!==void 0)this.size=J.size;if(J.sizeAttenuation!==void 0)this.sizeAttenuation=J.sizeAttenuation;if(J.map!==void 0)this.map=Q[J.map]||null;if(J.matcap!==void 0)this.matcap=Q[J.matcap]||null;if(J.alphaMap!==void 0)this.alphaMap=Q[J.alphaMap]||null;if(J.bumpMap!==void 0)this.bumpMap=Q[J.bumpMap]||null;if(J.bumpScale!==void 0)this.bumpScale=J.bumpScale;if(J.normalMap!==void 0)this.normalMap=Q[J.normalMap]||null;if(J.normalMapType!==void 0)this.normalMapType=J.normalMapType;if(J.normalScale!==void 0){let $=J.normalScale;if(Array.isArray($)===!1)$=[$,$];this.normalScale=new y0().fromArray($)}if(J.displacementMap!==void 0)this.displacementMap=Q[J.displacementMap]||null;if(J.displacementScale!==void 0)this.displacementScale=J.displacementScale;if(J.displacementBias!==void 0)this.displacementBias=J.displacementBias;if(J.roughnessMap!==void 0)this.roughnessMap=Q[J.roughnessMap]||null;if(J.metalnessMap!==void 0)this.metalnessMap=Q[J.metalnessMap]||null;if(J.emissiveMap!==void 0)this.emissiveMap=Q[J.emissiveMap]||null;if(J.emissiveIntensity!==void 0)this.emissiveIntensity=J.emissiveIntensity;if(J.specularMap!==void 0)this.specularMap=Q[J.specularMap]||null;if(J.specularIntensityMap!==void 0)this.specularIntensityMap=Q[J.specularIntensityMap]||null;if(J.specularColorMap!==void 0)this.specularColorMap=Q[J.specularColorMap]||null;if(J.envMap!==void 0)this.envMap=Q[J.envMap]||null;if(J.envMapRotation!==void 0)this.envMapRotation.fromArray(J.envMapRotation);if(J.envMapIntensity!==void 0)this.envMapIntensity=J.envMapIntensity;if(J.reflectivity!==void 0)this.reflectivity=J.reflectivity;if(J.refractionRatio!==void 0)this.refractionRatio=J.refractionRatio;if(J.lightMap!==void 0)this.lightMap=Q[J.lightMap]||null;if(J.lightMapIntensity!==void 0)this.lightMapIntensity=J.lightMapIntensity;if(J.aoMap!==void 0)this.aoMap=Q[J.aoMap]||null;if(J.aoMapIntensity!==void 0)this.aoMapIntensity=J.aoMapIntensity;if(J.gradientMap!==void 0)this.gradientMap=Q[J.gradientMap]||null;if(J.clearcoatMap!==void 0)this.clearcoatMap=Q[J.clearcoatMap]||null;if(J.clearcoatRoughnessMap!==void 0)this.clearcoatRoughnessMap=Q[J.clearcoatRoughnessMap]||null;if(J.clearcoatNormalMap!==void 0)this.clearcoatNormalMap=Q[J.clearcoatNormalMap]||null;if(J.clearcoatNormalScale!==void 0)this.clearcoatNormalScale=new y0().fromArray(J.clearcoatNormalScale);if(J.iridescenceMap!==void 0)this.iridescenceMap=Q[J.iridescenceMap]||null;if(J.iridescenceThicknessMap!==void 0)this.iridescenceThicknessMap=Q[J.iridescenceThicknessMap]||null;if(J.transmissionMap!==void 0)this.transmissionMap=Q[J.transmissionMap]||null;if(J.thicknessMap!==void 0)this.thicknessMap=Q[J.thicknessMap]||null;if(J.anisotropyMap!==void 0)this.anisotropyMap=Q[J.anisotropyMap]||null;if(J.sheenColorMap!==void 0)this.sheenColorMap=Q[J.sheenColorMap]||null;if(J.sheenRoughnessMap!==void 0)this.sheenRoughnessMap=Q[J.sheenRoughnessMap]||null;return this}clone(){return new this.constructor().copy(this)}copy(J){this.name=J.name,this.blending=J.blending,this.side=J.side,this.vertexColors=J.vertexColors,this.opacity=J.opacity,this.transparent=J.transparent,this.blendSrc=J.blendSrc,this.blendDst=J.blendDst,this.blendEquation=J.blendEquation,this.blendSrcAlpha=J.blendSrcAlpha,this.blendDstAlpha=J.blendDstAlpha,this.blendEquationAlpha=J.blendEquationAlpha,this.blendColor.copy(J.blendColor),this.blendAlpha=J.blendAlpha,this.depthFunc=J.depthFunc,this.depthTest=J.depthTest,this.depthWrite=J.depthWrite,this.stencilWriteMask=J.stencilWriteMask,this.stencilFunc=J.stencilFunc,this.stencilRef=J.stencilRef,this.stencilFuncMask=J.stencilFuncMask,this.stencilFail=J.stencilFail,this.stencilZFail=J.stencilZFail,this.stencilZPass=J.stencilZPass,this.stencilWrite=J.stencilWrite;let Q=J.clippingPlanes,$=null;if(Q!==null){let Z=Q.length;$=Array(Z);for(let W=0;W!==Z;++W)$[W]=Q[W].clone()}return this.clippingPlanes=$,this.clipIntersection=J.clipIntersection,this.clipShadows=J.clipShadows,this.shadowSide=J.shadowSide,this.colorWrite=J.colorWrite,this.precision=J.precision,this.polygonOffset=J.polygonOffset,this.polygonOffsetFactor=J.polygonOffsetFactor,this.polygonOffsetUnits=J.polygonOffsetUnits,this.dithering=J.dithering,this.alphaTest=J.alphaTest,this.alphaHash=J.alphaHash,this.alphaToCoverage=J.alphaToCoverage,this.premultipliedAlpha=J.premultipliedAlpha,this.forceSinglePass=J.forceSinglePass,this.allowOverride=J.allowOverride,this.visible=J.visible,this.toneMapped=J.toneMapped,this.userData=JSON.parse(JSON.stringify(J.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(J){if(J===!0)this.version++}}var w9=new y,VQ=new y,r7=new y,u9=new y,MQ=new y,t7=new y,BQ=new y;class J7{constructor(J=new y,Q=new y(0,0,-1)){this.origin=J,this.direction=Q}set(J,Q){return this.origin.copy(J),this.direction.copy(Q),this}copy(J){return this.origin.copy(J.origin),this.direction.copy(J.direction),this}at(J,Q){return Q.copy(this.origin).addScaledVector(this.direction,J)}lookAt(J){return this.direction.copy(J).sub(this.origin).normalize(),this}recast(J){return this.origin.copy(this.at(J,w9)),this}closestPointToPoint(J,Q){Q.subVectors(J,this.origin);let $=Q.dot(this.direction);if($<0)return Q.copy(this.origin);return Q.copy(this.origin).addScaledVector(this.direction,$)}distanceToPoint(J){return Math.sqrt(this.distanceSqToPoint(J))}distanceSqToPoint(J){let Q=w9.subVectors(J,this.origin).dot(this.direction);if(Q<0)return this.origin.distanceToSquared(J);return w9.copy(this.origin).addScaledVector(this.direction,Q),w9.distanceToSquared(J)}distanceSqToSegment(J,Q,$,Z){VQ.copy(J).add(Q).multiplyScalar(0.5),r7.copy(Q).sub(J).normalize(),u9.copy(this.origin).sub(VQ);let W=J.distanceTo(Q)*0.5,H=-this.direction.dot(r7),K=u9.dot(this.direction),Y=-u9.dot(r7),X=u9.lengthSq(),U=Math.abs(1-H*H),G,q,E,F;if(U>0)if(G=H*Y-K,q=H*K-Y,F=W*U,G>=0)if(q>=-F)if(q<=F){let k=1/U;G*=k,q*=k,E=G*(G+H*q+2*K)+q*(H*G+q+2*Y)+X}else q=W,G=Math.max(0,-(H*q+K)),E=-G*G+q*(q+2*Y)+X;else q=-W,G=Math.max(0,-(H*q+K)),E=-G*G+q*(q+2*Y)+X;else if(q<=-F)G=Math.max(0,-(-H*W+K)),q=G>0?-W:Math.min(Math.max(-W,-Y),W),E=-G*G+q*(q+2*Y)+X;else if(q<=F)G=0,q=Math.min(Math.max(-W,-Y),W),E=q*(q+2*Y)+X;else G=Math.max(0,-(H*W+K)),q=G>0?W:Math.min(Math.max(-W,-Y),W),E=-G*G+q*(q+2*Y)+X;else q=H>0?-W:W,G=Math.max(0,-(H*q+K)),E=-G*G+q*(q+2*Y)+X;if($)$.copy(this.origin).addScaledVector(this.direction,G);if(Z)Z.copy(VQ).addScaledVector(r7,q);return E}intersectSphere(J,Q){w9.subVectors(J.center,this.origin);let $=w9.dot(this.direction),Z=w9.dot(w9)-$*$,W=J.radius*J.radius;if(Z>W)return null;let H=Math.sqrt(W-Z),K=$-H,Y=$+H;if(Y<0)return null;if(K<0)return this.at(Y,Q);return this.at(K,Q)}intersectsSphere(J){if(J.radius<0)return!1;return this.distanceSqToPoint(J.center)<=J.radius*J.radius}distanceToPlane(J){let Q=J.normal.dot(this.direction);if(Q===0){if(J.distanceToPoint(this.origin)===0)return 0;return null}let $=-(this.origin.dot(J.normal)+J.constant)/Q;return $>=0?$:null}intersectPlane(J,Q){let $=this.distanceToPlane(J);if($===null)return null;return this.at($,Q)}intersectsPlane(J){let Q=J.distanceToPoint(this.origin);if(Q===0)return!0;if(J.normal.dot(this.direction)*Q<0)return!0;return!1}intersectBox(J,Q){let $,Z,W,H,K,Y,X=1/this.direction.x,U=1/this.direction.y,G=1/this.direction.z,q=this.origin;if(X>=0)$=(J.min.x-q.x)*X,Z=(J.max.x-q.x)*X;else $=(J.max.x-q.x)*X,Z=(J.min.x-q.x)*X;if(U>=0)W=(J.min.y-q.y)*U,H=(J.max.y-q.y)*U;else W=(J.max.y-q.y)*U,H=(J.min.y-q.y)*U;if($>H||W>Z)return null;if(W>$||isNaN($))$=W;if(H<Z||isNaN(Z))Z=H;if(G>=0)K=(J.min.z-q.z)*G,Y=(J.max.z-q.z)*G;else K=(J.max.z-q.z)*G,Y=(J.min.z-q.z)*G;if($>Y||K>Z)return null;if(K>$||$!==$)$=K;if(Y<Z||Z!==Z)Z=Y;if(Z<0)return null;return this.at($>=0?$:Z,Q)}intersectsBox(J){return this.intersectBox(J,w9)!==null}intersectTriangle(J,Q,$,Z,W){MQ.subVectors(Q,J),t7.subVectors($,J),BQ.crossVectors(MQ,t7);let H=this.direction.dot(BQ),K;if(H>0){if(Z)return null;K=1}else if(H<0)K=-1,H=-H;else return null;u9.subVectors(this.origin,J);let Y=K*this.direction.dot(t7.crossVectors(u9,t7));if(Y<0)return null;let X=K*this.direction.dot(MQ.cross(u9));if(X<0)return null;if(Y+X>H)return null;let U=-K*u9.dot(BQ);if(U<0)return null;return this.at(U/H,W)}applyMatrix4(J){return this.origin.applyMatrix4(J),this.direction.transformDirection(J),this}equals(J){return J.origin.equals(this.origin)&&J.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class mJ extends fJ{constructor(J){super();this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new I0(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new F9,this.combine=0,this.reflectivity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.specularMap=J.specularMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapRotation.copy(J.envMapRotation),this.combine=J.combine,this.reflectivity=J.reflectivity,this.refractionRatio=J.refractionRatio,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.fog=J.fog,this}}var dZ=new j0,K8=new J7,e7=new lJ,uZ=new y,J6=new y,Q6=new y,$6=new y,zQ=new y,Z6=new y,cZ=new y,W6=new y;class YJ extends t0{constructor(J=new yJ,Q=new mJ){super();this.isMesh=!0,this.type="Mesh",this.geometry=J,this.material=Q,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(J,Q){if(super.copy(J,Q),J.morphTargetInfluences!==void 0)this.morphTargetInfluences=J.morphTargetInfluences.slice();if(J.morphTargetDictionary!==void 0)this.morphTargetDictionary=Object.assign({},J.morphTargetDictionary);return this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}updateMorphTargets(){let Q=this.geometry.morphAttributes,$=Object.keys(Q);if($.length>0){let Z=Q[$[0]];if(Z!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let W=0,H=Z.length;W<H;W++){let K=Z[W].name||String(W);this.morphTargetInfluences.push(0),this.morphTargetDictionary[K]=W}}}}getVertexPosition(J,Q){let $=this.geometry,Z=$.attributes.position,W=$.morphAttributes.position,H=$.morphTargetsRelative;Q.fromBufferAttribute(Z,J);let K=this.morphTargetInfluences;if(W&&K){Z6.set(0,0,0);for(let Y=0,X=W.length;Y<X;Y++){let U=K[Y],G=W[Y];if(U===0)continue;if(zQ.fromBufferAttribute(G,J),H)Z6.addScaledVector(zQ,U);else Z6.addScaledVector(zQ.sub(Q),U)}Q.add(Z6)}return Q}raycast(J,Q){let $=this.geometry,Z=this.material,W=this.matrixWorld;if(Z===void 0)return;if($.boundingSphere===null)$.computeBoundingSphere();if(e7.copy($.boundingSphere),e7.applyMatrix4(W),K8.copy(J.ray).recast(J.near),e7.containsPoint(K8.origin)===!1){if(K8.intersectSphere(e7,uZ)===null)return;if(K8.origin.distanceToSquared(uZ)>(J.far-J.near)**2)return}if(dZ.copy(W).invert(),K8.copy(J.ray).applyMatrix4(dZ),$.boundingBox!==null){if(K8.intersectsBox($.boundingBox)===!1)return}this._computeIntersections(J,Q,K8)}_computeIntersections(J,Q,$){let Z,W=this.geometry,H=this.material,K=W.index,Y=W.attributes.position,X=W.attributes.uv,U=W.attributes.uv1,G=W.attributes.normal,q=W.groups,E=W.drawRange;if(K!==null)if(Array.isArray(H))for(let F=0,k=q.length;F<k;F++){let B=q[F],O=H[B.materialIndex],N=Math.max(B.start,E.start),_=Math.min(K.count,Math.min(B.start+B.count,E.start+E.count));for(let C=N,D=_;C<D;C+=3){let P=K.getX(C),I=K.getX(C+1),w=K.getX(C+2);if(Z=H6(this,O,J,$,X,U,G,P,I,w),Z)Z.faceIndex=Math.floor(C/3),Z.face.materialIndex=B.materialIndex,Q.push(Z)}}else{let F=Math.max(0,E.start),k=Math.min(K.count,E.start+E.count);for(let B=F,O=k;B<O;B+=3){let N=K.getX(B),_=K.getX(B+1),C=K.getX(B+2);if(Z=H6(this,H,J,$,X,U,G,N,_,C),Z)Z.faceIndex=Math.floor(B/3),Q.push(Z)}}else if(Y!==void 0)if(Array.isArray(H))for(let F=0,k=q.length;F<k;F++){let B=q[F],O=H[B.materialIndex],N=Math.max(B.start,E.start),_=Math.min(Y.count,Math.min(B.start+B.count,E.start+E.count));for(let C=N,D=_;C<D;C+=3){let P=C,I=C+1,w=C+2;if(Z=H6(this,O,J,$,X,U,G,P,I,w),Z)Z.faceIndex=Math.floor(C/3),Z.face.materialIndex=B.materialIndex,Q.push(Z)}}else{let F=Math.max(0,E.start),k=Math.min(Y.count,E.start+E.count);for(let B=F,O=k;B<O;B+=3){let N=B,_=B+1,C=B+2;if(Z=H6(this,H,J,$,X,U,G,N,_,C),Z)Z.faceIndex=Math.floor(B/3),Q.push(Z)}}}}function RY(J,Q,$,Z,W,H,K,Y){let X;if(Q.side===1)X=Z.intersectTriangle(K,H,W,!0,Y);else X=Z.intersectTriangle(W,H,K,Q.side===0,Y);if(X===null)return null;W6.copy(Y),W6.applyMatrix4(J.matrixWorld);let U=$.ray.origin.distanceTo(W6);if(U<$.near||U>$.far)return null;return{distance:U,point:W6.clone(),object:J}}function H6(J,Q,$,Z,W,H,K,Y,X,U){J.getVertexPosition(Y,J6),J.getVertexPosition(X,Q6),J.getVertexPosition(U,$6);let G=RY(J,Q,$,Z,J6,Q6,$6,cZ);if(G){let q=new y;if(oJ.getBarycoord(cZ,J6,Q6,$6,q),W)G.uv=oJ.getInterpolatedAttribute(W,Y,X,U,q,new y0);if(H)G.uv1=oJ.getInterpolatedAttribute(H,Y,X,U,q,new y0);if(K){if(G.normal=oJ.getInterpolatedAttribute(K,Y,X,U,q,new y),G.normal.dot(Z.direction)>0)G.normal.multiplyScalar(-1)}let E={a:Y,b:X,c:U,normal:new y,materialIndex:0};oJ.getNormal(J6,Q6,$6,E.normal),G.face=E,G.barycoord=q}return G}var N7=new a0,nZ=new a0,sZ=new a0,kY=new a0,iZ=new j0,K6=new y,_Q=new lJ,oZ=new j0,CQ=new J7;class h6 extends YJ{constructor(J,Q){super(J,Q);this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode="attached",this.bindMatrix=new j0,this.bindMatrixInverse=new j0,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let J=this.geometry;if(this.boundingBox===null)this.boundingBox=new tJ;this.boundingBox.makeEmpty();let Q=J.getAttribute("position");for(let $=0;$<Q.count;$++)this.getVertexPosition($,K6),this.boundingBox.expandByPoint(K6)}computeBoundingSphere(){let J=this.geometry;if(this.boundingSphere===null)this.boundingSphere=new lJ;this.boundingSphere.makeEmpty();let Q=J.getAttribute("position");for(let $=0;$<Q.count;$++)this.getVertexPosition($,K6),this.boundingSphere.expandByPoint(K6)}copy(J,Q){if(super.copy(J,Q),this.bindMode=J.bindMode,this.bindMatrix.copy(J.bindMatrix),this.bindMatrixInverse.copy(J.bindMatrixInverse),this.skeleton=J.skeleton,J.boundingBox!==null)this.boundingBox=J.boundingBox.clone();if(J.boundingSphere!==null)this.boundingSphere=J.boundingSphere.clone();return this}raycast(J,Q){let $=this.material,Z=this.matrixWorld;if($===void 0)return;if(this.boundingSphere===null)this.computeBoundingSphere();if(_Q.copy(this.boundingSphere),_Q.applyMatrix4(Z),J.ray.intersectsSphere(_Q)===!1)return;if(oZ.copy(Z).invert(),CQ.copy(J.ray).applyMatrix4(oZ),this.boundingBox!==null){if(CQ.intersectsBox(this.boundingBox)===!1)return}this._computeIntersections(J,Q,CQ)}getVertexPosition(J,Q){return super.getVertexPosition(J,Q),this.applyBoneTransform(J,Q),Q}bind(J,Q){if(this.skeleton=J,Q===void 0)this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),Q=this.matrixWorld;this.bindMatrix.copy(Q),this.bindMatrixInverse.copy(Q).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let J=new a0,Q=this.geometry.attributes.skinWeight;for(let $=0,Z=Q.count;$<Z;$++){J.fromBufferAttribute(Q,$);let W=1/J.manhattanLength();if(W!==1/0)J.multiplyScalar(W);else J.set(1,0,0,0);Q.setXYZW($,J.x,J.y,J.z,J.w)}}updateMatrixWorld(J){if(super.updateMatrixWorld(J),this.bindMode==="attached")this.bindMatrixInverse.copy(this.matrixWorld).invert();else if(this.bindMode==="detached")this.bindMatrixInverse.copy(this.bindMatrix).invert();else M0("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(J,Q){let $=this.skeleton,Z=this.geometry;if(nZ.fromBufferAttribute(Z.attributes.skinIndex,J),sZ.fromBufferAttribute(Z.attributes.skinWeight,J),Q.isVector4)N7.copy(Q),Q.set(0,0,0,0);else N7.set(...Q,1),Q.set(0,0,0);N7.applyMatrix4(this.bindMatrix);for(let W=0;W<4;W++){let H=sZ.getComponent(W);if(H!==0){let K=nZ.getComponent(W);iZ.multiplyMatrices($.bones[K].matrixWorld,$.boneInverses[K]),Q.addScaledVector(kY.copy(N7).applyMatrix4(iZ),H)}}if(Q.isVector4)Q.w=N7.w;return Q.applyMatrix4(this.bindMatrixInverse)}}class A7 extends t0{constructor(){super();this.isBone=!0,this.type="Bone"}}class T7 extends FJ{constructor(J=null,Q=1,$=1,Z,W,H,K,Y,X=1003,U=1003,G,q){super(null,H,K,Y,X,U,Z,W,G,q);this.isDataTexture=!0,this.image={data:J,width:Q,height:$},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}var aZ=new j0,LY=new j0;class S7{constructor(J=[],Q=[]){this.uuid=H9(),this.bones=J.slice(0),this.boneInverses=Q,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let J=this.bones,Q=this.boneInverses;if(this.boneMatrices=new Float32Array(J.length*16),Q.length===0)this.calculateInverses();else if(J.length!==Q.length){M0("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let $=0,Z=this.bones.length;$<Z;$++)this.boneInverses.push(new j0)}}calculateInverses(){this.boneInverses.length=0;for(let J=0,Q=this.bones.length;J<Q;J++){let $=new j0;if(this.bones[J])$.copy(this.bones[J].matrixWorld).invert();this.boneInverses.push($)}}pose(){for(let J=0,Q=this.bones.length;J<Q;J++){let $=this.bones[J];if($)$.matrixWorld.copy(this.boneInverses[J]).invert()}for(let J=0,Q=this.bones.length;J<Q;J++){let $=this.bones[J];if($){if($.parent&&$.parent.isBone)$.matrix.copy($.parent.matrixWorld).invert(),$.matrix.multiply($.matrixWorld);else $.matrix.copy($.matrixWorld);$.matrix.decompose($.position,$.quaternion,$.scale)}}}update(){let J=this.bones,Q=this.boneInverses,$=this.boneMatrices,Z=this.boneTexture;for(let W=0,H=J.length;W<H;W++){let K=J[W]?J[W].matrixWorld:LY;aZ.multiplyMatrices(K,Q[W]),aZ.toArray($,W*16)}if(Z!==null)Z.needsUpdate=!0}clone(){return new S7(this.bones,this.boneInverses)}computeBoneTexture(){let J=Math.sqrt(this.bones.length*4);J=Math.ceil(J/4)*4,J=Math.max(J,4);let Q=new Float32Array(J*J*4);Q.set(this.boneMatrices);let $=new T7(Q,J,J,1023,1015);return $.needsUpdate=!0,this.boneMatrices=Q,this.boneTexture=$,this}getBoneByName(J){for(let Q=0,$=this.bones.length;Q<$;Q++){let Z=this.bones[Q];if(Z.name===J)return Z}return}dispose(){if(this.boneTexture!==null)this.boneTexture.dispose(),this.boneTexture=null}fromJSON(J,Q){this.uuid=J.uuid;for(let $=0,Z=J.bones.length;$<Z;$++){let W=J.bones[$],H=Q[W];if(H===void 0)M0("Skeleton: No bone found with UUID:",W),H=new A7;this.bones.push(H),this.boneInverses.push(new j0().fromArray(J.boneInverses[$]))}return this.init(),this}toJSON(){let J={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};J.uuid=this.uuid;let Q=this.bones,$=this.boneInverses;for(let Z=0,W=Q.length;Z<W;Z++){let H=Q[Z];J.bones.push(H.uuid);let K=$[Z];J.boneInverses.push(K.toArray())}return J}}class G8 extends DJ{constructor(J,Q,$,Z=1){super(J,Q,$);this.isInstancedBufferAttribute=!0,this.meshPerAttribute=Z}copy(J){return super.copy(J),this.meshPerAttribute=J.meshPerAttribute,this}toJSON(){let J=super.toJSON();return J.meshPerAttribute=this.meshPerAttribute,J.isInstancedBufferAttribute=!0,J}}var f8=new j0,rZ=new j0,Y6=[],tZ=new tJ,DY=new j0,F7=new YJ,O7=new lJ;class Q7 extends YJ{constructor(J,Q,$){super(J,Q);this.isInstancedMesh=!0,this.instanceMatrix=new G8(new Float32Array($*16),16),this.instanceColor=null,this.morphTexture=null,this.count=$,this.boundingBox=null,this.boundingSphere=null;for(let Z=0;Z<$;Z++)this.setMatrixAt(Z,DY)}computeBoundingBox(){let J=this.geometry,Q=this.count;if(this.boundingBox===null)this.boundingBox=new tJ;if(J.boundingBox===null)J.computeBoundingBox();this.boundingBox.makeEmpty();for(let $=0;$<Q;$++)this.getMatrixAt($,f8),tZ.copy(J.boundingBox).applyMatrix4(f8),this.boundingBox.union(tZ)}computeBoundingSphere(){let J=this.geometry,Q=this.count;if(this.boundingSphere===null)this.boundingSphere=new lJ;if(J.boundingSphere===null)J.computeBoundingSphere();this.boundingSphere.makeEmpty();for(let $=0;$<Q;$++)this.getMatrixAt($,f8),O7.copy(J.boundingSphere).applyMatrix4(f8),this.boundingSphere.union(O7)}copy(J,Q){if(super.copy(J,Q),this.instanceMatrix.copy(J.instanceMatrix),J.morphTexture!==null)this.morphTexture=J.morphTexture.clone();if(J.instanceColor!==null)this.instanceColor=J.instanceColor.clone();if(this.count=J.count,J.boundingBox!==null)this.boundingBox=J.boundingBox.clone();if(J.boundingSphere!==null)this.boundingSphere=J.boundingSphere.clone();return this}getColorAt(J,Q){if(this.instanceColor===null)return Q.setRGB(1,1,1);else return Q.fromArray(this.instanceColor.array,J*3)}getMatrixAt(J,Q){return Q.fromArray(this.instanceMatrix.array,J*16)}getMorphAt(J,Q){let $=Q.morphTargetInfluences,Z=this.morphTexture.source.data.data,W=$.length+1,H=J*W+1;for(let K=0;K<$.length;K++)$[K]=Z[H+K]}raycast(J,Q){let $=this.matrixWorld,Z=this.count;if(F7.geometry=this.geometry,F7.material=this.material,F7.material===void 0)return;if(this.boundingSphere===null)this.computeBoundingSphere();if(O7.copy(this.boundingSphere),O7.applyMatrix4($),J.ray.intersectsSphere(O7)===!1)return;for(let W=0;W<Z;W++){this.getMatrixAt(W,f8),rZ.multiplyMatrices($,f8),F7.matrixWorld=rZ,F7.raycast(J,Y6);for(let H=0,K=Y6.length;H<K;H++){let Y=Y6[H];Y.instanceId=W,Y.object=this,Q.push(Y)}Y6.length=0}}setColorAt(J,Q){if(this.instanceColor===null)this.instanceColor=new G8(new Float32Array(this.instanceMatrix.count*3).fill(1),3);return Q.toArray(this.instanceColor.array,J*3),this}setMatrixAt(J,Q){return Q.toArray(this.instanceMatrix.array,J*16),this}setMorphAt(J,Q){let $=Q.morphTargetInfluences,Z=$.length+1;if(this.morphTexture===null)this.morphTexture=new T7(new Float32Array(Z*this.count),Z,this.count,1028,1015);let W=this.morphTexture.source.data.data,H=0;for(let X=0;X<$.length;X++)H+=$[X];let K=this.geometry.morphTargetsRelative?1:1-H,Y=Z*J;return W[Y]=K,W.set($,Y+1),this}updateMorphTargets(){}dispose(){if(this.dispatchEvent({type:"dispose"}),this.morphTexture!==null)this.morphTexture.dispose(),this.morphTexture=null}}var PQ=new y,VY=new y,MY=new T0;class T9{constructor(J=new y(1,0,0),Q=0){this.isPlane=!0,this.normal=J,this.constant=Q}set(J,Q){return this.normal.copy(J),this.constant=Q,this}setComponents(J,Q,$,Z){return this.normal.set(J,Q,$),this.constant=Z,this}setFromNormalAndCoplanarPoint(J,Q){return this.normal.copy(J),this.constant=-Q.dot(this.normal),this}setFromCoplanarPoints(J,Q,$){let Z=PQ.subVectors($,Q).cross(VY.subVectors(J,Q)).normalize();return this.setFromNormalAndCoplanarPoint(Z,J),this}copy(J){return this.normal.copy(J.normal),this.constant=J.constant,this}normalize(){let J=1/this.normal.length();return this.normal.multiplyScalar(J),this.constant*=J,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(J){return this.normal.dot(J)+this.constant}distanceToSphere(J){return this.distanceToPoint(J.center)-J.radius}projectPoint(J,Q){return Q.copy(J).addScaledVector(this.normal,-this.distanceToPoint(J))}intersectLine(J,Q,$=!0){let Z=J.delta(PQ),W=this.normal.dot(Z);if(W===0){if(this.distanceToPoint(J.start)===0)return Q.copy(J.start);return null}let H=-(J.start.dot(this.normal)+this.constant)/W;if($===!0&&(H<0||H>1))return null;return Q.copy(J.start).addScaledVector(Z,H)}intersectsLine(J){let Q=this.distanceToPoint(J.start),$=this.distanceToPoint(J.end);return Q<0&&$>0||$<0&&Q>0}intersectsBox(J){return J.intersectsPlane(this)}intersectsSphere(J){return J.intersectsPlane(this)}coplanarPoint(J){return J.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(J,Q){let $=Q||MY.getNormalMatrix(J),Z=this.coplanarPoint(PQ).applyMatrix4(J),W=this.normal.applyMatrix3($).normalize();return this.constant=-Z.dot(W),this}translate(J){return this.constant-=J.dot(this.normal),this}equals(J){return J.normal.equals(this.normal)&&J.constant===this.constant}clone(){return new this.constructor().copy(this)}}var Y8=new lJ,BY=new y0(0.5,0.5),X6=new y;class j7{constructor(J=new T9,Q=new T9,$=new T9,Z=new T9,W=new T9,H=new T9){this.planes=[J,Q,$,Z,W,H]}set(J,Q,$,Z,W,H){let K=this.planes;return K[0].copy(J),K[1].copy(Q),K[2].copy($),K[3].copy(Z),K[4].copy(W),K[5].copy(H),this}copy(J){let Q=this.planes;for(let $=0;$<6;$++)Q[$].copy(J.planes[$]);return this}setFromProjectionMatrix(J,Q=2000,$=!1){let Z=this.planes,W=J.elements,H=W[0],K=W[1],Y=W[2],X=W[3],U=W[4],G=W[5],q=W[6],E=W[7],F=W[8],k=W[9],B=W[10],O=W[11],N=W[12],_=W[13],C=W[14],D=W[15];if(Z[0].setComponents(X-H,E-U,O-F,D-N).normalize(),Z[1].setComponents(X+H,E+U,O+F,D+N).normalize(),Z[2].setComponents(X+K,E+G,O+k,D+_).normalize(),Z[3].setComponents(X-K,E-G,O-k,D-_).normalize(),$)Z[4].setComponents(Y,q,B,C).normalize(),Z[5].setComponents(X-Y,E-q,O-B,D-C).normalize();else if(Z[4].setComponents(X-Y,E-q,O-B,D-C).normalize(),Q===2000)Z[5].setComponents(X+Y,E+q,O+B,D+C).normalize();else if(Q===2001)Z[5].setComponents(Y,q,B,C).normalize();else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+Q);return this}intersectsObject(J){if(J.boundingSphere!==void 0){if(J.boundingSphere===null)J.computeBoundingSphere();Y8.copy(J.boundingSphere).applyMatrix4(J.matrixWorld)}else{let Q=J.geometry;if(Q.boundingSphere===null)Q.computeBoundingSphere();Y8.copy(Q.boundingSphere).applyMatrix4(J.matrixWorld)}return this.intersectsSphere(Y8)}intersectsSprite(J){Y8.center.set(0,0,0);let Q=BY.distanceTo(J.center);return Y8.radius=0.7071067811865476+Q,Y8.applyMatrix4(J.matrixWorld),this.intersectsSphere(Y8)}intersectsSphere(J){let Q=this.planes,$=J.center,Z=-J.radius;for(let W=0;W<6;W++)if(Q[W].distanceToPoint($)<Z)return!1;return!0}intersectsBox(J){let Q=this.planes;for(let $=0;$<6;$++){let Z=Q[$];if(X6.x=Z.normal.x>0?J.max.x:J.min.x,X6.y=Z.normal.y>0?J.max.y:J.min.y,X6.z=Z.normal.z>0?J.max.z:J.min.z,Z.distanceToPoint(X6)<0)return!1}return!0}containsPoint(J){let Q=this.planes;for(let $=0;$<6;$++)if(Q[$].distanceToPoint(J)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class v7 extends fJ{constructor(J){super();this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new I0(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.linewidth=J.linewidth,this.linecap=J.linecap,this.linejoin=J.linejoin,this.fog=J.fog,this}}var R6=new y,k6=new y,eZ=new j0,R7=new J7,U6=new lJ,IQ=new y,JW=new y;class $7 extends t0{constructor(J=new yJ,Q=new v7){super();this.isLine=!0,this.type="Line",this.geometry=J,this.material=Q,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(J,Q){return super.copy(J,Q),this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}computeLineDistances(){let J=this.geometry;if(J.index===null){let Q=J.attributes.position,$=[0];for(let Z=1,W=Q.count;Z<W;Z++)R6.fromBufferAttribute(Q,Z-1),k6.fromBufferAttribute(Q,Z),$[Z]=$[Z-1],$[Z]+=R6.distanceTo(k6);J.setAttribute("lineDistance",new hJ($,1))}else M0("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(J,Q){let $=this.geometry,Z=this.matrixWorld,W=J.params.Line.threshold,H=$.drawRange;if($.boundingSphere===null)$.computeBoundingSphere();if(U6.copy($.boundingSphere),U6.applyMatrix4(Z),U6.radius+=W,J.ray.intersectsSphere(U6)===!1)return;eZ.copy(Z).invert(),R7.copy(J.ray).applyMatrix4(eZ);let K=W/((this.scale.x+this.scale.y+this.scale.z)/3),Y=K*K,X=this.isLineSegments?2:1,U=$.index,q=$.attributes.position;if(U!==null){let E=Math.max(0,H.start),F=Math.min(U.count,H.start+H.count);for(let k=E,B=F-1;k<B;k+=X){let O=U.getX(k),N=U.getX(k+1),_=G6(this,J,R7,Y,O,N,k);if(_)Q.push(_)}if(this.isLineLoop){let k=U.getX(F-1),B=U.getX(E),O=G6(this,J,R7,Y,k,B,F-1);if(O)Q.push(O)}}else{let E=Math.max(0,H.start),F=Math.min(q.count,H.start+H.count);for(let k=E,B=F-1;k<B;k+=X){let O=G6(this,J,R7,Y,k,k+1,k);if(O)Q.push(O)}if(this.isLineLoop){let k=G6(this,J,R7,Y,F-1,E,F-1);if(k)Q.push(k)}}}updateMorphTargets(){let Q=this.geometry.morphAttributes,$=Object.keys(Q);if($.length>0){let Z=Q[$[0]];if(Z!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let W=0,H=Z.length;W<H;W++){let K=Z[W].name||String(W);this.morphTargetInfluences.push(0),this.morphTargetDictionary[K]=W}}}}}function G6(J,Q,$,Z,W,H,K){let Y=J.geometry.attributes.position;if(R6.fromBufferAttribute(Y,W),k6.fromBufferAttribute(Y,H),$.distanceSqToSegment(R6,k6,IQ,JW)>Z)return;IQ.applyMatrix4(J.matrixWorld);let U=Q.ray.origin.distanceTo(IQ);if(U<Q.near||U>Q.far)return;return{distance:U,point:JW.clone().applyMatrix4(J.matrixWorld),index:K,face:null,faceIndex:null,barycoord:null,object:J}}var QW=new y,$W=new y;class f6 extends $7{constructor(J,Q){super(J,Q);this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let J=this.geometry;if(J.index===null){let Q=J.attributes.position,$=[];for(let Z=0,W=Q.count;Z<W;Z+=2)QW.fromBufferAttribute(Q,Z),$W.fromBufferAttribute(Q,Z+1),$[Z]=Z===0?0:$[Z-1],$[Z+1]=$[Z]+QW.distanceTo($W);J.setAttribute("lineDistance",new hJ($,1))}else M0("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class b6 extends $7{constructor(J,Q){super(J,Q);this.isLineLoop=!0,this.type="LineLoop"}}class y7 extends fJ{constructor(J){super();this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new I0(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.alphaMap=J.alphaMap,this.size=J.size,this.sizeAttenuation=J.sizeAttenuation,this.fog=J.fog,this}}var ZW=new j0,TQ=new J7,E6=new lJ,q6=new y;class x6 extends t0{constructor(J=new yJ,Q=new y7){super();this.isPoints=!0,this.type="Points",this.geometry=J,this.material=Q,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(J,Q){return super.copy(J,Q),this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}raycast(J,Q){let $=this.geometry,Z=this.matrixWorld,W=J.params.Points.threshold,H=$.drawRange;if($.boundingSphere===null)$.computeBoundingSphere();if(E6.copy($.boundingSphere),E6.applyMatrix4(Z),E6.radius+=W,J.ray.intersectsSphere(E6)===!1)return;ZW.copy(Z).invert(),TQ.copy(J.ray).applyMatrix4(ZW);let K=W/((this.scale.x+this.scale.y+this.scale.z)/3),Y=K*K,X=$.index,G=$.attributes.position;if(X!==null){let q=Math.max(0,H.start),E=Math.min(X.count,H.start+H.count);for(let F=q,k=E;F<k;F++){let B=X.getX(F);q6.fromBufferAttribute(G,B),WW(q6,B,Y,Z,J,Q,this)}}else{let q=Math.max(0,H.start),E=Math.min(G.count,H.start+H.count);for(let F=q,k=E;F<k;F++)q6.fromBufferAttribute(G,F),WW(q6,F,Y,Z,J,Q,this)}}updateMorphTargets(){let Q=this.geometry.morphAttributes,$=Object.keys(Q);if($.length>0){let Z=Q[$[0]];if(Z!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let W=0,H=Z.length;W<H;W++){let K=Z[W].name||String(W);this.morphTargetInfluences.push(0),this.morphTargetDictionary[K]=W}}}}}function WW(J,Q,$,Z,W,H,K){let Y=TQ.distanceSqToPoint(J);if(Y<$){let X=new y;TQ.closestPointToPoint(J,X),X.applyMatrix4(Z);let U=W.ray.origin.distanceTo(X);if(U<W.near||U>W.far)return;H.push({distance:U,distanceToRay:Math.sqrt(Y),point:X,index:Q,face:null,faceIndex:null,barycoord:null,object:K})}}class g6 extends FJ{constructor(J=[],Q=301,$,Z,W,H,K,Y,X,U){super(J,Q,$,Z,W,H,K,Y,X,U);this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(J){this.image=J}}class p6 extends FJ{constructor(J,Q,$,Z,W,H,K,Y,X){super(J,Q,$,Z,W,H,K,Y,X);this.isCanvasTexture=!0,this.needsUpdate=!0}}class i9 extends FJ{constructor(J,Q,$=1014,Z,W,H,K=1003,Y=1003,X,U=1026,G=1){if(U!==1026&&U!==1027)throw Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let q={width:J,height:Q,depth:G};super(q,Z,W,H,K,Y,U,$,X);this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(J){return super.copy(J),this.source=new P7(Object.assign({},J.image)),this.compareFunction=J.compareFunction,this}toJSON(J){let Q=super.toJSON(J);if(this.compareFunction!==null)Q.compareFunction=this.compareFunction;return Q}}class f$ extends i9{constructor(J,Q=1014,$=301,Z,W,H=1003,K=1003,Y,X=1026){let U={width:J,height:J,depth:1},G=[U,U,U,U,U,U];super(J,J,Q,$,Z,W,H,K,Y,X);this.image=G,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(J){this.image=J}}class l6 extends FJ{constructor(J=null){super();this.sourceTexture=J,this.isExternalTexture=!0}copy(J){return super.copy(J),this.sourceTexture=J.sourceTexture,this}}class o9 extends yJ{constructor(J=1,Q=1,$=1,Z=1,W=1,H=1){super();this.type="BoxGeometry",this.parameters={width:J,height:Q,depth:$,widthSegments:Z,heightSegments:W,depthSegments:H};let K=this;Z=Math.floor(Z),W=Math.floor(W),H=Math.floor(H);let Y=[],X=[],U=[],G=[],q=0,E=0;F("z","y","x",-1,-1,$,Q,J,H,W,0),F("z","y","x",1,-1,$,Q,-J,H,W,1),F("x","z","y",1,1,J,$,Q,Z,H,2),F("x","z","y",1,-1,J,$,-Q,Z,H,3),F("x","y","z",1,-1,J,Q,$,Z,W,4),F("x","y","z",-1,-1,J,Q,-$,Z,W,5),this.setIndex(Y),this.setAttribute("position",new hJ(X,3)),this.setAttribute("normal",new hJ(U,3)),this.setAttribute("uv",new hJ(G,2));function F(k,B,O,N,_,C,D,P,I,w,L){let z=C/I,g=D/w,A=C/2,m=D/2,a=P/2,p=I+1,n=w+1,u=0,h=0,o=new y;for(let r=0;r<n;r++){let W0=r*g-m;for(let L0=0;L0<p;L0++){let E0=L0*z-A;o[k]=E0*N,o[B]=W0*_,o[O]=a,X.push(o.x,o.y,o.z),o[k]=0,o[B]=0,o[O]=P>0?1:-1,U.push(o.x,o.y,o.z),G.push(L0/I),G.push(1-r/w),u+=1}}for(let r=0;r<w;r++)for(let W0=0;W0<I;W0++){let L0=q+W0+p*r,E0=q+W0+p*(r+1),ZJ=q+(W0+1)+p*(r+1),e0=q+(W0+1)+p*r;Y.push(L0,E0,e0),Y.push(E0,ZJ,e0),h+=6}K.addGroup(E,h,L),E+=h,q+=u}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new o9(J.width,J.height,J.depth,J.widthSegments,J.heightSegments,J.depthSegments)}}class k8 extends yJ{constructor(J=1,Q=1,$=1,Z=1){super();this.type="PlaneGeometry",this.parameters={width:J,height:Q,widthSegments:$,heightSegments:Z};let W=J/2,H=Q/2,K=Math.floor($),Y=Math.floor(Z),X=K+1,U=Y+1,G=J/K,q=Q/Y,E=[],F=[],k=[],B=[];for(let O=0;O<U;O++){let N=O*q-H;for(let _=0;_<X;_++){let C=_*G-W;F.push(C,-N,0),k.push(0,0,1),B.push(_/K),B.push(1-O/Y)}}for(let O=0;O<Y;O++)for(let N=0;N<K;N++){let _=N+X*O,C=N+X*(O+1),D=N+1+X*(O+1),P=N+1+X*O;E.push(_,C,P),E.push(C,D,P)}this.setIndex(E),this.setAttribute("position",new hJ(F,3)),this.setAttribute("normal",new hJ(k,3)),this.setAttribute("uv",new hJ(B,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new k8(J.width,J.height,J.widthSegments,J.heightSegments)}}function L8(J){let Q={};for(let $ in J){Q[$]={};for(let Z in J[$]){let W=J[$][Z];if(HW(W))if(W.isRenderTargetTexture)M0("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),Q[$][Z]=null;else Q[$][Z]=W.clone();else if(Array.isArray(W))if(HW(W[0])){let H=[];for(let K=0,Y=W.length;K<Y;K++)H[K]=W[K].clone();Q[$][Z]=H}else Q[$][Z]=W.slice();else Q[$][Z]=W}}return Q}function SJ(J){let Q={};for(let $=0;$<J.length;$++){let Z=L8(J[$]);for(let W in Z)Q[W]=Z[W]}return Q}function HW(J){return J&&(J.isColor||J.isMatrix3||J.isMatrix4||J.isVector2||J.isVector3||J.isVector4||J.isTexture||J.isQuaternion)}function zY(J){let Q=[];for(let $=0;$<J.length;$++)Q.push(J[$].clone());return Q}function b$(J){let Q=J.getRenderTarget();if(Q===null)return J.outputColorSpace;if(Q.isXRRenderTarget===!0)return Q.texture.colorSpace;return b0.workingColorSpace}var EH={clone:L8,merge:SJ},_Y=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,CY=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class eJ extends fJ{constructor(J){super();if(this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=_Y,this.fragmentShader=CY,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,J!==void 0)this.setValues(J)}copy(J){return super.copy(J),this.fragmentShader=J.fragmentShader,this.vertexShader=J.vertexShader,this.uniforms=L8(J.uniforms),this.uniformsGroups=zY(J.uniformsGroups),this.defines=Object.assign({},J.defines),this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.fog=J.fog,this.lights=J.lights,this.clipping=J.clipping,this.extensions=Object.assign({},J.extensions),this.glslVersion=J.glslVersion,this.defaultAttributeValues=Object.assign({},J.defaultAttributeValues),this.index0AttributeName=J.index0AttributeName,this.uniformsNeedUpdate=J.uniformsNeedUpdate,this}toJSON(J){let Q=super.toJSON(J);Q.glslVersion=this.glslVersion,Q.uniforms={};for(let Z in this.uniforms){let H=this.uniforms[Z].value;if(H&&H.isTexture)Q.uniforms[Z]={type:"t",value:H.toJSON(J).uuid};else if(H&&H.isColor)Q.uniforms[Z]={type:"c",value:H.getHex()};else if(H&&H.isVector2)Q.uniforms[Z]={type:"v2",value:H.toArray()};else if(H&&H.isVector3)Q.uniforms[Z]={type:"v3",value:H.toArray()};else if(H&&H.isVector4)Q.uniforms[Z]={type:"v4",value:H.toArray()};else if(H&&H.isMatrix3)Q.uniforms[Z]={type:"m3",value:H.toArray()};else if(H&&H.isMatrix4)Q.uniforms[Z]={type:"m4",value:H.toArray()};else Q.uniforms[Z]={value:H}}if(Object.keys(this.defines).length>0)Q.defines=this.defines;Q.vertexShader=this.vertexShader,Q.fragmentShader=this.fragmentShader,Q.lights=this.lights,Q.clipping=this.clipping;let $={};for(let Z in this.extensions)if(this.extensions[Z]===!0)$[Z]=!0;if(Object.keys($).length>0)Q.extensions=$;return Q}fromJSON(J,Q){if(super.fromJSON(J,Q),J.uniforms!==void 0)for(let $ in J.uniforms){let Z=J.uniforms[$];switch(this.uniforms[$]={},Z.type){case"t":this.uniforms[$].value=Q[Z.value]||null;break;case"c":this.uniforms[$].value=new I0().setHex(Z.value);break;case"v2":this.uniforms[$].value=new y0().fromArray(Z.value);break;case"v3":this.uniforms[$].value=new y().fromArray(Z.value);break;case"v4":this.uniforms[$].value=new a0().fromArray(Z.value);break;case"m3":this.uniforms[$].value=new T0().fromArray(Z.value);break;case"m4":this.uniforms[$].value=new j0().fromArray(Z.value);break;default:this.uniforms[$].value=Z.value}}if(J.defines!==void 0)this.defines=J.defines;if(J.vertexShader!==void 0)this.vertexShader=J.vertexShader;if(J.fragmentShader!==void 0)this.fragmentShader=J.fragmentShader;if(J.glslVersion!==void 0)this.glslVersion=J.glslVersion;if(J.extensions!==void 0)for(let $ in J.extensions)this.extensions[$]=J.extensions[$];if(J.lights!==void 0)this.lights=J.lights;if(J.clipping!==void 0)this.clipping=J.clipping;return this}}class x$ extends eJ{constructor(J){super(J);this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class y9 extends fJ{constructor(J){super();this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new I0(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new I0(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new y0(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new F9,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.defines={STANDARD:""},this.color.copy(J.color),this.roughness=J.roughness,this.metalness=J.metalness,this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.emissive.copy(J.emissive),this.emissiveMap=J.emissiveMap,this.emissiveIntensity=J.emissiveIntensity,this.bumpMap=J.bumpMap,this.bumpScale=J.bumpScale,this.normalMap=J.normalMap,this.normalMapType=J.normalMapType,this.normalScale.copy(J.normalScale),this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.roughnessMap=J.roughnessMap,this.metalnessMap=J.metalnessMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapRotation.copy(J.envMapRotation),this.envMapIntensity=J.envMapIntensity,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.flatShading=J.flatShading,this.fog=J.fog,this}}class dJ extends y9{constructor(J){super();this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new y0(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return p0(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(Q){this.ior=(1+0.4*Q)/(1-0.4*Q)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new I0(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new I0(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new I0(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(J)}get anisotropy(){return this._anisotropy}set anisotropy(J){if(this._anisotropy>0!==J>0)this.version++;this._anisotropy=J}get clearcoat(){return this._clearcoat}set clearcoat(J){if(this._clearcoat>0!==J>0)this.version++;this._clearcoat=J}get iridescence(){return this._iridescence}set iridescence(J){if(this._iridescence>0!==J>0)this.version++;this._iridescence=J}get dispersion(){return this._dispersion}set dispersion(J){if(this._dispersion>0!==J>0)this.version++;this._dispersion=J}get sheen(){return this._sheen}set sheen(J){if(this._sheen>0!==J>0)this.version++;this._sheen=J}get transmission(){return this._transmission}set transmission(J){if(this._transmission>0!==J>0)this.version++;this._transmission=J}copy(J){return super.copy(J),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=J.anisotropy,this.anisotropyRotation=J.anisotropyRotation,this.anisotropyMap=J.anisotropyMap,this.clearcoat=J.clearcoat,this.clearcoatMap=J.clearcoatMap,this.clearcoatRoughness=J.clearcoatRoughness,this.clearcoatRoughnessMap=J.clearcoatRoughnessMap,this.clearcoatNormalMap=J.clearcoatNormalMap,this.clearcoatNormalScale.copy(J.clearcoatNormalScale),this.dispersion=J.dispersion,this.ior=J.ior,this.iridescence=J.iridescence,this.iridescenceMap=J.iridescenceMap,this.iridescenceIOR=J.iridescenceIOR,this.iridescenceThicknessRange=[...J.iridescenceThicknessRange],this.iridescenceThicknessMap=J.iridescenceThicknessMap,this.sheen=J.sheen,this.sheenColor.copy(J.sheenColor),this.sheenColorMap=J.sheenColorMap,this.sheenRoughness=J.sheenRoughness,this.sheenRoughnessMap=J.sheenRoughnessMap,this.transmission=J.transmission,this.transmissionMap=J.transmissionMap,this.thickness=J.thickness,this.thicknessMap=J.thicknessMap,this.attenuationDistance=J.attenuationDistance,this.attenuationColor.copy(J.attenuationColor),this.specularIntensity=J.specularIntensity,this.specularIntensityMap=J.specularIntensityMap,this.specularColor.copy(J.specularColor),this.specularColorMap=J.specularColorMap,this}}class m6 extends fJ{constructor(J){super();this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new I0(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new I0(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new y0(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new F9,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.emissive.copy(J.emissive),this.emissiveMap=J.emissiveMap,this.emissiveIntensity=J.emissiveIntensity,this.bumpMap=J.bumpMap,this.bumpScale=J.bumpScale,this.normalMap=J.normalMap,this.normalMapType=J.normalMapType,this.normalScale.copy(J.normalScale),this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.specularMap=J.specularMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapRotation.copy(J.envMapRotation),this.combine=J.combine,this.reflectivity=J.reflectivity,this.envMapIntensity=J.envMapIntensity,this.refractionRatio=J.refractionRatio,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.flatShading=J.flatShading,this.fog=J.fog,this}}class g$ extends fJ{constructor(J){super();this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(J)}copy(J){return super.copy(J),this.depthPacking=J.depthPacking,this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this}}class p$ extends fJ{constructor(J){super();this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(J)}copy(J){return super.copy(J),this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this}}function N6(J,Q){if(!J||J.constructor===Q)return J;if(typeof Q.BYTES_PER_ELEMENT==="number")return new Q(J);return Array.prototype.slice.call(J)}function PY(J){function Q(W,H){return J[W]-J[H]}let $=J.length,Z=Array($);for(let W=0;W!==$;++W)Z[W]=W;return Z.sort(Q),Z}function KW(J,Q,$){let Z=J.length,W=new J.constructor(Z);for(let H=0,K=0;K!==Z;++H){let Y=$[H]*Q;for(let X=0;X!==Q;++X)W[K++]=J[Y+X]}return W}function IY(J,Q,$,Z){let W=1,H=J[0];while(H!==void 0&&H[Z]===void 0)H=J[W++];if(H===void 0)return;let K=H[Z];if(K===void 0)return;if(Array.isArray(K))do{if(K=H[Z],K!==void 0)Q.push(H.time),$.push(...K);H=J[W++]}while(H!==void 0);else if(K.toArray!==void 0)do{if(K=H[Z],K!==void 0)Q.push(H.time),K.toArray($,$.length);H=J[W++]}while(H!==void 0);else do{if(K=H[Z],K!==void 0)Q.push(H.time),$.push(K);H=J[W++]}while(H!==void 0)}class h9{constructor(J,Q,$,Z){this.parameterPositions=J,this._cachedIndex=0,this.resultBuffer=Z!==void 0?Z:new Q.constructor($),this.sampleValues=Q,this.valueSize=$,this.settings=null,this.DefaultSettings_={}}evaluate(J){let Q=this.parameterPositions,$=this._cachedIndex,Z=Q[$],W=Q[$-1];J:{Q:{let H;$:{Z:if(!(J<Z)){for(let K=$+2;;){if(Z===void 0){if(J<W)break Z;return $=Q.length,this._cachedIndex=$,this.copySampleValue_($-1)}if($===K)break;if(W=Z,Z=Q[++$],J<Z)break Q}H=Q.length;break $}if(!(J>=W)){let K=Q[1];if(J<K)$=2,W=K;for(let Y=$-2;;){if(W===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if($===Y)break;if(Z=W,W=Q[--$-1],J>=W)break Q}H=$,$=0;break $}break J}while($<H){let K=$+H>>>1;if(J<Q[K])H=K;else $=K+1}if(Z=Q[$],W=Q[$-1],W===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(Z===void 0)return $=Q.length,this._cachedIndex=$,this.copySampleValue_($-1)}this._cachedIndex=$,this.intervalChanged_($,W,Z)}return this.interpolate_($,W,J,Z)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(J){let Q=this.resultBuffer,$=this.sampleValues,Z=this.valueSize,W=J*Z;for(let H=0;H!==Z;++H)Q[H]=$[W+H];return Q}interpolate_(){throw Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}}class l$ extends h9{constructor(J,Q,$,Z){super(J,Q,$,Z);this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(J,Q,$){let Z=this.parameterPositions,W=J-2,H=J+1,K=Z[W],Y=Z[H];if(K===void 0)switch(this.getSettings_().endingStart){case 2401:W=J,K=2*Q-$;break;case 2402:W=Z.length-2,K=Q+Z[W]-Z[W+1];break;default:W=J,K=$}if(Y===void 0)switch(this.getSettings_().endingEnd){case 2401:H=J,Y=2*$-Q;break;case 2402:H=1,Y=$+Z[1]-Z[0];break;default:H=J-1,Y=Q}let X=($-Q)*0.5,U=this.valueSize;this._weightPrev=X/(Q-K),this._weightNext=X/(Y-$),this._offsetPrev=W*U,this._offsetNext=H*U}interpolate_(J,Q,$,Z){let W=this.resultBuffer,H=this.sampleValues,K=this.valueSize,Y=J*K,X=Y-K,U=this._offsetPrev,G=this._offsetNext,q=this._weightPrev,E=this._weightNext,F=($-Q)/(Z-Q),k=F*F,B=k*F,O=-q*B+2*q*k-q*F,N=(1+q)*B+(-1.5-2*q)*k+(-0.5+q)*F+1,_=(-1-E)*B+(1.5+E)*k+0.5*F,C=E*B-E*k;for(let D=0;D!==K;++D)W[D]=O*H[U+D]+N*H[X+D]+_*H[Y+D]+C*H[G+D];return W}}class d6 extends h9{constructor(J,Q,$,Z){super(J,Q,$,Z)}interpolate_(J,Q,$,Z){let W=this.resultBuffer,H=this.sampleValues,K=this.valueSize,Y=J*K,X=Y-K,U=($-Q)/(Z-Q),G=1-U;for(let q=0;q!==K;++q)W[q]=H[X+q]*G+H[Y+q]*U;return W}}class m$ extends h9{constructor(J,Q,$,Z){super(J,Q,$,Z)}interpolate_(J){return this.copySampleValue_(J-1)}}class d$ extends h9{interpolate_(J,Q,$,Z){let W=this.resultBuffer,H=this.sampleValues,K=this.valueSize,Y=J*K,X=Y-K,U=this.inTangents,G=this.outTangents;if(!U||!G){let F=($-Q)/(Z-Q),k=1-F;for(let B=0;B!==K;++B)W[B]=H[X+B]*k+H[Y+B]*F;return W}let q=K*2,E=J-1;for(let F=0;F!==K;++F){let k=H[X+F],B=H[Y+F],O=E*q+F*2,N=G[O],_=G[O+1],C=J*q+F*2,D=U[C],P=U[C+1],I=($-Q)/(Z-Q),w,L,z,g,A;for(let m=0;m<8;m++){w=I*I,L=w*I,z=1-I,g=z*z,A=g*z;let p=A*Q+3*g*I*N+3*z*w*D+L*Z-$;if(Math.abs(p)<0.0000000001)break;let n=3*g*(N-Q)+6*z*I*(D-N)+3*w*(Z-D);if(Math.abs(n)<0.0000000001)break;I=I-p/n,I=Math.max(0,Math.min(1,I))}W[F]=A*k+3*g*I*_+3*z*w*P+L*B}return W}}class uJ{constructor(J,Q,$,Z){if(J===void 0)throw Error("THREE.KeyframeTrack: track name is undefined");if(Q===void 0||Q.length===0)throw Error("THREE.KeyframeTrack: no keyframes in track named "+J);this.name=J,this.times=N6(Q,this.TimeBufferType),this.values=N6($,this.ValueBufferType),this.setInterpolation(Z||this.DefaultInterpolation)}static toJSON(J){let Q=J.constructor,$;if(Q.toJSON!==this.toJSON)$=Q.toJSON(J);else{$={name:J.name,times:N6(J.times,Array),values:N6(J.values,Array)};let Z=J.getInterpolation();if(Z!==J.DefaultInterpolation)$.interpolation=Z}return $.type=J.ValueTypeName,$}InterpolantFactoryMethodDiscrete(J){return new m$(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodLinear(J){return new d6(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodSmooth(J){return new l$(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodBezier(J){let Q=new d$(this.times,this.values,this.getValueSize(),J);if(this.settings)Q.inTangents=this.settings.inTangents,Q.outTangents=this.settings.outTangents;return Q}setInterpolation(J){let Q;switch(J){case 2300:Q=this.InterpolantFactoryMethodDiscrete;break;case 2301:Q=this.InterpolantFactoryMethodLinear;break;case 2302:Q=this.InterpolantFactoryMethodSmooth;break;case 2303:Q=this.InterpolantFactoryMethodBezier;break}if(Q===void 0){let $="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(J!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error($);return M0("KeyframeTrack:",$),this}return this.createInterpolant=Q,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302;case this.InterpolantFactoryMethodBezier:return 2303}}getValueSize(){return this.values.length/this.times.length}shift(J){if(J!==0){let Q=this.times;for(let $=0,Z=Q.length;$!==Z;++$)Q[$]+=J}return this}scale(J){if(J!==1){let Q=this.times;for(let $=0,Z=Q.length;$!==Z;++$)Q[$]*=J}return this}trim(J,Q){let $=this.times,Z=$.length,W=0,H=Z-1;while(W!==Z&&$[W]<J)++W;while(H!==-1&&$[H]>Q)--H;if(++H,W!==0||H!==Z){if(W>=H)H=Math.max(H,1),W=H-1;let K=this.getValueSize();this.times=$.slice(W,H),this.values=this.values.slice(W*K,H*K)}return this}validate(){let J=!0,Q=this.getValueSize();if(Q-Math.floor(Q)!==0)A0("KeyframeTrack: Invalid value size in track.",this),J=!1;let $=this.times,Z=this.values,W=$.length;if(W===0)A0("KeyframeTrack: Track is empty.",this),J=!1;let H=null;for(let K=0;K!==W;K++){let Y=$[K];if(typeof Y==="number"&&isNaN(Y)){A0("KeyframeTrack: Time is not a valid number.",this,K,Y),J=!1;break}if(H!==null&&H>Y){A0("KeyframeTrack: Out of order keys.",this,K,Y,H),J=!1;break}H=Y}if(Z!==void 0){if(gK(Z))for(let K=0,Y=Z.length;K!==Y;++K){let X=Z[K];if(isNaN(X)){A0("KeyframeTrack: Value is not a valid number.",this,K,X),J=!1;break}}}return J}optimize(){let J=this.times.slice(),Q=this.values.slice(),$=this.getValueSize(),Z=this.getInterpolation()===2302,W=J.length-1,H=1;for(let K=1;K<W;++K){let Y=!1,X=J[K],U=J[K+1];if(X!==U&&(K!==1||X!==J[0]))if(!Z){let G=K*$,q=G-$,E=G+$;for(let F=0;F!==$;++F){let k=Q[G+F];if(k!==Q[q+F]||k!==Q[E+F]){Y=!0;break}}}else Y=!0;if(Y){if(K!==H){J[H]=J[K];let G=K*$,q=H*$;for(let E=0;E!==$;++E)Q[q+E]=Q[G+E]}++H}}if(W>0){J[H]=J[W];for(let K=W*$,Y=H*$,X=0;X!==$;++X)Q[Y+X]=Q[K+X];++H}if(H!==J.length)this.times=J.slice(0,H),this.values=Q.slice(0,H*$);else this.times=J,this.values=Q;return this}clone(){let J=this.times.slice(),Q=this.values.slice(),Z=new this.constructor(this.name,J,Q);return Z.createInterpolant=this.createInterpolant,Z}}uJ.prototype.ValueTypeName="";uJ.prototype.TimeBufferType=Float32Array;uJ.prototype.ValueBufferType=Float32Array;uJ.prototype.DefaultInterpolation=2301;class a9 extends uJ{constructor(J,Q,$){super(J,Q,$)}}a9.prototype.ValueTypeName="bool";a9.prototype.ValueBufferType=Array;a9.prototype.DefaultInterpolation=2300;a9.prototype.InterpolantFactoryMethodLinear=void 0;a9.prototype.InterpolantFactoryMethodSmooth=void 0;class u6 extends uJ{constructor(J,Q,$,Z){super(J,Q,$,Z)}}u6.prototype.ValueTypeName="color";class r9 extends uJ{constructor(J,Q,$,Z){super(J,Q,$,Z)}}r9.prototype.ValueTypeName="number";class u$ extends h9{constructor(J,Q,$,Z){super(J,Q,$,Z)}interpolate_(J,Q,$,Z){let W=this.resultBuffer,H=this.sampleValues,K=this.valueSize,Y=($-Q)/(Z-Q),X=J*K;for(let U=X+K;X!==U;X+=4)vJ.slerpFlat(W,0,H,X-K,H,X,Y);return W}}class t9 extends uJ{constructor(J,Q,$,Z){super(J,Q,$,Z)}InterpolantFactoryMethodLinear(J){return new u$(this.times,this.values,this.getValueSize(),J)}}t9.prototype.ValueTypeName="quaternion";t9.prototype.InterpolantFactoryMethodSmooth=void 0;class e9 extends uJ{constructor(J,Q,$){super(J,Q,$)}}e9.prototype.ValueTypeName="string";e9.prototype.ValueBufferType=Array;e9.prototype.DefaultInterpolation=2300;e9.prototype.InterpolantFactoryMethodLinear=void 0;e9.prototype.InterpolantFactoryMethodSmooth=void 0;class D8 extends uJ{constructor(J,Q,$,Z){super(J,Q,$,Z)}}D8.prototype.ValueTypeName="vector";class d8{constructor(J="",Q=-1,$=[],Z=2500){if(this.name=J,this.tracks=$,this.duration=Q,this.blendMode=Z,this.uuid=H9(),this.userData={},this.duration<0)this.resetDuration()}static parse(J){let Q=[],$=J.tracks,Z=1/(J.fps||1);for(let H=0,K=$.length;H!==K;++H)Q.push(AY($[H]).scale(Z));let W=new this(J.name,J.duration,Q,J.blendMode);return W.uuid=J.uuid,W.userData=JSON.parse(J.userData||"{}"),W}static toJSON(J){let Q=[],$=J.tracks,Z={name:J.name,duration:J.duration,tracks:Q,uuid:J.uuid,blendMode:J.blendMode,userData:JSON.stringify(J.userData)};for(let W=0,H=$.length;W!==H;++W)Q.push(uJ.toJSON($[W]));return Z}static CreateFromMorphTargetSequence(J,Q,$,Z){let W=Q.length,H=[];for(let K=0;K<W;K++){let Y=[],X=[];Y.push((K+W-1)%W,K,(K+1)%W),X.push(0,1,0);let U=PY(Y);if(Y=KW(Y,1,U),X=KW(X,1,U),!Z&&Y[0]===0)Y.push(W),X.push(X[0]);H.push(new r9(".morphTargetInfluences["+Q[K].name+"]",Y,X).scale(1/$))}return new this(J,-1,H)}static findByName(J,Q){let $=J;if(!Array.isArray(J)){let Z=J;$=Z.geometry&&Z.geometry.animations||Z.animations}for(let Z=0;Z<$.length;Z++)if($[Z].name===Q)return $[Z];return null}static CreateClipsFromMorphTargetSequences(J,Q,$){let Z={},W=/^([\w-]*?)([\d]+)$/;for(let K=0,Y=J.length;K<Y;K++){let X=J[K],U=X.name.match(W);if(U&&U.length>1){let G=U[1],q=Z[G];if(!q)Z[G]=q=[];q.push(X)}}let H=[];for(let K in Z)H.push(this.CreateFromMorphTargetSequence(K,Z[K],Q,$));return H}resetDuration(){let J=this.tracks,Q=0;for(let $=0,Z=J.length;$!==Z;++$){let W=this.tracks[$];Q=Math.max(Q,W.times[W.times.length-1])}return this.duration=Q,this}trim(){for(let J=0;J<this.tracks.length;J++)this.tracks[J].trim(0,this.duration);return this}validate(){let J=!0;for(let Q=0;Q<this.tracks.length;Q++)J=J&&this.tracks[Q].validate();return J}optimize(){for(let J=0;J<this.tracks.length;J++)this.tracks[J].optimize();return this}clone(){let J=[];for(let $=0;$<this.tracks.length;$++)J.push(this.tracks[$].clone());let Q=new this.constructor(this.name,this.duration,J,this.blendMode);return Q.userData=JSON.parse(JSON.stringify(this.userData)),Q}toJSON(){return this.constructor.toJSON(this)}}function wY(J){switch(J.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return r9;case"vector":case"vector2":case"vector3":case"vector4":return D8;case"color":return u6;case"quaternion":return t9;case"bool":case"boolean":return a9;case"string":return e9}throw Error("THREE.KeyframeTrack: Unsupported typeName: "+J)}function AY(J){if(J.type===void 0)throw Error("THREE.KeyframeTrack: track type undefined, can not parse");let Q=wY(J.type);if(J.times===void 0){let $=[],Z=[];IY(J.keys,$,Z,"value"),J.times=$,J.values=Z}if(Q.parse!==void 0)return Q.parse(J);else return new Q(J.name,J.times,J.values,J.interpolation)}var N9={enabled:!1,files:{},add:function(J,Q){if(this.enabled===!1)return;if(YW(J))return;this.files[J]=Q},get:function(J){if(this.enabled===!1)return;if(YW(J))return;return this.files[J]},remove:function(J){delete this.files[J]},clear:function(){this.files={}}};function YW(J){try{let Q=J.slice(J.indexOf(":")+1);return new URL(Q).protocol==="blob:"}catch(Q){return!1}}class c${constructor(J,Q,$){let Z=this,W=!1,H=0,K=0,Y=void 0,X=[];this.onStart=void 0,this.onLoad=J,this.onProgress=Q,this.onError=$,this._abortController=null,this.itemStart=function(U){if(K++,W===!1){if(Z.onStart!==void 0)Z.onStart(U,H,K)}W=!0},this.itemEnd=function(U){if(H++,Z.onProgress!==void 0)Z.onProgress(U,H,K);if(H===K){if(W=!1,Z.onLoad!==void 0)Z.onLoad()}},this.itemError=function(U){if(Z.onError!==void 0)Z.onError(U)},this.resolveURL=function(U){if(U=U.normalize("NFC"),Y)return Y(U);return U},this.setURLModifier=function(U){return Y=U,this},this.addHandler=function(U,G){return X.push(U,G),this},this.removeHandler=function(U){let G=X.indexOf(U);if(G!==-1)X.splice(G,2);return this},this.getHandler=function(U){for(let G=0,q=X.length;G<q;G+=2){let E=X[G],F=X[G+1];if(E.global)E.lastIndex=0;if(E.test(U))return F}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){if(!this._abortController)this._abortController=new AbortController;return this._abortController}}var qH=new c$;class f9{constructor(J){if(this.manager=J!==void 0?J:qH,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(J,Q){let $=this;return new Promise(function(Z,W){$.load(J,Z,Q,W)})}parse(){}setCrossOrigin(J){return this.crossOrigin=J,this}setWithCredentials(J){return this.withCredentials=J,this}setPath(J){return this.path=J,this}setResourcePath(J){return this.resourcePath=J,this}setRequestHeader(J){return this.requestHeader=J,this}abort(){return this}}f9.DEFAULT_MATERIAL_NAME="__DEFAULT";var A9={};class NH extends Error{constructor(J,Q){super(J);this.response=Q}}class h7 extends f9{constructor(J){super(J);this.mimeType="",this.responseType="",this._abortController=new AbortController}load(J,Q,$,Z){if(J===void 0)J="";if(this.path!==void 0)J=this.path+J;J=this.manager.resolveURL(J);let W=N9.get(`file:${J}`);if(W!==void 0){this.manager.itemStart(J),setTimeout(()=>{if(Q)Q(W);this.manager.itemEnd(J)},0);return}if(A9[J]!==void 0){A9[J].push({onLoad:Q,onProgress:$,onError:Z});return}A9[J]=[],A9[J].push({onLoad:Q,onProgress:$,onError:Z});let H=new Request(J,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any==="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),K=this.mimeType,Y=this.responseType;fetch(H).then((X)=>{if(X.status===200||X.status===0){if(X.status===0)M0("FileLoader: HTTP Status 0 received.");if(typeof ReadableStream>"u"||X.body===void 0||X.body.getReader===void 0)return X;let U=A9[J],G=X.body.getReader(),q=X.headers.get("X-File-Size")||X.headers.get("Content-Length"),E=q?parseInt(q):0,F=E!==0,k=0,B=new ReadableStream({start(O){N();function N(){G.read().then(({done:_,value:C})=>{if(_)O.close();else{k+=C.byteLength;let D=new ProgressEvent("progress",{lengthComputable:F,loaded:k,total:E});for(let P=0,I=U.length;P<I;P++){let w=U[P];if(w.onProgress)w.onProgress(D)}O.enqueue(C),N()}},(_)=>{O.error(_)})}}});return new Response(B)}else throw new NH(`fetch for "${X.url}" responded with ${X.status}: ${X.statusText}`,X)}).then((X)=>{switch(Y){case"arraybuffer":return X.arrayBuffer();case"blob":return X.blob();case"document":return X.text().then((U)=>{return new DOMParser().parseFromString(U,K)});case"json":return X.json();default:if(K==="")return X.text();else{let G=/charset="?([^;"\s]*)"?/i.exec(K),q=G&&G[1]?G[1].toLowerCase():void 0,E=new TextDecoder(q);return X.arrayBuffer().then((F)=>E.decode(F))}}}).then((X)=>{N9.add(`file:${J}`,X);let U=A9[J];delete A9[J];for(let G=0,q=U.length;G<q;G++){let E=U[G];if(E.onLoad)E.onLoad(X)}}).catch((X)=>{let U=A9[J];if(U===void 0)throw this.manager.itemError(J),X;delete A9[J];for(let G=0,q=U.length;G<q;G++){let E=U[G];if(E.onError)E.onError(X)}this.manager.itemError(J)}).finally(()=>{this.manager.itemEnd(J)}),this.manager.itemStart(J)}setResponseType(J){return this.responseType=J,this}setMimeType(J){return this.mimeType=J,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}var b8=new WeakMap;class n$ extends f9{constructor(J){super(J)}load(J,Q,$,Z){if(this.path!==void 0)J=this.path+J;J=this.manager.resolveURL(J);let W=this,H=N9.get(`image:${J}`);if(H!==void 0){if(H.complete===!0)W.manager.itemStart(J),setTimeout(function(){if(Q)Q(H);W.manager.itemEnd(J)},0);else{let G=b8.get(H);if(G===void 0)G=[],b8.set(H,G);G.push({onLoad:Q,onError:Z})}return H}let K=l8("img");function Y(){if(U(),Q)Q(this);let G=b8.get(this)||[];for(let q=0;q<G.length;q++){let E=G[q];if(E.onLoad)E.onLoad(this)}b8.delete(this),W.manager.itemEnd(J)}function X(G){if(U(),Z)Z(G);N9.remove(`image:${J}`);let q=b8.get(this)||[];for(let E=0;E<q.length;E++){let F=q[E];if(F.onError)F.onError(G)}b8.delete(this),W.manager.itemError(J),W.manager.itemEnd(J)}function U(){K.removeEventListener("load",Y,!1),K.removeEventListener("error",X,!1)}if(K.addEventListener("load",Y,!1),K.addEventListener("error",X,!1),J.slice(0,5)!=="data:"){if(this.crossOrigin!==void 0)K.crossOrigin=this.crossOrigin}return N9.add(`image:${J}`,K),W.manager.itemStart(J),K.src=J,K}}class c6 extends f9{constructor(J){super(J)}load(J,Q,$,Z){let W=new FJ,H=new n$(this.manager);return H.setCrossOrigin(this.crossOrigin),H.setPath(this.path),H.load(J,function(K){if(W.image=K,W.needsUpdate=!0,Q!==void 0)Q(W)},$,Z),W}}class Z7 extends t0{constructor(J,Q=1){super();this.isLight=!0,this.type="Light",this.color=new I0(J),this.intensity=Q}dispose(){this.dispatchEvent({type:"dispose"})}copy(J,Q){return super.copy(J,Q),this.color.copy(J.color),this.intensity=J.intensity,this}toJSON(J){let Q=super.toJSON(J);return Q.object.color=this.color.getHex(),Q.object.intensity=this.intensity,Q}}class n6 extends Z7{constructor(J,Q,$){super(J,$);this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(t0.DEFAULT_UP),this.updateMatrix(),this.groundColor=new I0(Q)}copy(J,Q){return super.copy(J,Q),this.groundColor.copy(J.groundColor),this}toJSON(J){let Q=super.toJSON(J);return Q.object.groundColor=this.groundColor.getHex(),Q}}var wQ=new j0,XW=new y,UW=new y;class s6{constructor(J){this.camera=J,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new y0(512,512),this.mapType=1009,this.map=null,this.mapPass=null,this.matrix=new j0,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new j7,this._frameExtents=new y0(1,1),this._viewportCount=1,this._viewports=[new a0(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(J){let Q=this.camera,$=this.matrix;if(XW.setFromMatrixPosition(J.matrixWorld),Q.position.copy(XW),UW.setFromMatrixPosition(J.target.matrixWorld),Q.lookAt(UW),Q.updateMatrixWorld(),wQ.multiplyMatrices(Q.projectionMatrix,Q.matrixWorldInverse),this._frustum.setFromProjectionMatrix(wQ,Q.coordinateSystem,Q.reversedDepth),Q.coordinateSystem===2001||Q.reversedDepth)$.set(0.5,0,0,0.5,0,0.5,0,0.5,0,0,1,0,0,0,0,1);else $.set(0.5,0,0,0.5,0,0.5,0,0.5,0,0,0.5,0.5,0,0,0,1);$.multiply(wQ)}getViewport(J){return this._viewports[J]}getFrameExtents(){return this._frameExtents}dispose(){if(this.map)this.map.dispose();if(this.mapPass)this.mapPass.dispose()}copy(J){return this.camera=J.camera.clone(),this.intensity=J.intensity,this.bias=J.bias,this.radius=J.radius,this.autoUpdate=J.autoUpdate,this.needsUpdate=J.needsUpdate,this.normalBias=J.normalBias,this.blurSamples=J.blurSamples,this.mapSize.copy(J.mapSize),this.biasNode=J.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let J={};if(this.intensity!==1)J.intensity=this.intensity;if(this.bias!==0)J.bias=this.bias;if(this.normalBias!==0)J.normalBias=this.normalBias;if(this.radius!==1)J.radius=this.radius;if(this.mapSize.x!==512||this.mapSize.y!==512)J.mapSize=this.mapSize.toArray();return J.camera=this.camera.toJSON(!1).object,delete J.camera.matrix,J}}var F6=new y,O6=new vJ,E9=new y;class i6 extends t0{constructor(){super();this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new j0,this.projectionMatrix=new j0,this.projectionMatrixInverse=new j0,this.coordinateSystem=2000,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(J,Q){return super.copy(J,Q),this.matrixWorldInverse.copy(J.matrixWorldInverse),this.projectionMatrix.copy(J.projectionMatrix),this.projectionMatrixInverse.copy(J.projectionMatrixInverse),this.coordinateSystem=J.coordinateSystem,this}getWorldDirection(J){return super.getWorldDirection(J).negate()}updateMatrixWorld(J){if(super.updateMatrixWorld(J),this.matrixWorld.decompose(F6,O6,E9),E9.x===1&&E9.y===1&&E9.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(F6,O6,E9.set(1,1,1)).invert()}updateWorldMatrix(J,Q,$=!1){if(super.updateWorldMatrix(J,Q,$),this.matrixWorld.decompose(F6,O6,E9),E9.x===1&&E9.y===1&&E9.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(F6,O6,E9.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}var c9=new y,GW=new y0,EW=new y0;class LJ extends i6{constructor(J=50,Q=1,$=0.1,Z=2000){super();this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=J,this.zoom=1,this.near=$,this.far=Z,this.focus=10,this.aspect=Q,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(J,Q){return super.copy(J,Q),this.fov=J.fov,this.zoom=J.zoom,this.near=J.near,this.far=J.far,this.focus=J.focus,this.aspect=J.aspect,this.view=J.view===null?null:Object.assign({},J.view),this.filmGauge=J.filmGauge,this.filmOffset=J.filmOffset,this}setFocalLength(J){let Q=0.5*this.getFilmHeight()/J;this.fov=U8*2*Math.atan(Q),this.updateProjectionMatrix()}getFocalLength(){let J=Math.tan(k7*0.5*this.fov);return 0.5*this.getFilmHeight()/J}getEffectiveFOV(){return U8*2*Math.atan(Math.tan(k7*0.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(J,Q,$){c9.set(-1,-1,0.5).applyMatrix4(this.projectionMatrixInverse),Q.set(c9.x,c9.y).multiplyScalar(-J/c9.z),c9.set(1,1,0.5).applyMatrix4(this.projectionMatrixInverse),$.set(c9.x,c9.y).multiplyScalar(-J/c9.z)}getViewSize(J,Q){return this.getViewBounds(J,GW,EW),Q.subVectors(EW,GW)}setViewOffset(J,Q,$,Z,W,H){if(this.aspect=J/Q,this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=Q,this.view.offsetX=$,this.view.offsetY=Z,this.view.width=W,this.view.height=H,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=this.near,Q=J*Math.tan(k7*0.5*this.fov)/this.zoom,$=2*Q,Z=this.aspect*$,W=-0.5*Z,H=this.view;if(this.view!==null&&this.view.enabled){let{fullWidth:Y,fullHeight:X}=H;W+=H.offsetX*Z/Y,Q-=H.offsetY*$/X,Z*=H.width/Y,$*=H.height/X}let K=this.filmOffset;if(K!==0)W+=J*K/this.getFilmWidth();this.projectionMatrix.makePerspective(W,W+Z,Q,Q-$,J,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let Q=super.toJSON(J);if(Q.object.fov=this.fov,Q.object.zoom=this.zoom,Q.object.near=this.near,Q.object.far=this.far,Q.object.focus=this.focus,Q.object.aspect=this.aspect,this.view!==null)Q.object.view=Object.assign({},this.view);return Q.object.filmGauge=this.filmGauge,Q.object.filmOffset=this.filmOffset,Q}}class FH extends s6{constructor(){super(new LJ(50,1,0.5,500));this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(J){let Q=this.camera,$=U8*2*J.angle*this.focus,Z=this.mapSize.width/this.mapSize.height*this.aspect,W=J.distance||Q.far;if($!==Q.fov||Z!==Q.aspect||W!==Q.far)Q.fov=$,Q.aspect=Z,Q.far=W,Q.updateProjectionMatrix();super.updateMatrices(J)}copy(J){return super.copy(J),this.focus=J.focus,this}}class o6 extends Z7{constructor(J,Q,$=0,Z=Math.PI/3,W=0,H=2){super(J,Q);this.isSpotLight=!0,this.type="SpotLight",this.position.copy(t0.DEFAULT_UP),this.updateMatrix(),this.target=new t0,this.distance=$,this.angle=Z,this.penumbra=W,this.decay=H,this.map=null,this.shadow=new FH}get power(){return this.intensity*Math.PI}set power(J){this.intensity=J/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(J,Q){return super.copy(J,Q),this.distance=J.distance,this.angle=J.angle,this.penumbra=J.penumbra,this.decay=J.decay,this.target=J.target.clone(),this.map=J.map,this.shadow=J.shadow.clone(),this}toJSON(J){let Q=super.toJSON(J);if(Q.object.distance=this.distance,Q.object.angle=this.angle,Q.object.decay=this.decay,Q.object.penumbra=this.penumbra,Q.object.target=this.target.uuid,this.map&&this.map.isTexture)Q.object.map=this.map.toJSON(J).uuid;return Q.object.shadow=this.shadow.toJSON(),Q}}class OH extends s6{constructor(){super(new LJ(90,1,0.5,500));this.isPointLightShadow=!0}}class W7 extends Z7{constructor(J,Q,$=0,Z=2){super(J,Q);this.isPointLight=!0,this.type="PointLight",this.distance=$,this.decay=Z,this.shadow=new OH}get power(){return this.intensity*4*Math.PI}set power(J){this.intensity=J/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(J,Q){return super.copy(J,Q),this.distance=J.distance,this.decay=J.decay,this.shadow=J.shadow.clone(),this}toJSON(J){let Q=super.toJSON(J);return Q.object.distance=this.distance,Q.object.decay=this.decay,Q.object.shadow=this.shadow.toJSON(),Q}}class V8 extends i6{constructor(J=-1,Q=1,$=1,Z=-1,W=0.1,H=2000){super();this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=J,this.right=Q,this.top=$,this.bottom=Z,this.near=W,this.far=H,this.updateProjectionMatrix()}copy(J,Q){return super.copy(J,Q),this.left=J.left,this.right=J.right,this.top=J.top,this.bottom=J.bottom,this.near=J.near,this.far=J.far,this.zoom=J.zoom,this.view=J.view===null?null:Object.assign({},J.view),this}setViewOffset(J,Q,$,Z,W,H){if(this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=Q,this.view.offsetX=$,this.view.offsetY=Z,this.view.width=W,this.view.height=H,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=(this.right-this.left)/(2*this.zoom),Q=(this.top-this.bottom)/(2*this.zoom),$=(this.right+this.left)/2,Z=(this.top+this.bottom)/2,W=$-J,H=$+J,K=Z+Q,Y=Z-Q;if(this.view!==null&&this.view.enabled){let X=(this.right-this.left)/this.view.fullWidth/this.zoom,U=(this.top-this.bottom)/this.view.fullHeight/this.zoom;W+=X*this.view.offsetX,H=W+X*this.view.width,K-=U*this.view.offsetY,Y=K-U*this.view.height}this.projectionMatrix.makeOrthographic(W,H,K,Y,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let Q=super.toJSON(J);if(Q.object.zoom=this.zoom,Q.object.left=this.left,Q.object.right=this.right,Q.object.top=this.top,Q.object.bottom=this.bottom,Q.object.near=this.near,Q.object.far=this.far,this.view!==null)Q.object.view=Object.assign({},this.view);return Q}}class RH extends s6{constructor(){super(new V8(-5,5,5,-5,0.5,500));this.isDirectionalLightShadow=!0}}class M8 extends Z7{constructor(J,Q){super(J,Q);this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(t0.DEFAULT_UP),this.updateMatrix(),this.target=new t0,this.shadow=new RH}dispose(){super.dispose(),this.shadow.dispose()}copy(J){return super.copy(J),this.target=J.target.clone(),this.shadow=J.shadow.clone(),this}toJSON(J){let Q=super.toJSON(J);return Q.object.shadow=this.shadow.toJSON(),Q.object.target=this.target.uuid,Q}}class J8{static extractUrlBase(J){let Q=J.lastIndexOf("/");if(Q===-1)return"./";return J.slice(0,Q+1)}static resolveURL(J,Q){if(typeof J!=="string"||J==="")return"";if(/^https?:\/\//i.test(Q)&&/^\//.test(J))Q=Q.replace(/(^https?:\/\/[^\/]+).*/i,"$1");if(/^(https?:)?\/\//i.test(J))return J;if(/^data:.*,.*$/i.test(J))return J;if(/^blob:.*$/i.test(J))return J;return Q+J}}var AQ=new WeakMap;class a6 extends f9{constructor(J){super(J);if(this.isImageBitmapLoader=!0,typeof createImageBitmap>"u")M0("ImageBitmapLoader: createImageBitmap() not supported.");if(typeof fetch>"u")M0("ImageBitmapLoader: fetch() not supported.");this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(J){return this.options=J,this}load(J,Q,$,Z){if(J===void 0)J="";if(this.path!==void 0)J=this.path+J;J=this.manager.resolveURL(J);let W=this,H=N9.get(`image-bitmap:${J}`);if(H!==void 0){if(W.manager.itemStart(J),H.then){H.then((X)=>{if(AQ.has(H)===!0){if(Z)Z(AQ.get(H));W.manager.itemError(J),W.manager.itemEnd(J)}else{if(Q)Q(X);W.manager.itemEnd(J)}});return}setTimeout(function(){if(Q)Q(H);W.manager.itemEnd(J)},0);return}let K={};K.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",K.headers=this.requestHeader,K.signal=typeof AbortSignal.any==="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let Y=fetch(J,K).then(function(X){return X.blob()}).then(function(X){return createImageBitmap(X,Object.assign(W.options,{colorSpaceConversion:"none"}))}).then(function(X){if(N9.add(`image-bitmap:${J}`,X),Q)Q(X);W.manager.itemEnd(J)}).catch(function(X){if(Z)Z(X);AQ.set(Y,X),N9.remove(`image-bitmap:${J}`),W.manager.itemError(J),W.manager.itemEnd(J)});N9.add(`image-bitmap:${J}`,Y),W.manager.itemStart(J)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}var x8=-90,g8=1;class s$ extends t0{constructor(J,Q,$){super();this.type="CubeCamera",this.renderTarget=$,this.coordinateSystem=null,this.activeMipmapLevel=0;let Z=new LJ(x8,g8,J,Q);Z.layers=this.layers,this.add(Z);let W=new LJ(x8,g8,J,Q);W.layers=this.layers,this.add(W);let H=new LJ(x8,g8,J,Q);H.layers=this.layers,this.add(H);let K=new LJ(x8,g8,J,Q);K.layers=this.layers,this.add(K);let Y=new LJ(x8,g8,J,Q);Y.layers=this.layers,this.add(Y);let X=new LJ(x8,g8,J,Q);X.layers=this.layers,this.add(X)}updateCoordinateSystem(){let J=this.coordinateSystem,Q=this.children.concat(),[$,Z,W,H,K,Y]=Q;for(let X of Q)this.remove(X);if(J===2000)$.up.set(0,1,0),$.lookAt(1,0,0),Z.up.set(0,1,0),Z.lookAt(-1,0,0),W.up.set(0,0,-1),W.lookAt(0,1,0),H.up.set(0,0,1),H.lookAt(0,-1,0),K.up.set(0,1,0),K.lookAt(0,0,1),Y.up.set(0,1,0),Y.lookAt(0,0,-1);else if(J===2001)$.up.set(0,-1,0),$.lookAt(-1,0,0),Z.up.set(0,-1,0),Z.lookAt(1,0,0),W.up.set(0,0,1),W.lookAt(0,1,0),H.up.set(0,0,-1),H.lookAt(0,-1,0),K.up.set(0,-1,0),K.lookAt(0,0,1),Y.up.set(0,-1,0),Y.lookAt(0,0,-1);else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+J);for(let X of Q)this.add(X),X.updateMatrixWorld()}update(J,Q){if(this.parent===null)this.updateMatrixWorld();let{renderTarget:$,activeMipmapLevel:Z}=this;if(this.coordinateSystem!==J.coordinateSystem)this.coordinateSystem=J.coordinateSystem,this.updateCoordinateSystem();let[W,H,K,Y,X,U]=this.children,G=J.getRenderTarget(),q=J.getActiveCubeFace(),E=J.getActiveMipmapLevel(),F=J.xr.enabled;J.xr.enabled=!1;let k=$.texture.generateMipmaps;$.texture.generateMipmaps=!1;let B=!1;if(J.isWebGLRenderer===!0)B=J.state.buffers.depth.getReversed();else B=J.reversedDepthBuffer;if(J.setRenderTarget($,0,Z),B&&J.autoClear===!1)J.clearDepth();if(J.render(Q,W),J.setRenderTarget($,1,Z),B&&J.autoClear===!1)J.clearDepth();if(J.render(Q,H),J.setRenderTarget($,2,Z),B&&J.autoClear===!1)J.clearDepth();if(J.render(Q,K),J.setRenderTarget($,3,Z),B&&J.autoClear===!1)J.clearDepth();if(J.render(Q,Y),J.setRenderTarget($,4,Z),B&&J.autoClear===!1)J.clearDepth();if(J.render(Q,X),$.texture.generateMipmaps=k,J.setRenderTarget($,5,Z),B&&J.autoClear===!1)J.clearDepth();J.render(Q,U),J.setRenderTarget(G,q,E),J.xr.enabled=F,$.texture.needsPMREMUpdate=!0}}class i$ extends LJ{constructor(J=[]){super();this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=J}}class o${constructor(J,Q,$){this.binding=J,this.valueSize=$;let Z,W,H;switch(Q){case"quaternion":Z=this._slerp,W=this._slerpAdditive,H=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array($*6),this._workIndex=5;break;case"string":case"bool":Z=this._select,W=this._select,H=this._setAdditiveIdentityOther,this.buffer=Array($*5);break;default:Z=this._lerp,W=this._lerpAdditive,H=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array($*5)}this._mixBufferRegion=Z,this._mixBufferRegionAdditive=W,this._setIdentity=H,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(J,Q){let $=this.buffer,Z=this.valueSize,W=J*Z+Z,H=this.cumulativeWeight;if(H===0){for(let K=0;K!==Z;++K)$[W+K]=$[K];H=Q}else{H+=Q;let K=Q/H;this._mixBufferRegion($,W,0,K,Z)}this.cumulativeWeight=H}accumulateAdditive(J){let Q=this.buffer,$=this.valueSize,Z=$*this._addIndex;if(this.cumulativeWeightAdditive===0)this._setIdentity();this._mixBufferRegionAdditive(Q,Z,0,J,$),this.cumulativeWeightAdditive+=J}apply(J){let Q=this.valueSize,$=this.buffer,Z=J*Q+Q,W=this.cumulativeWeight,H=this.cumulativeWeightAdditive,K=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,W<1){let Y=Q*this._origIndex;this._mixBufferRegion($,Z,Y,1-W,Q)}if(H>0)this._mixBufferRegionAdditive($,Z,this._addIndex*Q,1,Q);for(let Y=Q,X=Q+Q;Y!==X;++Y)if($[Y]!==$[Y+Q]){K.setValue($,Z);break}}saveOriginalState(){let J=this.binding,Q=this.buffer,$=this.valueSize,Z=$*this._origIndex;J.getValue(Q,Z);for(let W=$,H=Z;W!==H;++W)Q[W]=Q[Z+W%$];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let J=this.valueSize*3;this.binding.setValue(this.buffer,J)}_setAdditiveIdentityNumeric(){let J=this._addIndex*this.valueSize,Q=J+this.valueSize;for(let $=J;$<Q;$++)this.buffer[$]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let J=this._origIndex*this.valueSize,Q=this._addIndex*this.valueSize;for(let $=0;$<this.valueSize;$++)this.buffer[Q+$]=this.buffer[J+$]}_select(J,Q,$,Z,W){if(Z>=0.5)for(let H=0;H!==W;++H)J[Q+H]=J[$+H]}_slerp(J,Q,$,Z){vJ.slerpFlat(J,Q,J,Q,J,$,Z)}_slerpAdditive(J,Q,$,Z,W){let H=this._workIndex*W;vJ.multiplyQuaternionsFlat(J,H,J,Q,J,$),vJ.slerpFlat(J,Q,J,Q,J,H,Z)}_lerp(J,Q,$,Z,W){let H=1-Z;for(let K=0;K!==W;++K){let Y=Q+K;J[Y]=J[Y]*H+J[$+K]*Z}}_lerpAdditive(J,Q,$,Z,W){for(let H=0;H!==W;++H){let K=Q+H;J[K]=J[K]+J[$+H]*Z}}}var a$="\\[\\]\\.:\\/",TY=new RegExp("["+a$+"]","g"),r$="[^"+a$+"]",SY="[^"+a$.replace("\\.","")+"]",jY=/((?:WC+[\/:])*)/.source.replace("WC",r$),vY=/(WCOD+)?/.source.replace("WCOD",SY),yY=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",r$),hY=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",r$),fY=new RegExp("^"+jY+vY+yY+hY+"$"),bY=["material","materials","bones","map"];class kH{constructor(J,Q,$){let Z=$||s0.parseTrackName(Q);this._targetGroup=J,this._bindings=J.subscribe_(Q,Z)}getValue(J,Q){this.bind();let $=this._targetGroup.nCachedObjects_,Z=this._bindings[$];if(Z!==void 0)Z.getValue(J,Q)}setValue(J,Q){let $=this._bindings;for(let Z=this._targetGroup.nCachedObjects_,W=$.length;Z!==W;++Z)$[Z].setValue(J,Q)}bind(){let J=this._bindings;for(let Q=this._targetGroup.nCachedObjects_,$=J.length;Q!==$;++Q)J[Q].bind()}unbind(){let J=this._bindings;for(let Q=this._targetGroup.nCachedObjects_,$=J.length;Q!==$;++Q)J[Q].unbind()}}class s0{constructor(J,Q,$){this.path=Q,this.parsedPath=$||s0.parseTrackName(Q),this.node=s0.findNode(J,this.parsedPath.nodeName),this.rootNode=J,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(J,Q,$){if(!(J&&J.isAnimationObjectGroup))return new s0(J,Q,$);else return new s0.Composite(J,Q,$)}static sanitizeNodeName(J){return J.replace(/\s/g,"_").replace(TY,"")}static parseTrackName(J){let Q=fY.exec(J);if(Q===null)throw Error("THREE.PropertyBinding: Cannot parse trackName: "+J);let $={nodeName:Q[2],objectName:Q[3],objectIndex:Q[4],propertyName:Q[5],propertyIndex:Q[6]},Z=$.nodeName&&$.nodeName.lastIndexOf(".");if(Z!==void 0&&Z!==-1){let W=$.nodeName.substring(Z+1);if(bY.indexOf(W)!==-1)$.nodeName=$.nodeName.substring(0,Z),$.objectName=W}if($.propertyName===null||$.propertyName.length===0)throw Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+J);return $}static findNode(J,Q){if(Q===void 0||Q===""||Q==="."||Q===-1||Q===J.name||Q===J.uuid)return J;if(J.skeleton){let $=J.skeleton.getBoneByName(Q);if($!==void 0)return $}if(J.children){let $=function(W){for(let H=0;H<W.length;H++){let K=W[H];if(K.name===Q||K.uuid===Q)return K;let Y=$(K.children);if(Y)return Y}return null},Z=$(J.children);if(Z)return Z}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(J,Q){J[Q]=this.targetObject[this.propertyName]}_getValue_array(J,Q){let $=this.resolvedProperty;for(let Z=0,W=$.length;Z!==W;++Z)J[Q++]=$[Z]}_getValue_arrayElement(J,Q){J[Q]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(J,Q){this.resolvedProperty.toArray(J,Q)}_setValue_direct(J,Q){this.targetObject[this.propertyName]=J[Q]}_setValue_direct_setNeedsUpdate(J,Q){this.targetObject[this.propertyName]=J[Q],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(J,Q){this.targetObject[this.propertyName]=J[Q],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(J,Q){let $=this.resolvedProperty;for(let Z=0,W=$.length;Z!==W;++Z)$[Z]=J[Q++]}_setValue_array_setNeedsUpdate(J,Q){let $=this.resolvedProperty;for(let Z=0,W=$.length;Z!==W;++Z)$[Z]=J[Q++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(J,Q){let $=this.resolvedProperty;for(let Z=0,W=$.length;Z!==W;++Z)$[Z]=J[Q++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q]}_setValue_arrayElement_setNeedsUpdate(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(J,Q){this.resolvedProperty.fromArray(J,Q)}_setValue_fromArray_setNeedsUpdate(J,Q){this.resolvedProperty.fromArray(J,Q),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(J,Q){this.resolvedProperty.fromArray(J,Q),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(J,Q){this.bind(),this.getValue(J,Q)}_setValue_unbound(J,Q){this.bind(),this.setValue(J,Q)}bind(){let J=this.node,Q=this.parsedPath,$=Q.objectName,Z=Q.propertyName,W=Q.propertyIndex;if(!J)J=s0.findNode(this.rootNode,Q.nodeName),this.node=J;if(this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!J){M0("PropertyBinding: No target node found for track: "+this.path+".");return}if($){let X=Q.objectIndex;switch($){case"materials":if(!J.material){A0("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.materials){A0("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}J=J.material.materials;break;case"bones":if(!J.skeleton){A0("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}J=J.skeleton.bones;for(let U=0;U<J.length;U++)if(J[U].name===X){X=U;break}break;case"map":if("map"in J){J=J.map;break}if(!J.material){A0("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.map){A0("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}J=J.material.map;break;default:if(J[$]===void 0){A0("PropertyBinding: Can not bind to objectName of node undefined.",this);return}J=J[$]}if(X!==void 0){if(J[X]===void 0){A0("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,J);return}J=J[X]}}let H=J[Z];if(H===void 0){let X=Q.nodeName;A0("PropertyBinding: Trying to update property for track: "+X+"."+Z+" but it wasn't found.",J);return}let K=this.Versioning.None;if(this.targetObject=J,J.isMaterial===!0)K=this.Versioning.NeedsUpdate;else if(J.isObject3D===!0)K=this.Versioning.MatrixWorldNeedsUpdate;let Y=this.BindingType.Direct;if(W!==void 0){if(Z==="morphTargetInfluences"){if(!J.geometry){A0("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!J.geometry.morphAttributes){A0("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}if(J.morphTargetDictionary[W]!==void 0)W=J.morphTargetDictionary[W]}Y=this.BindingType.ArrayElement,this.resolvedProperty=H,this.propertyIndex=W}else if(H.fromArray!==void 0&&H.toArray!==void 0)Y=this.BindingType.HasFromToArray,this.resolvedProperty=H;else if(Array.isArray(H))Y=this.BindingType.EntireArray,this.resolvedProperty=H;else this.propertyName=Z;this.getValue=this.GetterByBindingType[Y],this.setValue=this.SetterByBindingTypeAndVersioning[Y][K]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}s0.Composite=kH;s0.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};s0.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};s0.prototype.GetterByBindingType=[s0.prototype._getValue_direct,s0.prototype._getValue_array,s0.prototype._getValue_arrayElement,s0.prototype._getValue_toArray];s0.prototype.SetterByBindingTypeAndVersioning=[[s0.prototype._setValue_direct,s0.prototype._setValue_direct_setNeedsUpdate,s0.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[s0.prototype._setValue_array,s0.prototype._setValue_array_setNeedsUpdate,s0.prototype._setValue_array_setMatrixWorldNeedsUpdate],[s0.prototype._setValue_arrayElement,s0.prototype._setValue_arrayElement_setNeedsUpdate,s0.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[s0.prototype._setValue_fromArray,s0.prototype._setValue_fromArray_setNeedsUpdate,s0.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class t${constructor(J,Q,$=null,Z=Q.blendMode){this._mixer=J,this._clip=Q,this._localRoot=$,this.blendMode=Z;let W=Q.tracks,H=W.length,K=Array(H),Y={endingStart:2400,endingEnd:2400};for(let X=0;X!==H;++X){let U=W[X].createInterpolant(null);K[X]=U,U.settings=Y}this._interpolantSettings=Y,this._interpolants=K,this._propertyBindings=Array(H),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._restoreTimeScale=null,this._weightInterpolant=null,this.loop=2201,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(J){return this._startTime=J,this}setLoop(J,Q){return this.loop=J,this.repetitions=Q,this}setEffectiveWeight(J){return this.weight=J,this._effectiveWeight=this.enabled?J:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(J){return this._scheduleFading(J,0,1)}fadeOut(J){return this._scheduleFading(J,1,0)}crossFadeFrom(J,Q,$=!1){if(J.fadeOut(Q),this.fadeIn(Q),$===!0){let Z=this._clip.duration,W=J._clip.duration,H=W/Z,K=Z/W;J._restoreTimeScale=J.timeScale,this._restoreTimeScale=this.timeScale,J.warp(1,H,Q),this.warp(K,1,Q)}return this}crossFadeTo(J,Q,$=!1){return J.crossFadeFrom(this,Q,$)}stopFading(){let J=this._weightInterpolant;if(J!==null)this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(J);return this}setEffectiveTimeScale(J){return this.timeScale=J,this._effectiveTimeScale=this.paused?0:J,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(J){return this.timeScale=this._clip.duration/J,this.stopWarping()}syncWith(J){return this.time=J.time,this.timeScale=J.timeScale,this.stopWarping()}halt(J){return this.warp(this._effectiveTimeScale,0,J)}warp(J,Q,$){let Z=this._mixer,W=Z.time,H=this.timeScale,K=this._timeScaleInterpolant;if(K===null)K=Z._lendControlInterpolant(),this._timeScaleInterpolant=K;let{parameterPositions:Y,sampleValues:X}=K;return Y[0]=W,Y[1]=W+$,X[0]=J/H,X[1]=Q/H,this}stopWarping(){let J=this._timeScaleInterpolant;if(J!==null)this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(J);return this._restoreTimeScale=null,this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(J,Q,$,Z){if(!this.enabled){this._updateWeight(J);return}let W=this._startTime;if(W!==null){let Y=(J-W)*$;if(Y<0||$===0)Q=0;else this._startTime=null,Q=$*Y}Q*=this._updateTimeScale(J);let H=this._updateTime(Q),K=this._updateWeight(J);if(K>0){let Y=this._interpolants,X=this._propertyBindings;switch(this.blendMode){case 2501:for(let U=0,G=Y.length;U!==G;++U)Y[U].evaluate(H),X[U].accumulateAdditive(K);break;case 2500:default:for(let U=0,G=Y.length;U!==G;++U)Y[U].evaluate(H),X[U].accumulate(Z,K)}}}_updateWeight(J){let Q=0;if(this.enabled){Q=this.weight;let $=this._weightInterpolant;if($!==null){let Z=$.evaluate(J)[0];if(Q*=Z,J>$.parameterPositions[1]){if(this.stopFading(),Z===0)this.enabled=!1}}}return this._effectiveWeight=Q,Q}_updateTimeScale(J){let Q=0;if(!this.paused){Q=this.timeScale;let $=this._timeScaleInterpolant;if($!==null){let Z=$.evaluate(J)[0];if(Q*=Z,J>$.parameterPositions[1]){if(Q===0)this.paused=!0;else{if(this._restoreTimeScale!==null)Q=this._restoreTimeScale;this.timeScale=Q}this.stopWarping()}}}return this._effectiveTimeScale=Q,Q}_updateTime(J){let Q=this._clip.duration,$=this.loop,Z=this.time+J,W=this._loopCount,H=$===2202;if(J===0){if(W===-1)return Z;return H&&(W&1)===1?Q-Z:Z}if($===2200){if(W===-1)this._loopCount=0,this._setEndings(!0,!0,!1);J:{if(Z>=Q)Z=Q;else if(Z<0)Z=0;else{this.time=Z;break J}if(this.clampWhenFinished)this.paused=!0;else this.enabled=!1;this.time=Z,this._mixer.dispatchEvent({type:"finished",action:this,direction:J<0?-1:1})}}else{if(W===-1)if(J>=0)W=0,this._setEndings(!0,this.repetitions===0,H);else this._setEndings(this.repetitions===0,!0,H);if(Z>=Q||Z<0){let K=Math.floor(Z/Q);Z-=Q*K,W+=Math.abs(K);let Y=this.repetitions-W;if(Y<=0){if(this.clampWhenFinished)this.paused=!0;else this.enabled=!1;Z=J>0?Q:0,this.time=Z,this._mixer.dispatchEvent({type:"finished",action:this,direction:J>0?1:-1})}else{if(Y===1){let X=J<0;this._setEndings(X,!X,H)}else this._setEndings(!1,!1,H);this._loopCount=W,this.time=Z,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:K})}}else this._loopCount=W,this.time=Z;if(H&&(W&1)===1)return Q-Z}return Z}_setEndings(J,Q,$){let Z=this._interpolantSettings;if($)Z.endingStart=2401,Z.endingEnd=2401;else{if(J)Z.endingStart=this.zeroSlopeAtStart?2401:2400;else Z.endingStart=2402;if(Q)Z.endingEnd=this.zeroSlopeAtEnd?2401:2400;else Z.endingEnd=2402}}_scheduleFading(J,Q,$){let Z=this._mixer,W=Z.time,H=this._weightInterpolant;if(H===null)H=Z._lendControlInterpolant(),this._weightInterpolant=H;let{parameterPositions:K,sampleValues:Y}=H;return K[0]=W,Y[0]=Q,K[1]=W+J,Y[1]=$,this}}var xY=new Float32Array(1);class r6 extends D9{constructor(J){super();if(this._root=J,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(J,Q){let $=J._localRoot||this._root,Z=J._clip.tracks,W=Z.length,H=J._propertyBindings,K=J._interpolants,Y=$.uuid,X=this._bindingsByRootAndName,U=X[Y];if(U===void 0)U={},X[Y]=U;for(let G=0;G!==W;++G){let q=Z[G],E=q.name,F=U[E];if(F!==void 0)++F.referenceCount,H[G]=F;else{if(F=H[G],F!==void 0){if(F._cacheIndex===null)++F.referenceCount,this._addInactiveBinding(F,Y,E);continue}let k=Q&&Q._propertyBindings[G].binding.parsedPath;F=new o$(s0.create($,E,k),q.ValueTypeName,q.getValueSize()),++F.referenceCount,this._addInactiveBinding(F,Y,E),H[G]=F}K[G].resultBuffer=F.buffer}}_activateAction(J){if(!this._isActiveAction(J)){if(J._cacheIndex===null){let $=(J._localRoot||this._root).uuid,Z=J._clip.uuid,W=this._actionsByClip[Z];this._bindAction(J,W&&W.knownActions[0]),this._addInactiveAction(J,Z,$)}let Q=J._propertyBindings;for(let $=0,Z=Q.length;$!==Z;++$){let W=Q[$];if(W.useCount++===0)this._lendBinding(W),W.saveOriginalState()}this._lendAction(J)}}_deactivateAction(J){if(this._isActiveAction(J)){let Q=J._propertyBindings;for(let $=0,Z=Q.length;$!==Z;++$){let W=Q[$];if(--W.useCount===0)W.restoreOriginalState(),this._takeBackBinding(W)}this._takeBackAction(J)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let J=this;this.stats={actions:{get total(){return J._actions.length},get inUse(){return J._nActiveActions}},bindings:{get total(){return J._bindings.length},get inUse(){return J._nActiveBindings}},controlInterpolants:{get total(){return J._controlInterpolants.length},get inUse(){return J._nActiveControlInterpolants}}}}_isActiveAction(J){let Q=J._cacheIndex;return Q!==null&&Q<this._nActiveActions}_addInactiveAction(J,Q,$){let Z=this._actions,W=this._actionsByClip,H=W[Q];if(H===void 0)H={knownActions:[J],actionByRoot:{}},J._byClipCacheIndex=0,W[Q]=H;else{let K=H.knownActions;J._byClipCacheIndex=K.length,K.push(J)}J._cacheIndex=Z.length,Z.push(J),H.actionByRoot[$]=J}_removeInactiveAction(J){let Q=this._actions,$=Q[Q.length-1],Z=J._cacheIndex;$._cacheIndex=Z,Q[Z]=$,Q.pop(),J._cacheIndex=null;let W=J._clip.uuid,H=this._actionsByClip,K=H[W],Y=K.knownActions,X=Y[Y.length-1],U=J._byClipCacheIndex;X._byClipCacheIndex=U,Y[U]=X,Y.pop(),J._byClipCacheIndex=null;let G=K.actionByRoot,q=(J._localRoot||this._root).uuid;if(delete G[q],Y.length===0)delete H[W];this._removeInactiveBindingsForAction(J)}_removeInactiveBindingsForAction(J){let Q=J._propertyBindings;for(let $=0,Z=Q.length;$!==Z;++$){let W=Q[$];if(--W.referenceCount===0)this._removeInactiveBinding(W)}}_lendAction(J){let Q=this._actions,$=J._cacheIndex,Z=this._nActiveActions++,W=Q[Z];J._cacheIndex=Z,Q[Z]=J,W._cacheIndex=$,Q[$]=W}_takeBackAction(J){let Q=this._actions,$=J._cacheIndex,Z=--this._nActiveActions,W=Q[Z];J._cacheIndex=Z,Q[Z]=J,W._cacheIndex=$,Q[$]=W}_addInactiveBinding(J,Q,$){let Z=this._bindingsByRootAndName,W=this._bindings,H=Z[Q];if(H===void 0)H={},Z[Q]=H;H[$]=J,J._cacheIndex=W.length,W.push(J)}_removeInactiveBinding(J){let Q=this._bindings,$=J.binding,Z=$.rootNode.uuid,W=$.path,H=this._bindingsByRootAndName,K=H[Z],Y=Q[Q.length-1],X=J._cacheIndex;if(Y._cacheIndex=X,Q[X]=Y,Q.pop(),delete K[W],Object.keys(K).length===0)delete H[Z]}_lendBinding(J){let Q=this._bindings,$=J._cacheIndex,Z=this._nActiveBindings++,W=Q[Z];J._cacheIndex=Z,Q[Z]=J,W._cacheIndex=$,Q[$]=W}_takeBackBinding(J){let Q=this._bindings,$=J._cacheIndex,Z=--this._nActiveBindings,W=Q[Z];J._cacheIndex=Z,Q[Z]=J,W._cacheIndex=$,Q[$]=W}_lendControlInterpolant(){let J=this._controlInterpolants,Q=this._nActiveControlInterpolants++,$=J[Q];if($===void 0)$=new d6(new Float32Array(2),new Float32Array(2),1,xY),$.__cacheIndex=Q,J[Q]=$;return $}_takeBackControlInterpolant(J){let Q=this._controlInterpolants,$=J.__cacheIndex,Z=--this._nActiveControlInterpolants,W=Q[Z];J.__cacheIndex=Z,Q[Z]=J,W.__cacheIndex=$,Q[$]=W}clipAction(J,Q,$){let Z=Q||this._root,W=Z.uuid,H=typeof J==="string"?d8.findByName(Z,J):J,K=H!==null?H.uuid:J,Y=this._actionsByClip[K],X=null;if($===void 0)if(H!==null)$=H.blendMode;else $=2500;if(Y!==void 0){let G=Y.actionByRoot[W];if(G!==void 0&&G.blendMode===$)return G;if(X=Y.knownActions[0],H===null)H=X._clip}if(H===null)return null;let U=new t$(this,H,Q,$);return this._bindAction(U,X),this._addInactiveAction(U,K,W),U}existingAction(J,Q){let $=Q||this._root,Z=$.uuid,W=typeof J==="string"?d8.findByName($,J):J,H=W?W.uuid:J,K=this._actionsByClip[H];if(K!==void 0)return K.actionByRoot[Z]||null;return null}stopAllAction(){let J=this._actions,Q=this._nActiveActions;for(let $=Q-1;$>=0;--$)J[$].stop();return this}update(J){J*=this.timeScale;let Q=this._actions,$=this._nActiveActions,Z=this.time+=J,W=Math.sign(J),H=this._accuIndex^=1;for(let X=0;X!==$;++X)Q[X]._update(Z,J,W,H);let K=this._bindings,Y=this._nActiveBindings;for(let X=0;X!==Y;++X)K[X].apply(H);return this}setTime(J){this.time=0;for(let Q=0;Q<this._actions.length;Q++)this._actions[Q].time=0;return this.update(J)}getRoot(){return this._root}uncacheClip(J){let Q=this._actions,$=J.uuid,Z=this._actionsByClip,W=Z[$];if(W!==void 0){let H=W.knownActions;for(let K=0,Y=H.length;K!==Y;++K){let X=H[K];this._deactivateAction(X);let U=X._cacheIndex,G=Q[Q.length-1];X._cacheIndex=null,X._byClipCacheIndex=null,G._cacheIndex=U,Q[U]=G,Q.pop(),this._removeInactiveBindingsForAction(X)}delete Z[$]}}uncacheRoot(J){let Q=J.uuid,$=this._actionsByClip;for(let H in $){let K=$[H].actionByRoot,Y=K[Q];if(Y!==void 0)this._deactivateAction(Y),this._removeInactiveAction(Y)}let Z=this._bindingsByRootAndName,W=Z[Q];if(W!==void 0)for(let H in W){let K=W[H];K.restoreOriginalState(),this._removeInactiveBinding(K)}}uncacheAction(J,Q){let $=this.existingAction(J,Q);if($!==null)this._deactivateAction($),this._removeInactiveAction($)}}class e${static{e$.prototype.isMatrix2=!0}constructor(J,Q,$,Z){if(this.elements=[1,0,0,1],J!==void 0)this.set(J,Q,$,Z)}identity(){return this.set(1,0,0,1),this}fromArray(J,Q=0){for(let $=0;$<4;$++)this.elements[$]=J[$+Q];return this}set(J,Q,$,Z){let W=this.elements;return W[0]=J,W[2]=Q,W[1]=$,W[3]=Z,this}}function JZ(J,Q,$,Z){let W=gY(Z);switch($){case 1021:return J*Q;case 1028:return J*Q/W.components*W.byteLength;case 1029:return J*Q/W.components*W.byteLength;case 1030:return J*Q*2/W.components*W.byteLength;case 1031:return J*Q*2/W.components*W.byteLength;case 1022:return J*Q*3/W.components*W.byteLength;case 1023:return J*Q*4/W.components*W.byteLength;case 1033:return J*Q*4/W.components*W.byteLength;case 33776:case 33777:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*8;case 33778:case 33779:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 35841:case 35843:return Math.max(J,16)*Math.max(Q,8)/4;case 35840:case 35842:return Math.max(J,8)*Math.max(Q,8)/2;case 36196:case 37492:case 37488:case 37489:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*8;case 37496:case 37490:case 37491:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 37808:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 37809:return Math.floor((J+4)/5)*Math.floor((Q+3)/4)*16;case 37810:return Math.floor((J+4)/5)*Math.floor((Q+4)/5)*16;case 37811:return Math.floor((J+5)/6)*Math.floor((Q+4)/5)*16;case 37812:return Math.floor((J+5)/6)*Math.floor((Q+5)/6)*16;case 37813:return Math.floor((J+7)/8)*Math.floor((Q+4)/5)*16;case 37814:return Math.floor((J+7)/8)*Math.floor((Q+5)/6)*16;case 37815:return Math.floor((J+7)/8)*Math.floor((Q+7)/8)*16;case 37816:return Math.floor((J+9)/10)*Math.floor((Q+4)/5)*16;case 37817:return Math.floor((J+9)/10)*Math.floor((Q+5)/6)*16;case 37818:return Math.floor((J+9)/10)*Math.floor((Q+7)/8)*16;case 37819:return Math.floor((J+9)/10)*Math.floor((Q+9)/10)*16;case 37820:return Math.floor((J+11)/12)*Math.floor((Q+9)/10)*16;case 37821:return Math.floor((J+11)/12)*Math.floor((Q+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(J/4)*Math.ceil(Q/4)*16;case 36283:case 36284:return Math.ceil(J/4)*Math.ceil(Q/4)*8;case 36285:case 36286:return Math.ceil(J/4)*Math.ceil(Q/4)*16}throw Error(`Unable to determine texture byte length for ${$} format.`)}function gY(J){switch(J){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:case 35899:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${J}.`)}if(typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"185"}}));if(typeof window<"u")if(window.__THREE__)M0("WARNING: Multiple instances of Three.js being imported.");else window.__THREE__="185";function pH(){let J=null,Q=!1,$=null,Z=null;function W(H,K){$(H,K),Z=J.requestAnimationFrame(W)}return{start:function(){if(Q===!0)return;if($===null)return;if(J===null)return;Z=J.requestAnimationFrame(W),Q=!0},stop:function(){if(J!==null)J.cancelAnimationFrame(Z);Q=!1},setAnimationLoop:function(H){$=H},setContext:function(H){J=H}}}function pY(J){let Q=new WeakMap;function $(Y,X){let{array:U,usage:G}=Y,q=U.byteLength,E=J.createBuffer();J.bindBuffer(X,E),J.bufferData(X,U,G),Y.onUploadCallback();let F;if(U instanceof Float32Array)F=J.FLOAT;else if(typeof Float16Array<"u"&&U instanceof Float16Array)F=J.HALF_FLOAT;else if(U instanceof Uint16Array)if(Y.isFloat16BufferAttribute)F=J.HALF_FLOAT;else F=J.UNSIGNED_SHORT;else if(U instanceof Int16Array)F=J.SHORT;else if(U instanceof Uint32Array)F=J.UNSIGNED_INT;else if(U instanceof Int32Array)F=J.INT;else if(U instanceof Int8Array)F=J.BYTE;else if(U instanceof Uint8Array)F=J.UNSIGNED_BYTE;else if(U instanceof Uint8ClampedArray)F=J.UNSIGNED_BYTE;else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: "+U);return{buffer:E,type:F,bytesPerElement:U.BYTES_PER_ELEMENT,version:Y.version,size:q}}function Z(Y,X,U){let{array:G,updateRanges:q}=X;if(J.bindBuffer(U,Y),q.length===0)J.bufferSubData(U,0,G);else{q.sort((F,k)=>F.start-k.start);let E=0;for(let F=1;F<q.length;F++){let k=q[E],B=q[F];if(B.start<=k.start+k.count+1)k.count=Math.max(k.count,B.start+B.count-k.start);else++E,q[E]=B}q.length=E+1;for(let F=0,k=q.length;F<k;F++){let B=q[F];J.bufferSubData(U,B.start*G.BYTES_PER_ELEMENT,G,B.start,B.count)}X.clearUpdateRanges()}X.onUploadCallback()}function W(Y){if(Y.isInterleavedBufferAttribute)Y=Y.data;return Q.get(Y)}function H(Y){if(Y.isInterleavedBufferAttribute)Y=Y.data;let X=Q.get(Y);if(X)J.deleteBuffer(X.buffer),Q.delete(Y)}function K(Y,X){if(Y.isInterleavedBufferAttribute)Y=Y.data;if(Y.isGLBufferAttribute){let G=Q.get(Y);if(!G||G.version<Y.version)Q.set(Y,{buffer:Y.buffer,type:Y.type,bytesPerElement:Y.elementSize,version:Y.version});return}let U=Q.get(Y);if(U===void 0)Q.set(Y,$(Y,X));else if(U.version<Y.version){if(U.size!==Y.array.byteLength)throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");Z(U.buffer,Y,X),U.version=Y.version}}return{get:W,remove:H,update:K}}var lY=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,mY=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,dY=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,uY=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,cY=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,nY=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,sY=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,iY=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,oY=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,aY=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,rY=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,tY=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,eY=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,JX=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,QX=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,$X=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,ZX=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,WX=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,HX=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,KX=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,YX=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,XX=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,UX=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,GX=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,EX=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,qX=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,NX=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,FX=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,OX=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,RX=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,kX="gl_FragColor = linearToOutputTexel( gl_FragColor );",LX=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,DX=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,VX=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,MX=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,BX=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,zX=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,_X=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,CX=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,PX=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,IX=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,wX=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,AX=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,TX=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,SX=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,jX=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,vX=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,yX=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,hX=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,fX=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,bX=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,xX=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,gX=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,pX=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lX=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,mX=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,dX=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,uX=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,cX=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,nX=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,sX=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,iX=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,oX=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,aX=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,rX=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,tX=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,eX=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,JU=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,QU=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,$U=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ZU=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,WU=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,HU=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,KU=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,YU=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,XU=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,UU=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,GU=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,EU=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,qU=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,NU=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,FU=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,OU=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,RU=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,kU=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,LU=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,DU=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,VU=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,MU=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,BU=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,zU=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,_U=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,CU=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,PU=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,IU=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,wU=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,AU=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,TU=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,SU=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,jU=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,vU=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,yU=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,hU=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,fU=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,bU=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,xU=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,gU=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,pU=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,lU=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,mU=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dU=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,uU=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cU=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,nU=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sU=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,iU=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,oU=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,aU=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,rU=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,tU=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,eU=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,JG=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,QG=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,$G=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ZG=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,WG=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,HG=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,KG=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,YG=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,XG=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,UG=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,GG=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,EG=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,qG=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,NG=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,FG=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,OG=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,RG=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,kG=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,LG=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,DG=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,VG=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,h0={alphahash_fragment:lY,alphahash_pars_fragment:mY,alphamap_fragment:dY,alphamap_pars_fragment:uY,alphatest_fragment:cY,alphatest_pars_fragment:nY,aomap_fragment:sY,aomap_pars_fragment:iY,batching_pars_vertex:oY,batching_vertex:aY,begin_vertex:rY,beginnormal_vertex:tY,bsdfs:eY,iridescence_fragment:JX,bumpmap_pars_fragment:QX,clipping_planes_fragment:$X,clipping_planes_pars_fragment:ZX,clipping_planes_pars_vertex:WX,clipping_planes_vertex:HX,color_fragment:KX,color_pars_fragment:YX,color_pars_vertex:XX,color_vertex:UX,common:GX,cube_uv_reflection_fragment:EX,defaultnormal_vertex:qX,displacementmap_pars_vertex:NX,displacementmap_vertex:FX,emissivemap_fragment:OX,emissivemap_pars_fragment:RX,colorspace_fragment:kX,colorspace_pars_fragment:LX,envmap_fragment:DX,envmap_common_pars_fragment:VX,envmap_pars_fragment:MX,envmap_pars_vertex:BX,envmap_physical_pars_fragment:vX,envmap_vertex:zX,fog_vertex:_X,fog_pars_vertex:CX,fog_fragment:PX,fog_pars_fragment:IX,gradientmap_pars_fragment:wX,lightmap_pars_fragment:AX,lights_lambert_fragment:TX,lights_lambert_pars_fragment:SX,lights_pars_begin:jX,lights_toon_fragment:yX,lights_toon_pars_fragment:hX,lights_phong_fragment:fX,lights_phong_pars_fragment:bX,lights_physical_fragment:xX,lights_physical_pars_fragment:gX,lights_fragment_begin:pX,lights_fragment_maps:lX,lights_fragment_end:mX,lightprobes_pars_fragment:dX,logdepthbuf_fragment:uX,logdepthbuf_pars_fragment:cX,logdepthbuf_pars_vertex:nX,logdepthbuf_vertex:sX,map_fragment:iX,map_pars_fragment:oX,map_particle_fragment:aX,map_particle_pars_fragment:rX,metalnessmap_fragment:tX,metalnessmap_pars_fragment:eX,morphinstance_vertex:JU,morphcolor_vertex:QU,morphnormal_vertex:$U,morphtarget_pars_vertex:ZU,morphtarget_vertex:WU,normal_fragment_begin:HU,normal_fragment_maps:KU,normal_pars_fragment:YU,normal_pars_vertex:XU,normal_vertex:UU,normalmap_pars_fragment:GU,clearcoat_normal_fragment_begin:EU,clearcoat_normal_fragment_maps:qU,clearcoat_pars_fragment:NU,iridescence_pars_fragment:FU,opaque_fragment:OU,packing:RU,premultiplied_alpha_fragment:kU,project_vertex:LU,dithering_fragment:DU,dithering_pars_fragment:VU,roughnessmap_fragment:MU,roughnessmap_pars_fragment:BU,shadowmap_pars_fragment:zU,shadowmap_pars_vertex:_U,shadowmap_vertex:CU,shadowmask_pars_fragment:PU,skinbase_vertex:IU,skinning_pars_vertex:wU,skinning_vertex:AU,skinnormal_vertex:TU,specularmap_fragment:SU,specularmap_pars_fragment:jU,tonemapping_fragment:vU,tonemapping_pars_fragment:yU,transmission_fragment:hU,transmission_pars_fragment:fU,uv_pars_fragment:bU,uv_pars_vertex:xU,uv_vertex:gU,worldpos_vertex:pU,background_vert:lU,background_frag:mU,backgroundCube_vert:dU,backgroundCube_frag:uU,cube_vert:cU,cube_frag:nU,depth_vert:sU,depth_frag:iU,distance_vert:oU,distance_frag:aU,equirect_vert:rU,equirect_frag:tU,linedashed_vert:eU,linedashed_frag:JG,meshbasic_vert:QG,meshbasic_frag:$G,meshlambert_vert:ZG,meshlambert_frag:WG,meshmatcap_vert:HG,meshmatcap_frag:KG,meshnormal_vert:YG,meshnormal_frag:XG,meshphong_vert:UG,meshphong_frag:GG,meshphysical_vert:EG,meshphysical_frag:qG,meshtoon_vert:NG,meshtoon_frag:FG,points_vert:OG,points_frag:RG,shadow_vert:kG,shadow_frag:LG,sprite_vert:DG,sprite_frag:VG},U0={common:{diffuse:{value:new I0(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new T0},alphaMap:{value:null},alphaMapTransform:{value:new T0},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new T0}},envmap:{envMap:{value:null},envMapRotation:{value:new T0},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:0.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new T0}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new T0}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new T0},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new T0},normalScale:{value:new y0(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new T0},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new T0}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new T0}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new T0}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:0.00025},fogNear:{value:1},fogFar:{value:2000},fogColor:{value:new I0(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new y},probesMax:{value:new y},probesResolution:{value:new y}},points:{diffuse:{value:new I0(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new T0},alphaTest:{value:0},uvTransform:{value:new T0}},sprite:{diffuse:{value:new I0(16777215)},opacity:{value:1},center:{value:new y0(0.5,0.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new T0},alphaMap:{value:null},alphaMapTransform:{value:new T0},alphaTest:{value:0}}},M9={basic:{uniforms:SJ([U0.common,U0.specularmap,U0.envmap,U0.aomap,U0.lightmap,U0.fog]),vertexShader:h0.meshbasic_vert,fragmentShader:h0.meshbasic_frag},lambert:{uniforms:SJ([U0.common,U0.specularmap,U0.envmap,U0.aomap,U0.lightmap,U0.emissivemap,U0.bumpmap,U0.normalmap,U0.displacementmap,U0.fog,U0.lights,{emissive:{value:new I0(0)},envMapIntensity:{value:1}}]),vertexShader:h0.meshlambert_vert,fragmentShader:h0.meshlambert_frag},phong:{uniforms:SJ([U0.common,U0.specularmap,U0.envmap,U0.aomap,U0.lightmap,U0.emissivemap,U0.bumpmap,U0.normalmap,U0.displacementmap,U0.fog,U0.lights,{emissive:{value:new I0(0)},specular:{value:new I0(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:h0.meshphong_vert,fragmentShader:h0.meshphong_frag},standard:{uniforms:SJ([U0.common,U0.envmap,U0.aomap,U0.lightmap,U0.emissivemap,U0.bumpmap,U0.normalmap,U0.displacementmap,U0.roughnessmap,U0.metalnessmap,U0.fog,U0.lights,{emissive:{value:new I0(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:h0.meshphysical_vert,fragmentShader:h0.meshphysical_frag},toon:{uniforms:SJ([U0.common,U0.aomap,U0.lightmap,U0.emissivemap,U0.bumpmap,U0.normalmap,U0.displacementmap,U0.gradientmap,U0.fog,U0.lights,{emissive:{value:new I0(0)}}]),vertexShader:h0.meshtoon_vert,fragmentShader:h0.meshtoon_frag},matcap:{uniforms:SJ([U0.common,U0.bumpmap,U0.normalmap,U0.displacementmap,U0.fog,{matcap:{value:null}}]),vertexShader:h0.meshmatcap_vert,fragmentShader:h0.meshmatcap_frag},points:{uniforms:SJ([U0.points,U0.fog]),vertexShader:h0.points_vert,fragmentShader:h0.points_frag},dashed:{uniforms:SJ([U0.common,U0.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:h0.linedashed_vert,fragmentShader:h0.linedashed_frag},depth:{uniforms:SJ([U0.common,U0.displacementmap]),vertexShader:h0.depth_vert,fragmentShader:h0.depth_frag},normal:{uniforms:SJ([U0.common,U0.bumpmap,U0.normalmap,U0.displacementmap,{opacity:{value:1}}]),vertexShader:h0.meshnormal_vert,fragmentShader:h0.meshnormal_frag},sprite:{uniforms:SJ([U0.sprite,U0.fog]),vertexShader:h0.sprite_vert,fragmentShader:h0.sprite_frag},background:{uniforms:{uvTransform:{value:new T0},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:h0.background_vert,fragmentShader:h0.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new T0}},vertexShader:h0.backgroundCube_vert,fragmentShader:h0.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:h0.cube_vert,fragmentShader:h0.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:h0.equirect_vert,fragmentShader:h0.equirect_frag},distance:{uniforms:SJ([U0.common,U0.displacementmap,{referencePosition:{value:new y},nearDistance:{value:1},farDistance:{value:1000}}]),vertexShader:h0.distance_vert,fragmentShader:h0.distance_frag},shadow:{uniforms:SJ([U0.lights,U0.fog,{color:{value:new I0(0)},opacity:{value:1}}]),vertexShader:h0.shadow_vert,fragmentShader:h0.shadow_frag}};M9.physical={uniforms:SJ([M9.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new T0},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new T0},clearcoatNormalScale:{value:new y0(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new T0},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new T0},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new T0},sheen:{value:0},sheenColor:{value:new I0(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new T0},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new T0},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new T0},transmissionSamplerSize:{value:new y0},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new T0},attenuationDistance:{value:0},attenuationColor:{value:new I0(0)},specularColor:{value:new I0(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new T0},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new T0},anisotropyVector:{value:new y0},anisotropyMap:{value:null},anisotropyMapTransform:{value:new T0}}]),vertexShader:h0.meshphysical_vert,fragmentShader:h0.meshphysical_frag};var t6={r:0,b:0,g:0},MG=new j0,lH=new T0;lH.set(-1,0,0,0,1,0,0,0,1);function BG(J,Q,$,Z,W,H){let K=new I0(0),Y=W===!0?0:1,X,U,G=null,q=0,E=null;function F(_){let C=_.isScene===!0?_.background:null;if(C&&C.isTexture){let D=_.backgroundBlurriness>0;C=Q.get(C,D)}return C}function k(_){let C=!1,D=F(_);if(D===null)O(K,Y);else if(D&&D.isColor)O(D,1),C=!0;let P=J.xr.getEnvironmentBlendMode();if(P==="additive")$.buffers.color.setClear(0,0,0,1,H);else if(P==="alpha-blend")$.buffers.color.setClear(0,0,0,0,H);if(J.autoClear||C)$.buffers.depth.setTest(!0),$.buffers.depth.setMask(!0),$.buffers.color.setMask(!0),J.clear(J.autoClearColor,J.autoClearDepth,J.autoClearStencil)}function B(_,C){let D=F(C);if(D&&(D.isCubeTexture||D.mapping===z7)){if(U===void 0)U=new YJ(new o9(1,1,1),new eJ({name:"BackgroundCubeMaterial",uniforms:L8(M9.backgroundCube.uniforms),vertexShader:M9.backgroundCube.vertexShader,fragmentShader:M9.backgroundCube.fragmentShader,side:TJ,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),U.geometry.deleteAttribute("normal"),U.geometry.deleteAttribute("uv"),U.onBeforeRender=function(P,I,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(U.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),Z.update(U);if(U.material.uniforms.envMap.value=D,U.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,U.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,U.material.uniforms.backgroundRotation.value.setFromMatrix4(MG.makeRotationFromEuler(C.backgroundRotation)).transpose(),D.isCubeTexture&&D.isRenderTargetTexture===!1)U.material.uniforms.backgroundRotation.value.premultiply(lH);if(U.material.toneMapped=b0.getTransfer(D.colorSpace)!==$J,G!==D||q!==D.version||E!==J.toneMapping)U.material.needsUpdate=!0,G=D,q=D.version,E=J.toneMapping;U.layers.enableAll(),_.unshift(U,U.geometry,U.material,0,0,null)}else if(D&&D.isTexture){if(X===void 0)X=new YJ(new k8(2,2),new eJ({name:"BackgroundMaterial",uniforms:L8(M9.background.uniforms),vertexShader:M9.background.vertexShader,fragmentShader:M9.background.fragmentShader,side:n9,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),X.geometry.deleteAttribute("normal"),Object.defineProperty(X.material,"map",{get:function(){return this.uniforms.t2D.value}}),Z.update(X);if(X.material.uniforms.t2D.value=D,X.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,X.material.toneMapped=b0.getTransfer(D.colorSpace)!==$J,D.matrixAutoUpdate===!0)D.updateMatrix();if(X.material.uniforms.uvTransform.value.copy(D.matrix),G!==D||q!==D.version||E!==J.toneMapping)X.material.needsUpdate=!0,G=D,q=D.version,E=J.toneMapping;X.layers.enableAll(),_.unshift(X,X.geometry,X.material,0,0,null)}}function O(_,C){_.getRGB(t6,b$(J)),$.buffers.color.setClear(t6.r,t6.g,t6.b,C,H)}function N(){if(U!==void 0)U.geometry.dispose(),U.material.dispose(),U=void 0;if(X!==void 0)X.geometry.dispose(),X.material.dispose(),X=void 0}return{getClearColor:function(){return K},setClearColor:function(_,C=1){K.set(_),Y=C,O(K,Y)},getClearAlpha:function(){return Y},setClearAlpha:function(_){Y=_,O(K,Y)},render:k,addToRenderList:B,dispose:N}}function zG(J,Q){let $=J.getParameter(J.MAX_VERTEX_ATTRIBS),Z={},W=E(null),H=W,K=!1;function Y(A,m,a,p,n){let u=!1,h=q(A,p,a,m);if(H!==h)H=h,U(H.object);if(u=F(A,p,a,n),u)k(A,p,a,n);if(n!==null)Q.update(n,J.ELEMENT_ARRAY_BUFFER);if(u||K){if(K=!1,D(A,m,a,p),n!==null)J.bindBuffer(J.ELEMENT_ARRAY_BUFFER,Q.get(n).buffer)}}function X(){return J.createVertexArray()}function U(A){return J.bindVertexArray(A)}function G(A){return J.deleteVertexArray(A)}function q(A,m,a,p){let n=p.wireframe===!0,u=Z[m.id];if(u===void 0)u={},Z[m.id]=u;let h=A.isInstancedMesh===!0?A.id:0,o=u[h];if(o===void 0)o={},u[h]=o;let r=o[a.id];if(r===void 0)r={},o[a.id]=r;let W0=r[n];if(W0===void 0)W0=E(X()),r[n]=W0;return W0}function E(A){let m=[],a=[],p=[];for(let n=0;n<$;n++)m[n]=0,a[n]=0,p[n]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:m,enabledAttributes:a,attributeDivisors:p,object:A,attributes:{},index:null}}function F(A,m,a,p){let n=H.attributes,u=m.attributes,h=0,o=a.getAttributes();for(let r in o)if(o[r].location>=0){let L0=n[r],E0=u[r];if(E0===void 0){if(r==="instanceMatrix"&&A.instanceMatrix)E0=A.instanceMatrix;if(r==="instanceColor"&&A.instanceColor)E0=A.instanceColor}if(L0===void 0)return!0;if(L0.attribute!==E0)return!0;if(E0&&L0.data!==E0.data)return!0;h++}if(H.attributesNum!==h)return!0;if(H.index!==p)return!0;return!1}function k(A,m,a,p){let n={},u=m.attributes,h=0,o=a.getAttributes();for(let r in o)if(o[r].location>=0){let L0=u[r];if(L0===void 0){if(r==="instanceMatrix"&&A.instanceMatrix)L0=A.instanceMatrix;if(r==="instanceColor"&&A.instanceColor)L0=A.instanceColor}let E0={};if(E0.attribute=L0,L0&&L0.data)E0.data=L0.data;n[r]=E0,h++}H.attributes=n,H.attributesNum=h,H.index=p}function B(){let A=H.newAttributes;for(let m=0,a=A.length;m<a;m++)A[m]=0}function O(A){N(A,0)}function N(A,m){let{newAttributes:a,enabledAttributes:p,attributeDivisors:n}=H;if(a[A]=1,p[A]===0)J.enableVertexAttribArray(A),p[A]=1;if(n[A]!==m)J.vertexAttribDivisor(A,m),n[A]=m}function _(){let{newAttributes:A,enabledAttributes:m}=H;for(let a=0,p=m.length;a<p;a++)if(m[a]!==A[a])J.disableVertexAttribArray(a),m[a]=0}function C(A,m,a,p,n,u,h){if(h===!0)J.vertexAttribIPointer(A,m,a,n,u);else J.vertexAttribPointer(A,m,a,p,n,u)}function D(A,m,a,p){B();let n=p.attributes,u=a.getAttributes(),h=m.defaultAttributeValues;for(let o in u){let r=u[o];if(r.location>=0){let W0=n[o];if(W0===void 0){if(o==="instanceMatrix"&&A.instanceMatrix)W0=A.instanceMatrix;if(o==="instanceColor"&&A.instanceColor)W0=A.instanceColor}if(W0!==void 0){let{normalized:L0,itemSize:E0}=W0,ZJ=Q.get(W0);if(ZJ===void 0)continue;let{buffer:e0,type:i,bytesPerElement:Z0}=ZJ,O0=i===J.INT||i===J.UNSIGNED_INT||W0.gpuType===mQ;if(W0.isInterleavedBufferAttribute){let R0=W0.data,w0=R0.stride,d0=W0.offset;if(R0.isInstancedInterleavedBuffer){for(let g0=0;g0<r.locationSize;g0++)N(r.location+g0,R0.meshPerAttribute);if(A.isInstancedMesh!==!0&&p._maxInstanceCount===void 0)p._maxInstanceCount=R0.meshPerAttribute*R0.count}else for(let g0=0;g0<r.locationSize;g0++)O(r.location+g0);J.bindBuffer(J.ARRAY_BUFFER,e0);for(let g0=0;g0<r.locationSize;g0++)C(r.location+g0,E0/r.locationSize,i,L0,w0*Z0,(d0+E0/r.locationSize*g0)*Z0,O0)}else{if(W0.isInstancedBufferAttribute){for(let R0=0;R0<r.locationSize;R0++)N(r.location+R0,W0.meshPerAttribute);if(A.isInstancedMesh!==!0&&p._maxInstanceCount===void 0)p._maxInstanceCount=W0.meshPerAttribute*W0.count}else for(let R0=0;R0<r.locationSize;R0++)O(r.location+R0);J.bindBuffer(J.ARRAY_BUFFER,e0);for(let R0=0;R0<r.locationSize;R0++)C(r.location+R0,E0/r.locationSize,i,L0,E0*Z0,E0/r.locationSize*R0*Z0,O0)}}else if(h!==void 0){let L0=h[o];if(L0!==void 0)switch(L0.length){case 2:J.vertexAttrib2fv(r.location,L0);break;case 3:J.vertexAttrib3fv(r.location,L0);break;case 4:J.vertexAttrib4fv(r.location,L0);break;default:J.vertexAttrib1fv(r.location,L0)}}}}_()}function P(){z();for(let A in Z){let m=Z[A];for(let a in m){let p=m[a];for(let n in p){let u=p[n];for(let h in u)G(u[h].object),delete u[h];delete p[n]}}delete Z[A]}}function I(A){if(Z[A.id]===void 0)return;let m=Z[A.id];for(let a in m){let p=m[a];for(let n in p){let u=p[n];for(let h in u)G(u[h].object),delete u[h];delete p[n]}}delete Z[A.id]}function w(A){for(let m in Z){let a=Z[m];for(let p in a){let n=a[p];if(n[A.id]===void 0)continue;let u=n[A.id];for(let h in u)G(u[h].object),delete u[h];delete n[A.id]}}}function L(A){for(let m in Z){let a=Z[m],p=A.isInstancedMesh===!0?A.id:0,n=a[p];if(n===void 0)continue;for(let u in n){let h=n[u];for(let o in h)G(h[o].object),delete h[o];delete n[u]}if(delete a[p],Object.keys(a).length===0)delete Z[m]}}function z(){if(g(),K=!0,H===W)return;H=W,U(H.object)}function g(){W.geometry=null,W.program=null,W.wireframe=!1}return{setup:Y,reset:z,resetDefaultState:g,dispose:P,releaseStatesOfGeometry:I,releaseStatesOfObject:L,releaseStatesOfProgram:w,initAttributes:B,enableAttribute:O,disableUnusedAttributes:_}}function _G(J,Q,$){let Z;function W(X){Z=X}function H(X,U){J.drawArrays(Z,X,U),$.update(U,Z,1)}function K(X,U,G){if(G===0)return;J.drawArraysInstanced(Z,X,U,G),$.update(U,Z,G)}function Y(X,U,G){if(G===0)return;Q.get("WEBGL_multi_draw").multiDrawArraysWEBGL(Z,X,0,U,0,G);let E=0;for(let F=0;F<G;F++)E+=U[F];$.update(E,Z,1)}this.setMode=W,this.render=H,this.renderInstances=K,this.renderMultiDraw=Y}function CG(J,Q,$,Z){let W;function H(){if(W!==void 0)return W;if(Q.has("EXT_texture_filter_anisotropic")===!0){let w=Q.get("EXT_texture_filter_anisotropic");W=J.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else W=0;return W}function K(w){if(w!==k9&&Z.convert(w)!==J.getParameter(J.IMPLEMENTATION_COLOR_READ_FORMAT))return!1;return!0}function Y(w){let L=w===v9&&(Q.has("EXT_color_buffer_half_float")||Q.has("EXT_color_buffer_float"));if(w!==X9&&Z.convert(w)!==J.getParameter(J.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==j9&&!L)return!1;return!0}function X(w){if(w==="highp"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.HIGH_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.HIGH_FLOAT).precision>0)return"highp";w="mediump"}if(w==="mediump"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.MEDIUM_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.MEDIUM_FLOAT).precision>0)return"mediump"}return"lowp"}let U=$.precision!==void 0?$.precision:"highp",G=X(U);if(G!==U)M0("WebGLRenderer:",U,"not supported, using",G,"instead."),U=G;let q=$.logarithmicDepthBuffer===!0,E=$.reversedDepthBuffer===!0&&Q.has("EXT_clip_control");if($.reversedDepthBuffer===!0&&E===!1)M0("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let F=J.getParameter(J.MAX_TEXTURE_IMAGE_UNITS),k=J.getParameter(J.MAX_VERTEX_TEXTURE_IMAGE_UNITS),B=J.getParameter(J.MAX_TEXTURE_SIZE),O=J.getParameter(J.MAX_CUBE_MAP_TEXTURE_SIZE),N=J.getParameter(J.MAX_VERTEX_ATTRIBS),_=J.getParameter(J.MAX_VERTEX_UNIFORM_VECTORS),C=J.getParameter(J.MAX_VARYING_VECTORS),D=J.getParameter(J.MAX_FRAGMENT_UNIFORM_VECTORS),P=J.getParameter(J.MAX_SAMPLES),I=J.getParameter(J.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:H,getMaxPrecision:X,textureFormatReadable:K,textureTypeReadable:Y,precision:U,logarithmicDepthBuffer:q,reversedDepthBuffer:E,maxTextures:F,maxVertexTextures:k,maxTextureSize:B,maxCubemapSize:O,maxAttributes:N,maxVertexUniforms:_,maxVaryings:C,maxFragmentUniforms:D,maxSamples:P,samples:I}}function PG(J){let Q=this,$=null,Z=0,W=!1,H=!1,K=new T9,Y=new T0,X={value:null,needsUpdate:!1};this.uniform=X,this.numPlanes=0,this.numIntersection=0,this.init=function(q,E){let F=q.length!==0||E||Z!==0||W;return W=E,Z=q.length,F},this.beginShadows=function(){H=!0,G(null)},this.endShadows=function(){H=!1},this.setGlobalState=function(q,E){$=G(q,E,0)},this.setState=function(q,E,F){let{clippingPlanes:k,clipIntersection:B,clipShadows:O}=q,N=J.get(q);if(!W||k===null||k.length===0||H&&!O)if(H)G(null);else U();else{let _=H?0:Z,C=_*4,D=N.clippingState||null;X.value=D,D=G(k,E,C,F);for(let P=0;P!==C;++P)D[P]=$[P];N.clippingState=D,this.numIntersection=B?this.numPlanes:0,this.numPlanes+=_}};function U(){if(X.value!==$)X.value=$,X.needsUpdate=Z>0;Q.numPlanes=Z,Q.numIntersection=0}function G(q,E,F,k){let B=q!==null?q.length:0,O=null;if(B!==0){if(O=X.value,k!==!0||O===null){let N=F+B*4,_=E.matrixWorldInverse;if(Y.getNormalMatrix(_),O===null||O.length<N)O=new Float32Array(N);for(let C=0,D=F;C!==B;++C,D+=4)K.copy(q[C]).applyMatrix4(_,Y),K.normal.toArray(O,D),O[D+3]=K.constant}X.value=O,X.needsUpdate=!0}return Q.numPlanes=B,Q.numIntersection=0,O}}var Q8=4,LH=[0.125,0.215,0.35,0.446,0.526,0.582],B8=20,IG=256,f7=new V8,DH=new I0,QZ=null,$Z=0,ZZ=0,WZ=!1,wG=new y;class p7{constructor(J){this._renderer=J,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(J,Q=0,$=0.1,Z=100,W={}){let{size:H=256,position:K=wG}=W;QZ=this._renderer.getRenderTarget(),$Z=this._renderer.getActiveCubeFace(),ZZ=this._renderer.getActiveMipmapLevel(),WZ=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(H);let Y=this._allocateTargets();if(Y.depthBuffer=!0,this._sceneToCubeUV(J,$,Z,Y,K),Q>0)this._blur(Y,0,0,Q);return this._applyPMREM(Y),this._cleanup(Y),Y}fromEquirectangular(J,Q=null){return this._fromTexture(J,Q)}fromCubemap(J,Q=null){return this._fromTexture(J,Q)}compileCubemapShader(){if(this._cubemapMaterial===null)this._cubemapMaterial=BH(),this._compileMaterial(this._cubemapMaterial)}compileEquirectangularShader(){if(this._equirectMaterial===null)this._equirectMaterial=MH(),this._compileMaterial(this._equirectMaterial)}dispose(){if(this._dispose(),this._cubemapMaterial!==null)this._cubemapMaterial.dispose();if(this._equirectMaterial!==null)this._equirectMaterial.dispose();if(this._backgroundBox!==null)this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose()}_setSize(J){this._lodMax=Math.floor(Math.log2(J)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){if(this._blurMaterial!==null)this._blurMaterial.dispose();if(this._ggxMaterial!==null)this._ggxMaterial.dispose();if(this._pingPongRenderTarget!==null)this._pingPongRenderTarget.dispose();for(let J=0;J<this._lodMeshes.length;J++)this._lodMeshes[J].geometry.dispose()}_cleanup(J){this._renderer.setRenderTarget(QZ,$Z,ZZ),this._renderer.xr.enabled=WZ,J.scissorTest=!1,H7(J,0,0,J.width,J.height)}_fromTexture(J,Q){if(J.mapping===n8||J.mapping===E8)this._setSize(J.image.length===0?16:J.image[0].width||J.image[0].image.width);else this._setSize(J.image.width/4);QZ=this._renderer.getRenderTarget(),$Z=this._renderer.getActiveCubeFace(),ZZ=this._renderer.getActiveMipmapLevel(),WZ=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let $=Q||this._allocateTargets();return this._textureToCubeUV(J,$),this._applyPMREM($),this._cleanup($),$}_allocateTargets(){let J=3*Math.max(this._cubeSize,112),Q=4*this._cubeSize,$={magFilter:CJ,minFilter:CJ,generateMipmaps:!1,type:v9,format:k9,colorSpace:pJ,depthBuffer:!1},Z=VH(J,Q,$);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==J||this._pingPongRenderTarget.height!==Q){if(this._pingPongRenderTarget!==null)this._dispose();this._pingPongRenderTarget=VH(J,Q,$);let{_lodMax:W}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=AG(W)),this._blurMaterial=SG(W,J,Q),this._ggxMaterial=TG(W,J,Q)}return Z}_compileMaterial(J){let Q=new YJ(new yJ,J);this._renderer.compile(Q,f7)}_sceneToCubeUV(J,Q,$,Z,W){let Y=new LJ(90,1,Q,$),X=[1,-1,1,1,1,1],U=[1,1,1,-1,-1,-1],G=this._renderer,q=G.autoClear,E=G.toneMapping;if(G.getClearColor(DH),G.toneMapping=K9,G.autoClear=!1,G.state.buffers.depth.getReversed())G.setRenderTarget(Z),G.clearDepth(),G.setRenderTarget(null);if(this._backgroundBox===null)this._backgroundBox=new YJ(new o9,new mJ({name:"PMREM.Background",side:TJ,depthWrite:!1,depthTest:!1}));let k=this._backgroundBox,B=k.material,O=!1,N=J.background;if(N){if(N.isColor)B.color.copy(N),J.background=null,O=!0}else B.color.copy(DH),O=!0;for(let _=0;_<6;_++){let C=_%3;if(C===0)Y.up.set(0,X[_],0),Y.position.set(W.x,W.y,W.z),Y.lookAt(W.x+U[_],W.y,W.z);else if(C===1)Y.up.set(0,0,X[_]),Y.position.set(W.x,W.y,W.z),Y.lookAt(W.x,W.y+U[_],W.z);else Y.up.set(0,X[_],0),Y.position.set(W.x,W.y,W.z),Y.lookAt(W.x,W.y,W.z+U[_]);let D=this._cubeSize;if(H7(Z,C*D,_>2?D:0,D,D),G.setRenderTarget(Z),O)G.render(k,Y);G.render(J,Y)}G.toneMapping=E,G.autoClear=q,J.background=N}_textureToCubeUV(J,Q){let $=this._renderer,Z=J.mapping===n8||J.mapping===E8;if(Z){if(this._cubemapMaterial===null)this._cubemapMaterial=BH();this._cubemapMaterial.uniforms.flipEnvMap.value=J.isRenderTargetTexture===!1?-1:1}else if(this._equirectMaterial===null)this._equirectMaterial=MH();let W=Z?this._cubemapMaterial:this._equirectMaterial,H=this._lodMeshes[0];H.material=W;let K=W.uniforms;K.envMap.value=J;let Y=this._cubeSize;H7(Q,0,0,3*Y,2*Y),$.setRenderTarget(Q),$.render(H,f7)}_applyPMREM(J){let Q=this._renderer,$=Q.autoClear;Q.autoClear=!1;let Z=this._lodMeshes.length;for(let W=1;W<Z;W++)this._applyGGXFilter(J,W-1,W);Q.autoClear=$}_applyGGXFilter(J,Q,$){let Z=this._renderer,W=this._pingPongRenderTarget,H=this._ggxMaterial,K=this._lodMeshes[$];K.material=H;let Y=H.uniforms,X=$/(this._lodMeshes.length-1),U=Q/(this._lodMeshes.length-1),G=Math.sqrt(X*X-U*U),q=0+X*1.25,E=G*q,{_lodMax:F}=this,k=this._sizeLods[$],B=3*k*($>F-Q8?$-F+Q8:0),O=4*(this._cubeSize-k);Y.envMap.value=J.texture,Y.roughness.value=E,Y.mipInt.value=F-Q,H7(W,B,O,3*k,2*k),Z.setRenderTarget(W),Z.render(K,f7),Y.envMap.value=W.texture,Y.roughness.value=0,Y.mipInt.value=F-$,H7(J,B,O,3*k,2*k),Z.setRenderTarget(J),Z.render(K,f7)}_blur(J,Q,$,Z,W){let H=this._pingPongRenderTarget;this._halfBlur(J,H,Q,$,Z,"latitudinal",W),this._halfBlur(H,J,$,$,Z,"longitudinal",W)}_halfBlur(J,Q,$,Z,W,H,K){let Y=this._renderer,X=this._blurMaterial;if(H!=="latitudinal"&&H!=="longitudinal")A0("blur direction must be either latitudinal or longitudinal!");let U=3,G=this._lodMeshes[Z];G.material=X;let q=X.uniforms,E=this._sizeLods[$]-1,F=isFinite(W)?Math.PI/(2*E):2*Math.PI/(2*B8-1),k=W/F,B=isFinite(W)?1+Math.floor(U*k):B8;if(B>B8)M0(`sigmaRadians, ${W}, is too large and will clip, as it requested ${B} samples when the maximum is set to ${B8}`);let O=[],N=0;for(let I=0;I<B8;++I){let w=I/k,L=Math.exp(-w*w/2);if(O.push(L),I===0)N+=L;else if(I<B)N+=2*L}for(let I=0;I<O.length;I++)O[I]=O[I]/N;if(q.envMap.value=J.texture,q.samples.value=B,q.weights.value=O,q.latitudinal.value=H==="latitudinal",K)q.poleAxis.value=K;let{_lodMax:_}=this;q.dTheta.value=F,q.mipInt.value=_-$;let C=this._sizeLods[Z],D=3*C*(Z>_-Q8?Z-_+Q8:0),P=4*(this._cubeSize-C);H7(Q,D,P,3*C,2*C),Y.setRenderTarget(Q),Y.render(G,f7)}}function AG(J){let Q=[],$=[],Z=[],W=J,H=J-Q8+1+LH.length;for(let K=0;K<H;K++){let Y=Math.pow(2,W);Q.push(Y);let X=1/Y;if(K>J-Q8)X=LH[K-J+Q8-1];else if(K===0)X=0;$.push(X);let U=1/(Y-2),G=-U,q=1+U,E=[G,G,q,G,q,q,G,G,q,q,G,q],F=6,k=6,B=3,O=2,N=1,_=new Float32Array(B*k*F),C=new Float32Array(O*k*F),D=new Float32Array(N*k*F);for(let I=0;I<F;I++){let w=I%3*2/3-1,L=I>2?0:-1,z=[w,L,0,w+0.6666666666666666,L,0,w+0.6666666666666666,L+1,0,w,L,0,w+0.6666666666666666,L+1,0,w,L+1,0];_.set(z,B*k*I),C.set(E,O*k*I);let g=[I,I,I,I,I,I];D.set(g,N*k*I)}let P=new yJ;if(P.setAttribute("position",new DJ(_,B)),P.setAttribute("uv",new DJ(C,O)),P.setAttribute("faceIndex",new DJ(D,N)),Z.push(new YJ(P,null)),W>Q8)W--}return{lodMeshes:Z,sizeLods:Q,sigmas:$}}function VH(J,Q,$){let Z=new rJ(J,Q,$);return Z.texture.mapping=z7,Z.texture.name="PMREM.cubeUv",Z.scissorTest=!0,Z}function H7(J,Q,$,Z,W){J.viewport.set(Q,$,Z,W),J.scissor.set(Q,$,Z,W)}function TG(J,Q,$){return new eJ({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:IG,CUBEUV_TEXEL_WIDTH:1/Q,CUBEUV_TEXEL_HEIGHT:1/$,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:JQ(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:O9,depthTest:!1,depthWrite:!1})}function SG(J,Q,$){let Z=new Float32Array(B8),W=new y(0,1,0);return new eJ({name:"SphericalGaussianBlur",defines:{n:B8,CUBEUV_TEXEL_WIDTH:1/Q,CUBEUV_TEXEL_HEIGHT:1/$,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:Z},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:W}},vertexShader:JQ(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:O9,depthTest:!1,depthWrite:!1})}function MH(){return new eJ({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:JQ(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:O9,depthTest:!1,depthWrite:!1})}function BH(){return new eJ({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:JQ(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:O9,depthTest:!1,depthWrite:!1})}function JQ(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class UZ extends rJ{constructor(J=1,Q={}){super(J,J,Q);this.isWebGLCubeRenderTarget=!0;let $={width:J,height:J,depth:1},Z=[$,$,$,$,$,$];this.texture=new g6(Z),this._setTextureOptions(Q),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(J,Q){this.texture.type=Q.type,this.texture.colorSpace=Q.colorSpace,this.texture.generateMipmaps=Q.generateMipmaps,this.texture.minFilter=Q.minFilter,this.texture.magFilter=Q.magFilter;let $={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},Z=new o9(5,5,5),W=new eJ({name:"CubemapFromEquirect",uniforms:L8($.uniforms),vertexShader:$.vertexShader,fragmentShader:$.fragmentShader,side:TJ,blending:O9});W.uniforms.tEquirect.value=Q;let H=new YJ(Z,W),K=Q.minFilter;if(Q.minFilter===R9)Q.minFilter=CJ;return new s$(1,10,this).update(J,H),Q.minFilter=K,H.geometry.dispose(),H.material.dispose(),this}clear(J,Q=!0,$=!0,Z=!0){let W=J.getRenderTarget();for(let H=0;H<6;H++)J.setRenderTarget(this,H),J.clear(Q,$,Z);J.setRenderTarget(W)}}function jG(J){let Q=new WeakMap,$=new WeakMap,Z=null;function W(E,F=!1){if(E===null||E===void 0)return null;if(F)return K(E);return H(E)}function H(E){if(E&&E.isTexture){let F=E.mapping;if(F===L6||F===D6)if(Q.has(E)){let k=Q.get(E).texture;return Y(k,E.mapping)}else{let k=E.image;if(k&&k.height>0){let B=new UZ(k.height);return B.fromEquirectangularTexture(J,E),Q.set(E,B),E.addEventListener("dispose",U),Y(B.texture,E.mapping)}else return null}}return E}function K(E){if(E&&E.isTexture){let F=E.mapping,k=F===L6||F===D6,B=F===n8||F===E8;if(k||B){let O=$.get(E),N=O!==void 0?O.texture.pmremVersion:0;if(E.isRenderTargetTexture&&E.pmremVersion!==N){if(Z===null)Z=new p7(J);return O=k?Z.fromEquirectangular(E,O):Z.fromCubemap(E,O),O.texture.pmremVersion=E.pmremVersion,$.set(E,O),O.texture}else if(O!==void 0)return O.texture;else{let _=E.image;if(k&&_&&_.height>0||B&&_&&X(_)){if(Z===null)Z=new p7(J);return O=k?Z.fromEquirectangular(E):Z.fromCubemap(E),O.texture.pmremVersion=E.pmremVersion,$.set(E,O),E.addEventListener("dispose",G),O.texture}else return null}}}return E}function Y(E,F){if(F===L6)E.mapping=n8;else if(F===D6)E.mapping=E8;return E}function X(E){let F=0,k=6;for(let B=0;B<k;B++)if(E[B]!==void 0)F++;return F===k}function U(E){let F=E.target;F.removeEventListener("dispose",U);let k=Q.get(F);if(k!==void 0)Q.delete(F),k.dispose()}function G(E){let F=E.target;F.removeEventListener("dispose",G);let k=$.get(F);if(k!==void 0)$.delete(F),k.dispose()}function q(){if(Q=new WeakMap,$=new WeakMap,Z!==null)Z.dispose(),Z=null}return{get:W,dispose:q}}function vG(J){let Q={};function $(Z){if(Q[Z]!==void 0)return Q[Z];let W=J.getExtension(Z);return Q[Z]=W,W}return{has:function(Z){return $(Z)!==null},init:function(){$("EXT_color_buffer_float"),$("WEBGL_clip_cull_distance"),$("OES_texture_float_linear"),$("EXT_color_buffer_half_float"),$("WEBGL_multisampled_render_to_texture"),$("WEBGL_render_shared_exponent")},get:function(Z){let W=$(Z);if(W===null)X8("WebGLRenderer: "+Z+" extension not supported.");return W}}}function yG(J,Q,$,Z){let W={},H=new WeakMap;function K(q){let E=q.target;if(E.index!==null)Q.remove(E.index);for(let k in E.attributes)Q.remove(E.attributes[k]);E.removeEventListener("dispose",K),delete W[E.id];let F=H.get(E);if(F)Q.remove(F),H.delete(E);if(Z.releaseStatesOfGeometry(E),E.isInstancedBufferGeometry===!0)delete E._maxInstanceCount;$.memory.geometries--}function Y(q,E){if(W[E.id]===!0)return E;return E.addEventListener("dispose",K),W[E.id]=!0,$.memory.geometries++,E}function X(q){let E=q.attributes;for(let F in E)Q.update(E[F],J.ARRAY_BUFFER)}function U(q){let E=[],F=q.index,k=q.attributes.position,B=0;if(k===void 0)return;if(F!==null){let _=F.array;B=F.version;for(let C=0,D=_.length;C<D;C+=3){let P=_[C+0],I=_[C+1],w=_[C+2];E.push(P,I,I,w,w,P)}}else{let _=k.array;B=k.version;for(let C=0,D=_.length/3-1;C<D;C+=3){let P=C+0,I=C+1,w=C+2;E.push(P,I,I,w,w,P)}}let O=new(k.count>=65535?y6:v6)(E,1);O.version=B;let N=H.get(q);if(N)Q.remove(N);H.set(q,O)}function G(q){let E=H.get(q);if(E){let F=q.index;if(F!==null){if(E.version<F.version)U(q)}}else U(q);return H.get(q)}return{get:Y,update:X,getWireframeAttribute:G}}function hG(J,Q,$){let Z;function W(q){Z=q}let H,K;function Y(q){H=q.type,K=q.bytesPerElement}function X(q,E){J.drawElements(Z,E,H,q*K),$.update(E,Z,1)}function U(q,E,F){if(F===0)return;J.drawElementsInstanced(Z,E,H,q*K,F),$.update(E,Z,F)}function G(q,E,F){if(F===0)return;Q.get("WEBGL_multi_draw").multiDrawElementsWEBGL(Z,E,0,H,q,0,F);let B=0;for(let O=0;O<F;O++)B+=E[O];$.update(B,Z,1)}this.setMode=W,this.setIndex=Y,this.render=X,this.renderInstances=U,this.renderMultiDraw=G}function fG(J){let Q={geometries:0,textures:0},$={frame:0,calls:0,triangles:0,points:0,lines:0};function Z(H,K,Y){switch($.calls++,K){case J.TRIANGLES:$.triangles+=Y*(H/3);break;case J.LINES:$.lines+=Y*(H/2);break;case J.LINE_STRIP:$.lines+=Y*(H-1);break;case J.LINE_LOOP:$.lines+=Y*H;break;case J.POINTS:$.points+=Y*H;break;default:A0("WebGLInfo: Unknown draw mode:",K);break}}function W(){$.calls=0,$.triangles=0,$.points=0,$.lines=0}return{memory:Q,render:$,programs:null,autoReset:!0,reset:W,update:Z}}function bG(J,Q,$){let Z=new WeakMap,W=new a0;function H(K,Y,X){let U=K.morphTargetInfluences,G=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,q=G!==void 0?G.length:0,E=Z.get(Y);if(E===void 0||E.count!==q){let z=function(){w.dispose(),Z.delete(Y),Y.removeEventListener("dispose",z)};if(E!==void 0)E.texture.dispose();let F=Y.morphAttributes.position!==void 0,k=Y.morphAttributes.normal!==void 0,B=Y.morphAttributes.color!==void 0,O=Y.morphAttributes.position||[],N=Y.morphAttributes.normal||[],_=Y.morphAttributes.color||[],C=0;if(F===!0)C=1;if(k===!0)C=2;if(B===!0)C=3;let D=Y.attributes.position.count*C,P=1;if(D>Q.maxTextureSize)P=Math.ceil(D/Q.maxTextureSize),D=Q.maxTextureSize;let I=new Float32Array(D*P*4*q),w=new S6(I,D,P,q);w.type=j9,w.needsUpdate=!0;let L=C*4;for(let g=0;g<q;g++){let A=O[g],m=N[g],a=_[g],p=D*P*4*g;for(let n=0;n<A.count;n++){let u=n*L;if(F===!0)W.fromBufferAttribute(A,n),I[p+u+0]=W.x,I[p+u+1]=W.y,I[p+u+2]=W.z,I[p+u+3]=0;if(k===!0)W.fromBufferAttribute(m,n),I[p+u+4]=W.x,I[p+u+5]=W.y,I[p+u+6]=W.z,I[p+u+7]=0;if(B===!0)W.fromBufferAttribute(a,n),I[p+u+8]=W.x,I[p+u+9]=W.y,I[p+u+10]=W.z,I[p+u+11]=a.itemSize===4?W.w:1}}E={count:q,texture:w,size:new y0(D,P)},Z.set(Y,E),Y.addEventListener("dispose",z)}if(K.isInstancedMesh===!0&&K.morphTexture!==null)X.getUniforms().setValue(J,"morphTexture",K.morphTexture,$);else{let F=0;for(let B=0;B<U.length;B++)F+=U[B];let k=Y.morphTargetsRelative?1:1-F;X.getUniforms().setValue(J,"morphTargetBaseInfluence",k),X.getUniforms().setValue(J,"morphTargetInfluences",U)}X.getUniforms().setValue(J,"morphTargetsTexture",E.texture,$),X.getUniforms().setValue(J,"morphTargetsTextureSize",E.size)}return{update:H}}function xG(J,Q,$,Z,W){let H=new WeakMap;function K(U){let G=W.render.frame,q=U.geometry,E=Q.get(U,q);if(H.get(E)!==G)Q.update(E),H.set(E,G);if(U.isInstancedMesh){if(U.hasEventListener("dispose",X)===!1)U.addEventListener("dispose",X);if(H.get(U)!==G){if($.update(U.instanceMatrix,J.ARRAY_BUFFER),U.instanceColor!==null)$.update(U.instanceColor,J.ARRAY_BUFFER);H.set(U,G)}}if(U.isSkinnedMesh){let F=U.skeleton;if(H.get(F)!==G)F.update(),H.set(F,G)}return E}function Y(){H=new WeakMap}function X(U){let G=U.target;if(G.removeEventListener("dispose",X),Z.releaseStatesOfObject(G),$.remove(G.instanceMatrix),G.instanceColor!==null)$.remove(G.instanceColor)}return{update:K,dispose:Y}}var gG={[fQ]:"LINEAR_TONE_MAPPING",[bQ]:"REINHARD_TONE_MAPPING",[xQ]:"CINEON_TONE_MAPPING",[B7]:"ACES_FILMIC_TONE_MAPPING",[pQ]:"AGX_TONE_MAPPING",[lQ]:"NEUTRAL_TONE_MAPPING",[gQ]:"CUSTOM_TONE_MAPPING"};function pG(J,Q,$,Z,W,H){let K=new rJ(Q,$,{type:J,depthBuffer:W,stencilBuffer:H,samples:Z?4:0,depthTexture:W?new i9(Q,$):void 0}),Y=new rJ(Q,$,{type:v9,depthBuffer:!1,stencilBuffer:!1}),X=new yJ;X.setAttribute("position",new hJ([-1,3,0,-1,-1,0,3,-1,0],3)),X.setAttribute("uv",new hJ([0,2,0,0,2,0],2));let U=new x$({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),G=new YJ(X,U),q=new V8(-1,1,1,-1,0,1),E=null,F=null,k=!1,B,O=null,N=[],_=!1;this.setSize=function(C,D){K.setSize(C,D),Y.setSize(C,D);for(let P=0;P<N.length;P++){let I=N[P];if(I.setSize)I.setSize(C,D)}},this.setEffects=function(C){N=C,_=N.length>0&&N[0].isRenderPass===!0;let{width:D,height:P}=K;for(let I=0;I<N.length;I++){let w=N[I];if(w.setSize)w.setSize(D,P)}},this.begin=function(C,D){if(k)return!1;if(C.toneMapping===K9&&N.length===0)return!1;if(O=D,D!==null){let{width:P,height:I}=D;if(K.width!==P||K.height!==I)this.setSize(P,I)}if(_===!1)C.setRenderTarget(K);return B=C.toneMapping,C.toneMapping=K9,!0},this.hasRenderPass=function(){return _},this.end=function(C,D){C.toneMapping=B,k=!0;let P=K,I=Y;for(let w=0;w<N.length;w++){let L=N[w];if(L.enabled===!1)continue;if(L.render(C,I,P,D),L.needsSwap!==!1){let z=P;P=I,I=z}}if(E!==C.outputColorSpace||F!==C.toneMapping){if(E=C.outputColorSpace,F=C.toneMapping,U.defines={},b0.getTransfer(E)===$J)U.defines.SRGB_TRANSFER="";let w=gG[F];if(w)U.defines[w]="";U.needsUpdate=!0}U.uniforms.tDiffuse.value=P.texture,C.setRenderTarget(O),C.render(G,q),O=null,k=!1},this.isCompositing=function(){return k},this.dispose=function(){if(K.depthTexture)K.depthTexture.dispose();K.dispose(),Y.dispose(),X.dispose(),U.dispose()}}var mH=new FJ,YZ=new i9(1,1),dH=new S6,uH=new h$,cH=new g6,zH=[],_H=[],CH=new Float32Array(16),PH=new Float32Array(9),IH=new Float32Array(4);function K7(J,Q,$){let Z=J[0];if(Z<=0||Z>0)return J;let W=Q*$,H=zH[W];if(H===void 0)H=new Float32Array(W),zH[W]=H;if(Q!==0){Z.toArray(H,0);for(let K=1,Y=0;K!==Q;++K)Y+=$,J[K].toArray(H,Y)}return H}function VJ(J,Q){if(J.length!==Q.length)return!1;for(let $=0,Z=J.length;$<Z;$++)if(J[$]!==Q[$])return!1;return!0}function MJ(J,Q){for(let $=0,Z=Q.length;$<Z;$++)J[$]=Q[$]}function QQ(J,Q){let $=_H[Q];if($===void 0)$=new Int32Array(Q),_H[Q]=$;for(let Z=0;Z!==Q;++Z)$[Z]=J.allocateTextureUnit();return $}function lG(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1f(this.addr,Q),$[0]=Q}function mG(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2f(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(VJ($,Q))return;J.uniform2fv(this.addr,Q),MJ($,Q)}}function dG(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3f(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else if(Q.r!==void 0){if($[0]!==Q.r||$[1]!==Q.g||$[2]!==Q.b)J.uniform3f(this.addr,Q.r,Q.g,Q.b),$[0]=Q.r,$[1]=Q.g,$[2]=Q.b}else{if(VJ($,Q))return;J.uniform3fv(this.addr,Q),MJ($,Q)}}function uG(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4f(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(VJ($,Q))return;J.uniform4fv(this.addr,Q),MJ($,Q)}}function cG(J,Q){let $=this.cache,Z=Q.elements;if(Z===void 0){if(VJ($,Q))return;J.uniformMatrix2fv(this.addr,!1,Q),MJ($,Q)}else{if(VJ($,Z))return;IH.set(Z),J.uniformMatrix2fv(this.addr,!1,IH),MJ($,Z)}}function nG(J,Q){let $=this.cache,Z=Q.elements;if(Z===void 0){if(VJ($,Q))return;J.uniformMatrix3fv(this.addr,!1,Q),MJ($,Q)}else{if(VJ($,Z))return;PH.set(Z),J.uniformMatrix3fv(this.addr,!1,PH),MJ($,Z)}}function sG(J,Q){let $=this.cache,Z=Q.elements;if(Z===void 0){if(VJ($,Q))return;J.uniformMatrix4fv(this.addr,!1,Q),MJ($,Q)}else{if(VJ($,Z))return;CH.set(Z),J.uniformMatrix4fv(this.addr,!1,CH),MJ($,Z)}}function iG(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1i(this.addr,Q),$[0]=Q}function oG(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2i(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(VJ($,Q))return;J.uniform2iv(this.addr,Q),MJ($,Q)}}function aG(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3i(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else{if(VJ($,Q))return;J.uniform3iv(this.addr,Q),MJ($,Q)}}function rG(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4i(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(VJ($,Q))return;J.uniform4iv(this.addr,Q),MJ($,Q)}}function tG(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1ui(this.addr,Q),$[0]=Q}function eG(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2ui(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(VJ($,Q))return;J.uniform2uiv(this.addr,Q),MJ($,Q)}}function J5(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3ui(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else{if(VJ($,Q))return;J.uniform3uiv(this.addr,Q),MJ($,Q)}}function Q5(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4ui(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(VJ($,Q))return;J.uniform4uiv(this.addr,Q),MJ($,Q)}}function $5(J,Q,$){let Z=this.cache,W=$.allocateTextureUnit();if(Z[0]!==W)J.uniform1i(this.addr,W),Z[0]=W;let H;if(this.type===J.SAMPLER_2D_SHADOW)YZ.compareFunction=$.isReversedDepthBuffer()?T6:A6,H=YZ;else H=mH;$.setTexture2D(Q||H,W)}function Z5(J,Q,$){let Z=this.cache,W=$.allocateTextureUnit();if(Z[0]!==W)J.uniform1i(this.addr,W),Z[0]=W;$.setTexture3D(Q||uH,W)}function W5(J,Q,$){let Z=this.cache,W=$.allocateTextureUnit();if(Z[0]!==W)J.uniform1i(this.addr,W),Z[0]=W;$.setTextureCube(Q||cH,W)}function H5(J,Q,$){let Z=this.cache,W=$.allocateTextureUnit();if(Z[0]!==W)J.uniform1i(this.addr,W),Z[0]=W;$.setTexture2DArray(Q||dH,W)}function K5(J){switch(J){case 5126:return lG;case 35664:return mG;case 35665:return dG;case 35666:return uG;case 35674:return cG;case 35675:return nG;case 35676:return sG;case 5124:case 35670:return iG;case 35667:case 35671:return oG;case 35668:case 35672:return aG;case 35669:case 35673:return rG;case 5125:return tG;case 36294:return eG;case 36295:return J5;case 36296:return Q5;case 35678:case 36198:case 36298:case 36306:case 35682:return $5;case 35679:case 36299:case 36307:return Z5;case 35680:case 36300:case 36308:case 36293:return W5;case 36289:case 36303:case 36311:case 36292:return H5}}function Y5(J,Q){J.uniform1fv(this.addr,Q)}function X5(J,Q){let $=K7(Q,this.size,2);J.uniform2fv(this.addr,$)}function U5(J,Q){let $=K7(Q,this.size,3);J.uniform3fv(this.addr,$)}function G5(J,Q){let $=K7(Q,this.size,4);J.uniform4fv(this.addr,$)}function E5(J,Q){let $=K7(Q,this.size,4);J.uniformMatrix2fv(this.addr,!1,$)}function q5(J,Q){let $=K7(Q,this.size,9);J.uniformMatrix3fv(this.addr,!1,$)}function N5(J,Q){let $=K7(Q,this.size,16);J.uniformMatrix4fv(this.addr,!1,$)}function F5(J,Q){J.uniform1iv(this.addr,Q)}function O5(J,Q){J.uniform2iv(this.addr,Q)}function R5(J,Q){J.uniform3iv(this.addr,Q)}function k5(J,Q){J.uniform4iv(this.addr,Q)}function L5(J,Q){J.uniform1uiv(this.addr,Q)}function D5(J,Q){J.uniform2uiv(this.addr,Q)}function V5(J,Q){J.uniform3uiv(this.addr,Q)}function M5(J,Q){J.uniform4uiv(this.addr,Q)}function B5(J,Q,$){let Z=this.cache,W=Q.length,H=QQ($,W);if(!VJ(Z,H))J.uniform1iv(this.addr,H),MJ(Z,H);let K;if(this.type===J.SAMPLER_2D_SHADOW)K=YZ;else K=mH;for(let Y=0;Y!==W;++Y)$.setTexture2D(Q[Y]||K,H[Y])}function z5(J,Q,$){let Z=this.cache,W=Q.length,H=QQ($,W);if(!VJ(Z,H))J.uniform1iv(this.addr,H),MJ(Z,H);for(let K=0;K!==W;++K)$.setTexture3D(Q[K]||uH,H[K])}function _5(J,Q,$){let Z=this.cache,W=Q.length,H=QQ($,W);if(!VJ(Z,H))J.uniform1iv(this.addr,H),MJ(Z,H);for(let K=0;K!==W;++K)$.setTextureCube(Q[K]||cH,H[K])}function C5(J,Q,$){let Z=this.cache,W=Q.length,H=QQ($,W);if(!VJ(Z,H))J.uniform1iv(this.addr,H),MJ(Z,H);for(let K=0;K!==W;++K)$.setTexture2DArray(Q[K]||dH,H[K])}function P5(J){switch(J){case 5126:return Y5;case 35664:return X5;case 35665:return U5;case 35666:return G5;case 35674:return E5;case 35675:return q5;case 35676:return N5;case 5124:case 35670:return F5;case 35667:case 35671:return O5;case 35668:case 35672:return R5;case 35669:case 35673:return k5;case 5125:return L5;case 36294:return D5;case 36295:return V5;case 36296:return M5;case 35678:case 36198:case 36298:case 36306:case 35682:return B5;case 35679:case 36299:case 36307:return z5;case 35680:case 36300:case 36308:case 36293:return _5;case 36289:case 36303:case 36311:case 36292:return C5}}class nH{constructor(J,Q,$){this.id=J,this.addr=$,this.cache=[],this.type=Q.type,this.setValue=K5(Q.type)}}class sH{constructor(J,Q,$){this.id=J,this.addr=$,this.cache=[],this.type=Q.type,this.size=Q.size,this.setValue=P5(Q.type)}}class iH{constructor(J){this.id=J,this.seq=[],this.map={}}setValue(J,Q,$){let Z=this.seq;for(let W=0,H=Z.length;W!==H;++W){let K=Z[W];K.setValue(J,Q[K.id],$)}}}var HZ=/(\w+)(\])?(\[|\.)?/g;function wH(J,Q){J.seq.push(Q),J.map[Q.id]=Q}function I5(J,Q,$){let Z=J.name,W=Z.length;HZ.lastIndex=0;while(!0){let H=HZ.exec(Z),K=HZ.lastIndex,Y=H[1],X=H[2]==="]",U=H[3];if(X)Y=Y|0;if(U===void 0||U==="["&&K+2===W){wH($,U===void 0?new nH(Y,J,Q):new sH(Y,J,Q));break}else{let q=$.map[Y];if(q===void 0)q=new iH(Y),wH($,q);$=q}}}class g7{constructor(J,Q){this.seq=[],this.map={};let $=J.getProgramParameter(Q,J.ACTIVE_UNIFORMS);for(let H=0;H<$;++H){let K=J.getActiveUniform(Q,H),Y=J.getUniformLocation(Q,K.name);I5(K,Y,this)}let Z=[],W=[];for(let H of this.seq)if(H.type===J.SAMPLER_2D_SHADOW||H.type===J.SAMPLER_CUBE_SHADOW||H.type===J.SAMPLER_2D_ARRAY_SHADOW)Z.push(H);else W.push(H);if(Z.length>0)this.seq=Z.concat(W)}setValue(J,Q,$,Z){let W=this.map[Q];if(W!==void 0)W.setValue(J,$,Z)}setOptional(J,Q,$){let Z=Q[$];if(Z!==void 0)this.setValue(J,$,Z)}static upload(J,Q,$,Z){for(let W=0,H=Q.length;W!==H;++W){let K=Q[W],Y=$[K.id];if(Y.needsUpdate!==!1)K.setValue(J,Y.value,Z)}}static seqWithValue(J,Q){let $=[];for(let Z=0,W=J.length;Z!==W;++Z){let H=J[Z];if(H.id in Q)$.push(H)}return $}}function AH(J,Q,$){let Z=J.createShader(Q);return J.shaderSource(Z,$),J.compileShader(Z),Z}var w5=37297,A5=0;function T5(J,Q){let $=J.split(`
`),Z=[],W=Math.max(Q-6,0),H=Math.min(Q+6,$.length);for(let K=W;K<H;K++){let Y=K+1;Z.push(`${Y===Q?">":" "} ${Y}: ${$[K]}`)}return Z.join(`
`)}var TH=new T0;function S5(J){b0._getMatrix(TH,b0.workingColorSpace,J);let Q=`mat3( ${TH.elements.map(($)=>$.toFixed(4))} )`;switch(b0.getTransfer(J)){case w$:return[Q,"LinearTransferOETF"];case $J:return[Q,"sRGBTransferOETF"];default:return M0("WebGLProgram: Unsupported color space: ",J),[Q,"LinearTransferOETF"]}}function SH(J,Q,$){let Z=J.getShaderParameter(Q,J.COMPILE_STATUS),H=(J.getShaderInfoLog(Q)||"").trim();if(Z&&H==="")return"";let K=/ERROR: 0:(\d+)/.exec(H);if(K){let Y=parseInt(K[1]);return $.toUpperCase()+`

`+H+`

`+T5(J.getShaderSource(Q),Y)}else return H}function j5(J,Q){let $=S5(Q);return[`vec4 ${J}( vec4 value ) {`,`	return ${$[1]}( vec4( value.rgb * ${$[0]}, value.a ) );`,"}"].join(`
`)}var v5={[fQ]:"Linear",[bQ]:"Reinhard",[xQ]:"Cineon",[B7]:"ACESFilmic",[pQ]:"AgX",[lQ]:"Neutral",[gQ]:"Custom"};function y5(J,Q){let $=v5[Q];if($===void 0)return M0("WebGLProgram: Unsupported toneMapping:",Q),"vec3 "+J+"( vec3 color ) { return LinearToneMapping( color ); }";return"vec3 "+J+"( vec3 color ) { return "+$+"ToneMapping( color ); }"}var e6=new y;function h5(){b0.getLuminanceCoefficients(e6);let J=e6.x.toFixed(4),Q=e6.y.toFixed(4),$=e6.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${J}, ${Q}, ${$} );`,"\treturn dot( weights, rgb );","}"].join(`
`)}function f5(J){return[J.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",J.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(x7).join(`
`)}function b5(J){let Q=[];for(let $ in J){let Z=J[$];if(Z===!1)continue;Q.push("#define "+$+" "+Z)}return Q.join(`
`)}function x5(J,Q){let $={},Z=J.getProgramParameter(Q,J.ACTIVE_ATTRIBUTES);for(let W=0;W<Z;W++){let H=J.getActiveAttrib(Q,W),K=H.name,Y=1;if(H.type===J.FLOAT_MAT2)Y=2;if(H.type===J.FLOAT_MAT3)Y=3;if(H.type===J.FLOAT_MAT4)Y=4;$[K]={type:H.type,location:J.getAttribLocation(Q,K),locationSize:Y}}return $}function x7(J){return J!==""}function jH(J,Q){let $=Q.numSpotLightShadows+Q.numSpotLightMaps-Q.numSpotLightShadowsWithMaps;return J.replace(/NUM_DIR_LIGHTS/g,Q.numDirLights).replace(/NUM_SPOT_LIGHTS/g,Q.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,Q.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,$).replace(/NUM_RECT_AREA_LIGHTS/g,Q.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,Q.numPointLights).replace(/NUM_HEMI_LIGHTS/g,Q.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,Q.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,Q.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,Q.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,Q.numPointLightShadows)}function vH(J,Q){return J.replace(/NUM_CLIPPING_PLANES/g,Q.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,Q.numClippingPlanes-Q.numClipIntersection)}var g5=/^[ \t]*#include +<([\w\d./]+)>/gm;function XZ(J){return J.replace(g5,l5)}var p5=new Map;function l5(J,Q){let $=h0[Q];if($===void 0){let Z=p5.get(Q);if(Z!==void 0)$=h0[Z],M0('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',Q,Z);else throw Error("THREE.WebGLProgram: Can not resolve #include <"+Q+">")}return XZ($)}var m5=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function yH(J){return J.replace(m5,d5)}function d5(J,Q,$,Z){let W="";for(let H=parseInt(Q);H<parseInt($);H++)W+=Z.replace(/\[\s*i\s*\]/g,"[ "+H+" ]").replace(/UNROLLED_LOOP_INDEX/g,H);return W}function hH(J){let Q=`precision ${J.precision} float;
	precision ${J.precision} int;
	precision ${J.precision} sampler2D;
	precision ${J.precision} samplerCube;
	precision ${J.precision} sampler3D;
	precision ${J.precision} sampler2DArray;
	precision ${J.precision} sampler2DShadow;
	precision ${J.precision} samplerCubeShadow;
	precision ${J.precision} sampler2DArrayShadow;
	precision ${J.precision} isampler2D;
	precision ${J.precision} isampler3D;
	precision ${J.precision} isamplerCube;
	precision ${J.precision} isampler2DArray;
	precision ${J.precision} usampler2D;
	precision ${J.precision} usampler3D;
	precision ${J.precision} usamplerCube;
	precision ${J.precision} usampler2DArray;
	`;if(J.precision==="highp")Q+=`
#define HIGH_PRECISION`;else if(J.precision==="mediump")Q+=`
#define MEDIUM_PRECISION`;else if(J.precision==="lowp")Q+=`
#define LOW_PRECISION`;return Q}var u5={[V7]:"SHADOWMAP_TYPE_PCF",[u8]:"SHADOWMAP_TYPE_VSM"};function c5(J){return u5[J.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var n5={[n8]:"ENVMAP_TYPE_CUBE",[E8]:"ENVMAP_TYPE_CUBE",[z7]:"ENVMAP_TYPE_CUBE_UV"};function s5(J){if(J.envMap===!1)return"ENVMAP_TYPE_CUBE";return n5[J.envMapMode]||"ENVMAP_TYPE_CUBE"}var i5={[E8]:"ENVMAP_MODE_REFRACTION"};function o5(J){if(J.envMap===!1)return"ENVMAP_MODE_REFLECTION";return i5[J.envMapMode]||"ENVMAP_MODE_REFLECTION"}var a5={[dW]:"ENVMAP_BLENDING_MULTIPLY",[uW]:"ENVMAP_BLENDING_MIX",[cW]:"ENVMAP_BLENDING_ADD"};function r5(J){if(J.envMap===!1)return"ENVMAP_BLENDING_NONE";return a5[J.combine]||"ENVMAP_BLENDING_NONE"}function t5(J){let Q=J.envMapCubeUVHeight;if(Q===null)return null;let $=Math.log2(Q)-2,Z=1/Q;return{texelWidth:1/(3*Math.max(Math.pow(2,$),112)),texelHeight:Z,maxMip:$}}function e5(J,Q,$,Z){let W=J.getContext(),H=$.defines,K=$.vertexShader,Y=$.fragmentShader,X=c5($),U=s5($),G=o5($),q=r5($),E=t5($),F=f5($),k=b5(H),B=W.createProgram(),O,N,_=$.glslVersion?"#version "+$.glslVersion+`
`:"";if($.isRawShaderMaterial){if(O=["#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,k].filter(x7).join(`
`),O.length>0)O+=`
`;if(N=["#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,k].filter(x7).join(`
`),N.length>0)N+=`
`}else O=[hH($),"#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,k,$.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",$.batching?"#define USE_BATCHING":"",$.batchingColor?"#define USE_BATCHING_COLOR":"",$.instancing?"#define USE_INSTANCING":"",$.instancingColor?"#define USE_INSTANCING_COLOR":"",$.instancingMorph?"#define USE_INSTANCING_MORPH":"",$.useFog&&$.fog?"#define USE_FOG":"",$.useFog&&$.fogExp2?"#define FOG_EXP2":"",$.map?"#define USE_MAP":"",$.envMap?"#define USE_ENVMAP":"",$.envMap?"#define "+G:"",$.lightMap?"#define USE_LIGHTMAP":"",$.aoMap?"#define USE_AOMAP":"",$.bumpMap?"#define USE_BUMPMAP":"",$.normalMap?"#define USE_NORMALMAP":"",$.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",$.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",$.displacementMap?"#define USE_DISPLACEMENTMAP":"",$.emissiveMap?"#define USE_EMISSIVEMAP":"",$.anisotropy?"#define USE_ANISOTROPY":"",$.anisotropyMap?"#define USE_ANISOTROPYMAP":"",$.clearcoatMap?"#define USE_CLEARCOATMAP":"",$.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",$.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",$.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",$.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",$.specularMap?"#define USE_SPECULARMAP":"",$.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",$.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",$.roughnessMap?"#define USE_ROUGHNESSMAP":"",$.metalnessMap?"#define USE_METALNESSMAP":"",$.alphaMap?"#define USE_ALPHAMAP":"",$.alphaHash?"#define USE_ALPHAHASH":"",$.transmission?"#define USE_TRANSMISSION":"",$.transmissionMap?"#define USE_TRANSMISSIONMAP":"",$.thicknessMap?"#define USE_THICKNESSMAP":"",$.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",$.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",$.mapUv?"#define MAP_UV "+$.mapUv:"",$.alphaMapUv?"#define ALPHAMAP_UV "+$.alphaMapUv:"",$.lightMapUv?"#define LIGHTMAP_UV "+$.lightMapUv:"",$.aoMapUv?"#define AOMAP_UV "+$.aoMapUv:"",$.emissiveMapUv?"#define EMISSIVEMAP_UV "+$.emissiveMapUv:"",$.bumpMapUv?"#define BUMPMAP_UV "+$.bumpMapUv:"",$.normalMapUv?"#define NORMALMAP_UV "+$.normalMapUv:"",$.displacementMapUv?"#define DISPLACEMENTMAP_UV "+$.displacementMapUv:"",$.metalnessMapUv?"#define METALNESSMAP_UV "+$.metalnessMapUv:"",$.roughnessMapUv?"#define ROUGHNESSMAP_UV "+$.roughnessMapUv:"",$.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+$.anisotropyMapUv:"",$.clearcoatMapUv?"#define CLEARCOATMAP_UV "+$.clearcoatMapUv:"",$.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+$.clearcoatNormalMapUv:"",$.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+$.clearcoatRoughnessMapUv:"",$.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+$.iridescenceMapUv:"",$.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+$.iridescenceThicknessMapUv:"",$.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+$.sheenColorMapUv:"",$.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+$.sheenRoughnessMapUv:"",$.specularMapUv?"#define SPECULARMAP_UV "+$.specularMapUv:"",$.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+$.specularColorMapUv:"",$.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+$.specularIntensityMapUv:"",$.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+$.transmissionMapUv:"",$.thicknessMapUv?"#define THICKNESSMAP_UV "+$.thicknessMapUv:"",$.vertexTangents&&$.flatShading===!1?"#define USE_TANGENT":"",$.vertexNormals?"#define HAS_NORMAL":"",$.vertexColors?"#define USE_COLOR":"",$.vertexAlphas?"#define USE_COLOR_ALPHA":"",$.vertexUv1s?"#define USE_UV1":"",$.vertexUv2s?"#define USE_UV2":"",$.vertexUv3s?"#define USE_UV3":"",$.pointsUvs?"#define USE_POINTS_UV":"",$.flatShading?"#define FLAT_SHADED":"",$.skinning?"#define USE_SKINNING":"",$.morphTargets?"#define USE_MORPHTARGETS":"",$.morphNormals&&$.flatShading===!1?"#define USE_MORPHNORMALS":"",$.morphColors?"#define USE_MORPHCOLORS":"",$.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+$.morphTextureStride:"",$.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+$.morphTargetsCount:"",$.doubleSided?"#define DOUBLE_SIDED":"",$.flipSided?"#define FLIP_SIDED":"",$.shadowMapEnabled?"#define USE_SHADOWMAP":"",$.shadowMapEnabled?"#define "+X:"",$.sizeAttenuation?"#define USE_SIZEATTENUATION":"",$.numLightProbes>0?"#define USE_LIGHT_PROBES":"",$.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",$.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","\tattribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","\tattribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","\tuniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","\tattribute vec2 uv1;","#endif","#ifdef USE_UV2","\tattribute vec2 uv2;","#endif","#ifdef USE_UV3","\tattribute vec2 uv3;","#endif","#ifdef USE_TANGENT","\tattribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","\tattribute vec4 color;","#elif defined( USE_COLOR )","\tattribute vec3 color;","#endif","#ifdef USE_SKINNING","\tattribute vec4 skinIndex;","\tattribute vec4 skinWeight;","#endif",`
`].filter(x7).join(`
`),N=[hH($),"#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,k,$.useFog&&$.fog?"#define USE_FOG":"",$.useFog&&$.fogExp2?"#define FOG_EXP2":"",$.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",$.map?"#define USE_MAP":"",$.matcap?"#define USE_MATCAP":"",$.envMap?"#define USE_ENVMAP":"",$.envMap?"#define "+U:"",$.envMap?"#define "+G:"",$.envMap?"#define "+q:"",E?"#define CUBEUV_TEXEL_WIDTH "+E.texelWidth:"",E?"#define CUBEUV_TEXEL_HEIGHT "+E.texelHeight:"",E?"#define CUBEUV_MAX_MIP "+E.maxMip+".0":"",$.lightMap?"#define USE_LIGHTMAP":"",$.aoMap?"#define USE_AOMAP":"",$.bumpMap?"#define USE_BUMPMAP":"",$.normalMap?"#define USE_NORMALMAP":"",$.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",$.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",$.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",$.emissiveMap?"#define USE_EMISSIVEMAP":"",$.anisotropy?"#define USE_ANISOTROPY":"",$.anisotropyMap?"#define USE_ANISOTROPYMAP":"",$.clearcoat?"#define USE_CLEARCOAT":"",$.clearcoatMap?"#define USE_CLEARCOATMAP":"",$.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",$.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",$.dispersion?"#define USE_DISPERSION":"",$.iridescence?"#define USE_IRIDESCENCE":"",$.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",$.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",$.specularMap?"#define USE_SPECULARMAP":"",$.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",$.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",$.roughnessMap?"#define USE_ROUGHNESSMAP":"",$.metalnessMap?"#define USE_METALNESSMAP":"",$.alphaMap?"#define USE_ALPHAMAP":"",$.alphaTest?"#define USE_ALPHATEST":"",$.alphaHash?"#define USE_ALPHAHASH":"",$.sheen?"#define USE_SHEEN":"",$.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",$.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",$.transmission?"#define USE_TRANSMISSION":"",$.transmissionMap?"#define USE_TRANSMISSIONMAP":"",$.thicknessMap?"#define USE_THICKNESSMAP":"",$.vertexTangents&&$.flatShading===!1?"#define USE_TANGENT":"",$.vertexColors||$.instancingColor?"#define USE_COLOR":"",$.vertexAlphas||$.batchingColor?"#define USE_COLOR_ALPHA":"",$.vertexUv1s?"#define USE_UV1":"",$.vertexUv2s?"#define USE_UV2":"",$.vertexUv3s?"#define USE_UV3":"",$.pointsUvs?"#define USE_POINTS_UV":"",$.gradientMap?"#define USE_GRADIENTMAP":"",$.flatShading?"#define FLAT_SHADED":"",$.doubleSided?"#define DOUBLE_SIDED":"",$.flipSided?"#define FLIP_SIDED":"",$.shadowMapEnabled?"#define USE_SHADOWMAP":"",$.shadowMapEnabled?"#define "+X:"",$.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",$.numLightProbes>0?"#define USE_LIGHT_PROBES":"",$.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",$.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",$.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",$.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",$.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",$.toneMapping!==K9?"#define TONE_MAPPING":"",$.toneMapping!==K9?h0.tonemapping_pars_fragment:"",$.toneMapping!==K9?y5("toneMapping",$.toneMapping):"",$.dithering?"#define DITHERING":"",$.opaque?"#define OPAQUE":"",h0.colorspace_pars_fragment,j5("linearToOutputTexel",$.outputColorSpace),h5(),$.useDepthPacking?"#define DEPTH_PACKING "+$.depthPacking:"",`
`].filter(x7).join(`
`);if(K=XZ(K),K=jH(K,$),K=vH(K,$),Y=XZ(Y),Y=jH(Y,$),Y=vH(Y,$),K=yH(K),Y=yH(Y),$.isRawShaderMaterial!==!0)_=`#version 300 es
`,O=[F,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+O,N=["#define varying in",$.glslVersion===A$?"":"layout(location = 0) out highp vec4 pc_fragColor;",$.glslVersion===A$?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+N;let C=_+O+K,D=_+N+Y,P=AH(W,W.VERTEX_SHADER,C),I=AH(W,W.FRAGMENT_SHADER,D);if(W.attachShader(B,P),W.attachShader(B,I),$.index0AttributeName!==void 0)W.bindAttribLocation(B,0,$.index0AttributeName);else if($.hasPositionAttribute===!0)W.bindAttribLocation(B,0,"position");W.linkProgram(B);function w(A){if(J.debug.checkShaderErrors){let m=W.getProgramInfoLog(B)||"",a=W.getShaderInfoLog(P)||"",p=W.getShaderInfoLog(I)||"",n=m.trim(),u=a.trim(),h=p.trim(),o=!0,r=!0;if(W.getProgramParameter(B,W.LINK_STATUS)===!1)if(o=!1,typeof J.debug.onShaderError==="function")J.debug.onShaderError(W,B,P,I);else{let W0=SH(W,P,"vertex"),L0=SH(W,I,"fragment");A0("WebGLProgram: Shader Error "+W.getError()+" - VALIDATE_STATUS "+W.getProgramParameter(B,W.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+n+`
`+W0+`
`+L0)}else if(n!=="")M0("WebGLProgram: Program Info Log:",n);else if(u===""||h==="")r=!1;if(r)A.diagnostics={runnable:o,programLog:n,vertexShader:{log:u,prefix:O},fragmentShader:{log:h,prefix:N}}}W.deleteShader(P),W.deleteShader(I),L=new g7(W,B),z=x5(W,B)}let L;this.getUniforms=function(){if(L===void 0)w(this);return L};let z;this.getAttributes=function(){if(z===void 0)w(this);return z};let g=$.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){if(g===!1)g=W.getProgramParameter(B,w5);return g},this.destroy=function(){Z.releaseStatesOfProgram(this),W.deleteProgram(B),this.program=void 0},this.type=$.shaderType,this.name=$.shaderName,this.id=A5++,this.cacheKey=Q,this.usedTimes=1,this.program=B,this.vertexShader=P,this.fragmentShader=I,this}var JE=0;class oH{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(J,Q,$){let Z=this._getShaderCacheForMaterial(J);if(Z.has(Q)===!1)Z.add(Q),Q.usedTimes++;if(Z.has($)===!1)Z.add($),$.usedTimes++;return this}remove(J){let Q=this.materialCache.get(J);for(let $ of Q)if($.usedTimes--,$.usedTimes===0)this.shaderCache.delete($.code);return this.materialCache.delete(J),this}getVertexShaderStage(J){return this._getShaderStage(J.vertexShader)}getFragmentShaderStage(J){return this._getShaderStage(J.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(J){let Q=this.materialCache,$=Q.get(J);if($===void 0)$=new Set,Q.set(J,$);return $}_getShaderStage(J){let Q=this.shaderCache,$=Q.get(J);if($===void 0)$=new aH(J),Q.set(J,$);return $}}class aH{constructor(J){this.id=JE++,this.code=J,this.usedTimes=0}}function QE(J){return J===O8||J===P6||J===I6}function $E(J,Q,$,Z,W,H){let K=new j6,Y=new oH,X=new Set,U=[],G=new Map,q=Z.logarithmicDepthBuffer,E=Z.precision,F={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function k(L){if(X.add(L),L===0)return"uv";return`uv${L}`}function B(L,z,g,A,m,a){let p=A.fog,n=m.geometry,u=L.isMeshStandardMaterial||L.isMeshLambertMaterial||L.isMeshPhongMaterial?A.environment:null,h=L.isMeshStandardMaterial||L.isMeshLambertMaterial&&!L.envMap||L.isMeshPhongMaterial&&!L.envMap,o=Q.get(L.envMap||u,h),r=!!o&&o.mapping===z7?o.image.height:null,W0=F[L.type];if(L.precision!==null){if(E=Z.getMaxPrecision(L.precision),E!==L.precision)M0("WebGLProgram.getParameters:",L.precision,"not supported, using",E,"instead.")}let L0=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,E0=L0!==void 0?L0.length:0,ZJ=0;if(n.morphAttributes.position!==void 0)ZJ=1;if(n.morphAttributes.normal!==void 0)ZJ=2;if(n.morphAttributes.color!==void 0)ZJ=3;let e0,i,Z0,O0;if(W0){let S0=M9[W0];e0=S0.vertexShader,i=S0.fragmentShader}else{e0=L.vertexShader,i=L.fragmentShader;let S0=Y.getVertexShaderStage(L),GJ=Y.getFragmentShaderStage(L);Y.update(L,S0,GJ),Z0=S0.id,O0=GJ.id}let R0=J.getRenderTarget(),w0=J.state.buffers.depth.getReversed(),d0=m.isInstancedMesh===!0,g0=m.isBatchedMesh===!0,l0=!!L.map,WJ=!!L.matcap,u0=!!o,m0=!!L.aoMap,BJ=!!L.lightMap,cJ=!!L.bumpMap&&L.wireframe===!1,XJ=!!L.normalMap,PJ=!!L.displacementMap,zJ=!!L.emissiveMap,kJ=!!L.metalnessMap,j=!!L.roughnessMap,nJ=L.anisotropy>0,i0=L.clearcoat>0,UJ=L.dispersion>0,M=L.iridescence>0,R=L.sheen>0,T=L.transmission>0,l=nJ&&!!L.anisotropyMap,e=i0&&!!L.clearcoatMap,J0=i0&&!!L.clearcoatNormalMap,Y0=i0&&!!L.clearcoatRoughnessMap,d=M&&!!L.iridescenceMap,s=M&&!!L.iridescenceThicknessMap,N0=R&&!!L.sheenColorMap,B0=R&&!!L.sheenRoughnessMap,X0=!!L.specularMap,Q0=!!L.specularColorMap,C0=!!L.specularIntensityMap,P0=T&&!!L.transmissionMap,n0=T&&!!L.thicknessMap,S=!!L.gradientMap,$0=!!L.alphaMap,c=L.alphaTest>0,H0=!!L.alphaHash,F0=!!L.extensions,t=K9;if(L.toneMapped){if(R0===null||R0.isXRRenderTarget===!0)t=J.toneMapping}let K0={shaderID:W0,shaderType:L.type,shaderName:L.name,vertexShader:e0,fragmentShader:i,defines:L.defines,customVertexShaderID:Z0,customFragmentShaderID:O0,isRawShaderMaterial:L.isRawShaderMaterial===!0,glslVersion:L.glslVersion,precision:E,batching:g0,batchingColor:g0&&m._colorsTexture!==null,instancing:d0,instancingColor:d0&&m.instanceColor!==null,instancingMorph:d0&&m.morphTexture!==null,outputColorSpace:R0===null?J.outputColorSpace:R0.isXRRenderTarget===!0?R0.texture.colorSpace:b0.workingColorSpace,alphaToCoverage:!!L.alphaToCoverage,map:l0,matcap:WJ,envMap:u0,envMapMode:u0&&o.mapping,envMapCubeUVHeight:r,aoMap:m0,lightMap:BJ,bumpMap:cJ,normalMap:XJ,displacementMap:PJ,emissiveMap:zJ,normalMapObjectSpace:XJ&&L.normalMapType===eW,normalMapTangentSpace:XJ&&L.normalMapType===I$,packedNormalMap:XJ&&L.normalMapType===I$&&QE(L.normalMap.format),metalnessMap:kJ,roughnessMap:j,anisotropy:nJ,anisotropyMap:l,clearcoat:i0,clearcoatMap:e,clearcoatNormalMap:J0,clearcoatRoughnessMap:Y0,dispersion:UJ,iridescence:M,iridescenceMap:d,iridescenceThicknessMap:s,sheen:R,sheenColorMap:N0,sheenRoughnessMap:B0,specularMap:X0,specularColorMap:Q0,specularIntensityMap:C0,transmission:T,transmissionMap:P0,thicknessMap:n0,gradientMap:S,opaque:L.transparent===!1&&L.blending===M7&&L.alphaToCoverage===!1,alphaMap:$0,alphaTest:c,alphaHash:H0,combine:L.combine,mapUv:l0&&k(L.map.channel),aoMapUv:m0&&k(L.aoMap.channel),lightMapUv:BJ&&k(L.lightMap.channel),bumpMapUv:cJ&&k(L.bumpMap.channel),normalMapUv:XJ&&k(L.normalMap.channel),displacementMapUv:PJ&&k(L.displacementMap.channel),emissiveMapUv:zJ&&k(L.emissiveMap.channel),metalnessMapUv:kJ&&k(L.metalnessMap.channel),roughnessMapUv:j&&k(L.roughnessMap.channel),anisotropyMapUv:l&&k(L.anisotropyMap.channel),clearcoatMapUv:e&&k(L.clearcoatMap.channel),clearcoatNormalMapUv:J0&&k(L.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Y0&&k(L.clearcoatRoughnessMap.channel),iridescenceMapUv:d&&k(L.iridescenceMap.channel),iridescenceThicknessMapUv:s&&k(L.iridescenceThicknessMap.channel),sheenColorMapUv:N0&&k(L.sheenColorMap.channel),sheenRoughnessMapUv:B0&&k(L.sheenRoughnessMap.channel),specularMapUv:X0&&k(L.specularMap.channel),specularColorMapUv:Q0&&k(L.specularColorMap.channel),specularIntensityMapUv:C0&&k(L.specularIntensityMap.channel),transmissionMapUv:P0&&k(L.transmissionMap.channel),thicknessMapUv:n0&&k(L.thicknessMap.channel),alphaMapUv:$0&&k(L.alphaMap.channel),vertexTangents:!!n.attributes.tangent&&(XJ||nJ),vertexNormals:!!n.attributes.normal,vertexColors:L.vertexColors,vertexAlphas:L.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,pointsUvs:m.isPoints===!0&&!!n.attributes.uv&&(l0||$0),fog:!!p,useFog:L.fog===!0,fogExp2:!!p&&p.isFogExp2,flatShading:L.wireframe===!1&&(L.flatShading===!0||n.attributes.normal===void 0&&XJ===!1&&(L.isMeshLambertMaterial||L.isMeshPhongMaterial||L.isMeshStandardMaterial||L.isMeshPhysicalMaterial)),sizeAttenuation:L.sizeAttenuation===!0,logarithmicDepthBuffer:q,reversedDepthBuffer:w0,skinning:m.isSkinnedMesh===!0,hasPositionAttribute:n.attributes.position!==void 0,morphTargets:n.morphAttributes.position!==void 0,morphNormals:n.morphAttributes.normal!==void 0,morphColors:n.morphAttributes.color!==void 0,morphTargetsCount:E0,morphTextureStride:ZJ,numDirLights:z.directional.length,numPointLights:z.point.length,numSpotLights:z.spot.length,numSpotLightMaps:z.spotLightMap.length,numRectAreaLights:z.rectArea.length,numHemiLights:z.hemi.length,numDirLightShadows:z.directionalShadowMap.length,numPointLightShadows:z.pointShadowMap.length,numSpotLightShadows:z.spotShadowMap.length,numSpotLightShadowsWithMaps:z.numSpotLightShadowsWithMaps,numLightProbes:z.numLightProbes,numLightProbeGrids:a.length,numClippingPlanes:H.numPlanes,numClipIntersection:H.numIntersection,dithering:L.dithering,shadowMapEnabled:J.shadowMap.enabled&&g.length>0,shadowMapType:J.shadowMap.type,toneMapping:t,decodeVideoTexture:l0&&L.map.isVideoTexture===!0&&b0.getTransfer(L.map.colorSpace)===$J,decodeVideoTextureEmissive:zJ&&L.emissiveMap.isVideoTexture===!0&&b0.getTransfer(L.emissiveMap.colorSpace)===$J,premultipliedAlpha:L.premultipliedAlpha,doubleSided:L.side===aJ,flipSided:L.side===TJ,useDepthPacking:L.depthPacking>=0,depthPacking:L.depthPacking||0,index0AttributeName:L.index0AttributeName,extensionClipCullDistance:F0&&L.extensions.clipCullDistance===!0&&$.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(F0&&L.extensions.multiDraw===!0||g0)&&$.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:$.has("KHR_parallel_shader_compile"),customProgramCacheKey:L.customProgramCacheKey()};return K0.vertexUv1s=X.has(1),K0.vertexUv2s=X.has(2),K0.vertexUv3s=X.has(3),X.clear(),K0}function O(L){let z=[];if(L.shaderID)z.push(L.shaderID);else z.push(L.customVertexShaderID),z.push(L.customFragmentShaderID);if(L.defines!==void 0)for(let g in L.defines)z.push(g),z.push(L.defines[g]);if(L.isRawShaderMaterial===!1)N(z,L),_(z,L),z.push(J.outputColorSpace);return z.push(L.customProgramCacheKey),z.join()}function N(L,z){L.push(z.precision),L.push(z.outputColorSpace),L.push(z.envMapMode),L.push(z.envMapCubeUVHeight),L.push(z.mapUv),L.push(z.alphaMapUv),L.push(z.lightMapUv),L.push(z.aoMapUv),L.push(z.bumpMapUv),L.push(z.normalMapUv),L.push(z.displacementMapUv),L.push(z.emissiveMapUv),L.push(z.metalnessMapUv),L.push(z.roughnessMapUv),L.push(z.anisotropyMapUv),L.push(z.clearcoatMapUv),L.push(z.clearcoatNormalMapUv),L.push(z.clearcoatRoughnessMapUv),L.push(z.iridescenceMapUv),L.push(z.iridescenceThicknessMapUv),L.push(z.sheenColorMapUv),L.push(z.sheenRoughnessMapUv),L.push(z.specularMapUv),L.push(z.specularColorMapUv),L.push(z.specularIntensityMapUv),L.push(z.transmissionMapUv),L.push(z.thicknessMapUv),L.push(z.combine),L.push(z.fogExp2),L.push(z.sizeAttenuation),L.push(z.morphTargetsCount),L.push(z.morphAttributeCount),L.push(z.numDirLights),L.push(z.numPointLights),L.push(z.numSpotLights),L.push(z.numSpotLightMaps),L.push(z.numHemiLights),L.push(z.numRectAreaLights),L.push(z.numDirLightShadows),L.push(z.numPointLightShadows),L.push(z.numSpotLightShadows),L.push(z.numSpotLightShadowsWithMaps),L.push(z.numLightProbes),L.push(z.shadowMapType),L.push(z.toneMapping),L.push(z.numClippingPlanes),L.push(z.numClipIntersection),L.push(z.depthPacking)}function _(L,z){if(K.disableAll(),z.instancing)K.enable(0);if(z.instancingColor)K.enable(1);if(z.instancingMorph)K.enable(2);if(z.matcap)K.enable(3);if(z.envMap)K.enable(4);if(z.normalMapObjectSpace)K.enable(5);if(z.normalMapTangentSpace)K.enable(6);if(z.clearcoat)K.enable(7);if(z.iridescence)K.enable(8);if(z.alphaTest)K.enable(9);if(z.vertexColors)K.enable(10);if(z.vertexAlphas)K.enable(11);if(z.vertexUv1s)K.enable(12);if(z.vertexUv2s)K.enable(13);if(z.vertexUv3s)K.enable(14);if(z.vertexTangents)K.enable(15);if(z.anisotropy)K.enable(16);if(z.alphaHash)K.enable(17);if(z.batching)K.enable(18);if(z.dispersion)K.enable(19);if(z.batchingColor)K.enable(20);if(z.gradientMap)K.enable(21);if(z.packedNormalMap)K.enable(22);if(z.vertexNormals)K.enable(23);if(L.push(K.mask),K.disableAll(),z.fog)K.enable(0);if(z.useFog)K.enable(1);if(z.flatShading)K.enable(2);if(z.logarithmicDepthBuffer)K.enable(3);if(z.reversedDepthBuffer)K.enable(4);if(z.skinning)K.enable(5);if(z.morphTargets)K.enable(6);if(z.morphNormals)K.enable(7);if(z.morphColors)K.enable(8);if(z.premultipliedAlpha)K.enable(9);if(z.shadowMapEnabled)K.enable(10);if(z.doubleSided)K.enable(11);if(z.flipSided)K.enable(12);if(z.useDepthPacking)K.enable(13);if(z.dithering)K.enable(14);if(z.transmission)K.enable(15);if(z.sheen)K.enable(16);if(z.opaque)K.enable(17);if(z.pointsUvs)K.enable(18);if(z.decodeVideoTexture)K.enable(19);if(z.decodeVideoTextureEmissive)K.enable(20);if(z.alphaToCoverage)K.enable(21);if(z.numLightProbeGrids>0)K.enable(22);if(z.hasPositionAttribute)K.enable(23);L.push(K.mask)}function C(L){let z=F[L.type],g;if(z){let A=M9[z];g=EH.clone(A.uniforms)}else g=L.uniforms;return g}function D(L,z){let g=G.get(z);if(g!==void 0)++g.usedTimes;else g=new e5(J,z,L,W),U.push(g),G.set(z,g);return g}function P(L){if(--L.usedTimes===0){let z=U.indexOf(L);U[z]=U[U.length-1],U.pop(),G.delete(L.cacheKey),L.destroy()}}function I(L){Y.remove(L)}function w(){Y.dispose()}return{getParameters:B,getProgramCacheKey:O,getUniforms:C,acquireProgram:D,releaseProgram:P,releaseShaderCache:I,programs:U,dispose:w}}function ZE(){let J=new WeakMap;function Q(K){return J.has(K)}function $(K){let Y=J.get(K);if(Y===void 0)Y={},J.set(K,Y);return Y}function Z(K){J.delete(K)}function W(K,Y,X){J.get(K)[Y]=X}function H(){J=new WeakMap}return{has:Q,get:$,remove:Z,update:W,dispose:H}}function WE(J,Q){if(J.groupOrder!==Q.groupOrder)return J.groupOrder-Q.groupOrder;else if(J.renderOrder!==Q.renderOrder)return J.renderOrder-Q.renderOrder;else if(J.material.id!==Q.material.id)return J.material.id-Q.material.id;else if(J.materialVariant!==Q.materialVariant)return J.materialVariant-Q.materialVariant;else if(J.z!==Q.z)return J.z-Q.z;else return J.id-Q.id}function fH(J,Q){if(J.groupOrder!==Q.groupOrder)return J.groupOrder-Q.groupOrder;else if(J.renderOrder!==Q.renderOrder)return J.renderOrder-Q.renderOrder;else if(J.z!==Q.z)return Q.z-J.z;else return J.id-Q.id}function bH(){let J=[],Q=0,$=[],Z=[],W=[];function H(){Q=0,$.length=0,Z.length=0,W.length=0}function K(E){let F=0;if(E.isInstancedMesh)F+=2;if(E.isSkinnedMesh)F+=1;return F}function Y(E,F,k,B,O,N){let _=J[Q];if(_===void 0)_={id:E.id,object:E,geometry:F,material:k,materialVariant:K(E),groupOrder:B,renderOrder:E.renderOrder,z:O,group:N},J[Q]=_;else _.id=E.id,_.object=E,_.geometry=F,_.material=k,_.materialVariant=K(E),_.groupOrder=B,_.renderOrder=E.renderOrder,_.z=O,_.group=N;return Q++,_}function X(E,F,k,B,O,N){let _=Y(E,F,k,B,O,N);if(k.transmission>0)Z.push(_);else if(k.transparent===!0)W.push(_);else $.push(_)}function U(E,F,k,B,O,N){let _=Y(E,F,k,B,O,N);if(k.transmission>0)Z.unshift(_);else if(k.transparent===!0)W.unshift(_);else $.unshift(_)}function G(E,F,k){if($.length>1)$.sort(E||WE);if(Z.length>1)Z.sort(F||fH);if(W.length>1)W.sort(F||fH);if(k)$.reverse(),Z.reverse(),W.reverse()}function q(){for(let E=Q,F=J.length;E<F;E++){let k=J[E];if(k.id===null)break;k.id=null,k.object=null,k.geometry=null,k.material=null,k.group=null}}return{opaque:$,transmissive:Z,transparent:W,init:H,push:X,unshift:U,finish:q,sort:G}}function HE(){let J=new WeakMap;function Q(Z,W){let H=J.get(Z),K;if(H===void 0)K=new bH,J.set(Z,[K]);else if(W>=H.length)K=new bH,H.push(K);else K=H[W];return K}function $(){J=new WeakMap}return{get:Q,dispose:$}}function KE(){let J={};return{get:function(Q){if(J[Q.id]!==void 0)return J[Q.id];let $;switch(Q.type){case"DirectionalLight":$={direction:new y,color:new I0};break;case"SpotLight":$={position:new y,direction:new y,color:new I0,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":$={position:new y,color:new I0,distance:0,decay:0};break;case"HemisphereLight":$={direction:new y,skyColor:new I0,groundColor:new I0};break;case"RectAreaLight":$={color:new I0,position:new y,halfWidth:new y,halfHeight:new y};break}return J[Q.id]=$,$}}}function YE(){let J={};return{get:function(Q){if(J[Q.id]!==void 0)return J[Q.id];let $;switch(Q.type){case"DirectionalLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new y0};break;case"SpotLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new y0};break;case"PointLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new y0,shadowCameraNear:1,shadowCameraFar:1000};break}return J[Q.id]=$,$}}}var XE=0;function UE(J,Q){return(Q.castShadow?2:0)-(J.castShadow?2:0)+(Q.map?1:0)-(J.map?1:0)}function GE(J){let Q=new KE,$=YE(),Z={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let U=0;U<9;U++)Z.probe.push(new y);let W=new y,H=new j0,K=new j0;function Y(U){let G=0,q=0,E=0;for(let z=0;z<9;z++)Z.probe[z].set(0,0,0);let F=0,k=0,B=0,O=0,N=0,_=0,C=0,D=0,P=0,I=0,w=0;U.sort(UE);for(let z=0,g=U.length;z<g;z++){let A=U[z],m=A.color,a=A.intensity,p=A.distance,n=null;if(A.shadow&&A.shadow.map)if(A.shadow.map.texture.format===O8)n=A.shadow.map.texture;else n=A.shadow.map.depthTexture||A.shadow.map.texture;if(A.isAmbientLight)G+=m.r*a,q+=m.g*a,E+=m.b*a;else if(A.isLightProbe){for(let u=0;u<9;u++)Z.probe[u].addScaledVector(A.sh.coefficients[u],a);w++}else if(A.isDirectionalLight){let u=Q.get(A);if(u.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){let h=A.shadow,o=$.get(A);o.shadowIntensity=h.intensity,o.shadowBias=h.bias,o.shadowNormalBias=h.normalBias,o.shadowRadius=h.radius,o.shadowMapSize=h.mapSize,Z.directionalShadow[F]=o,Z.directionalShadowMap[F]=n,Z.directionalShadowMatrix[F]=A.shadow.matrix,_++}Z.directional[F]=u,F++}else if(A.isSpotLight){let u=Q.get(A);u.position.setFromMatrixPosition(A.matrixWorld),u.color.copy(m).multiplyScalar(a),u.distance=p,u.coneCos=Math.cos(A.angle),u.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),u.decay=A.decay,Z.spot[B]=u;let h=A.shadow;if(A.map){if(Z.spotLightMap[P]=A.map,P++,h.updateMatrices(A),A.castShadow)I++}if(Z.spotLightMatrix[B]=h.matrix,A.castShadow){let o=$.get(A);o.shadowIntensity=h.intensity,o.shadowBias=h.bias,o.shadowNormalBias=h.normalBias,o.shadowRadius=h.radius,o.shadowMapSize=h.mapSize,Z.spotShadow[B]=o,Z.spotShadowMap[B]=n,D++}B++}else if(A.isRectAreaLight){let u=Q.get(A);u.color.copy(m).multiplyScalar(a),u.halfWidth.set(A.width*0.5,0,0),u.halfHeight.set(0,A.height*0.5,0),Z.rectArea[O]=u,O++}else if(A.isPointLight){let u=Q.get(A);if(u.color.copy(A.color).multiplyScalar(A.intensity),u.distance=A.distance,u.decay=A.decay,A.castShadow){let h=A.shadow,o=$.get(A);o.shadowIntensity=h.intensity,o.shadowBias=h.bias,o.shadowNormalBias=h.normalBias,o.shadowRadius=h.radius,o.shadowMapSize=h.mapSize,o.shadowCameraNear=h.camera.near,o.shadowCameraFar=h.camera.far,Z.pointShadow[k]=o,Z.pointShadowMap[k]=n,Z.pointShadowMatrix[k]=A.shadow.matrix,C++}Z.point[k]=u,k++}else if(A.isHemisphereLight){let u=Q.get(A);u.skyColor.copy(A.color).multiplyScalar(a),u.groundColor.copy(A.groundColor).multiplyScalar(a),Z.hemi[N]=u,N++}}if(O>0)if(J.has("OES_texture_float_linear")===!0)Z.rectAreaLTC1=U0.LTC_FLOAT_1,Z.rectAreaLTC2=U0.LTC_FLOAT_2;else Z.rectAreaLTC1=U0.LTC_HALF_1,Z.rectAreaLTC2=U0.LTC_HALF_2;Z.ambient[0]=G,Z.ambient[1]=q,Z.ambient[2]=E;let L=Z.hash;if(L.directionalLength!==F||L.pointLength!==k||L.spotLength!==B||L.rectAreaLength!==O||L.hemiLength!==N||L.numDirectionalShadows!==_||L.numPointShadows!==C||L.numSpotShadows!==D||L.numSpotMaps!==P||L.numLightProbes!==w)Z.directional.length=F,Z.spot.length=B,Z.rectArea.length=O,Z.point.length=k,Z.hemi.length=N,Z.directionalShadow.length=_,Z.directionalShadowMap.length=_,Z.pointShadow.length=C,Z.pointShadowMap.length=C,Z.spotShadow.length=D,Z.spotShadowMap.length=D,Z.directionalShadowMatrix.length=_,Z.pointShadowMatrix.length=C,Z.spotLightMatrix.length=D+P-I,Z.spotLightMap.length=P,Z.numSpotLightShadowsWithMaps=I,Z.numLightProbes=w,L.directionalLength=F,L.pointLength=k,L.spotLength=B,L.rectAreaLength=O,L.hemiLength=N,L.numDirectionalShadows=_,L.numPointShadows=C,L.numSpotShadows=D,L.numSpotMaps=P,L.numLightProbes=w,Z.version=XE++}function X(U,G){let q=0,E=0,F=0,k=0,B=0,O=G.matrixWorldInverse;for(let N=0,_=U.length;N<_;N++){let C=U[N];if(C.isDirectionalLight){let D=Z.directional[q];D.direction.setFromMatrixPosition(C.matrixWorld),W.setFromMatrixPosition(C.target.matrixWorld),D.direction.sub(W),D.direction.transformDirection(O),q++}else if(C.isSpotLight){let D=Z.spot[F];D.position.setFromMatrixPosition(C.matrixWorld),D.position.applyMatrix4(O),D.direction.setFromMatrixPosition(C.matrixWorld),W.setFromMatrixPosition(C.target.matrixWorld),D.direction.sub(W),D.direction.transformDirection(O),F++}else if(C.isRectAreaLight){let D=Z.rectArea[k];D.position.setFromMatrixPosition(C.matrixWorld),D.position.applyMatrix4(O),K.identity(),H.copy(C.matrixWorld),H.premultiply(O),K.extractRotation(H),D.halfWidth.set(C.width*0.5,0,0),D.halfHeight.set(0,C.height*0.5,0),D.halfWidth.applyMatrix4(K),D.halfHeight.applyMatrix4(K),k++}else if(C.isPointLight){let D=Z.point[E];D.position.setFromMatrixPosition(C.matrixWorld),D.position.applyMatrix4(O),E++}else if(C.isHemisphereLight){let D=Z.hemi[B];D.direction.setFromMatrixPosition(C.matrixWorld),D.direction.transformDirection(O),B++}}}return{setup:Y,setupView:X,state:Z}}function xH(J){let Q=new GE(J),$=[],Z=[],W=[];function H(E){q.camera=E,$.length=0,Z.length=0,W.length=0}function K(E){$.push(E)}function Y(E){Z.push(E)}function X(E){W.push(E)}function U(){Q.setup($)}function G(E){Q.setupView($,E)}let q={lightsArray:$,shadowsArray:Z,lightProbeGridArray:W,camera:null,lights:Q,transmissionRenderTarget:{},textureUnits:0};return{init:H,state:q,setupLights:U,setupLightsView:G,pushLight:K,pushShadow:Y,pushLightProbeGrid:X}}function EE(J){let Q=new WeakMap;function $(W,H=0){let K=Q.get(W),Y;if(K===void 0)Y=new xH(J),Q.set(W,[Y]);else if(H>=K.length)Y=new xH(J),K.push(Y);else Y=K[H];return Y}function Z(){Q=new WeakMap}return{get:$,dispose:Z}}var qE=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,NE=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,FE=[new y(1,0,0),new y(-1,0,0),new y(0,1,0),new y(0,-1,0),new y(0,0,1),new y(0,0,-1)],OE=[new y(0,-1,0),new y(0,-1,0),new y(0,0,1),new y(0,0,-1),new y(0,-1,0),new y(0,-1,0)],gH=new j0,b7=new y,KZ=new y;function RE(J,Q,$){let Z=new j7,W=new y0,H=new y0,K=new a0,Y=new g$,X=new p$,U={},G=$.maxTextureSize,q={[n9]:TJ,[TJ]:n9,[aJ]:aJ},E=new eJ({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new y0},radius:{value:4}},vertexShader:qE,fragmentShader:NE}),F=E.clone();F.defines.HORIZONTAL_PASS=1;let k=new yJ;k.setAttribute("position",new DJ(new Float32Array([-1,-1,0.5,3,-1,0.5,-1,3,0.5]),3));let B=new YJ(k,E),O=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=V7;let N=this.type;this.render=function(I,w,L){if(O.enabled===!1)return;if(O.autoUpdate===!1&&O.needsUpdate===!1)return;if(I.length===0)return;if(this.type===OW)M0("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=V7;let z=J.getRenderTarget(),g=J.getActiveCubeFace(),A=J.getActiveMipmapLevel(),m=J.state;if(m.setBlending(O9),m.buffers.depth.getReversed()===!0)m.buffers.color.setClear(0,0,0,0);else m.buffers.color.setClear(1,1,1,1);m.buffers.depth.setTest(!0),m.setScissorTest(!1);let a=N!==this.type;if(a)w.traverse(function(p){if(p.material)if(Array.isArray(p.material))p.material.forEach((n)=>n.needsUpdate=!0);else p.material.needsUpdate=!0});for(let p=0,n=I.length;p<n;p++){let u=I[p],h=u.shadow;if(h===void 0){M0("WebGLShadowMap:",u,"has no shadow.");continue}if(h.autoUpdate===!1&&h.needsUpdate===!1)continue;W.copy(h.mapSize);let o=h.getFrameExtents();if(W.multiply(o),H.copy(h.mapSize),W.x>G||W.y>G){if(W.x>G)H.x=Math.floor(G/o.x),W.x=H.x*o.x,h.mapSize.x=H.x;if(W.y>G)H.y=Math.floor(G/o.y),W.y=H.y*o.y,h.mapSize.y=H.y}let r=J.state.buffers.depth.getReversed();if(h.camera._reversedDepth=r,h.map===null||a===!0){if(h.map!==null){if(h.map.depthTexture!==null)h.map.depthTexture.dispose(),h.map.depthTexture=null;h.map.dispose()}if(this.type===u8){if(u.isPointLight){M0("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}h.map=new rJ(W.x,W.y,{format:O8,type:v9,minFilter:CJ,magFilter:CJ,generateMipmaps:!1}),h.map.texture.name=u.name+".shadowMap",h.map.depthTexture=new i9(W.x,W.y,j9),h.map.depthTexture.name=u.name+".shadowMapDepth",h.map.depthTexture.format=N8,h.map.depthTexture.compareFunction=null,h.map.depthTexture.minFilter=Y9,h.map.depthTexture.magFilter=Y9}else{if(u.isPointLight)h.map=new UZ(W.x),h.map.depthTexture=new f$(W.x,s9);else h.map=new rJ(W.x,W.y),h.map.depthTexture=new i9(W.x,W.y,s9);if(h.map.depthTexture.name=u.name+".shadowMap",h.map.depthTexture.format=N8,this.type===V7)h.map.depthTexture.compareFunction=r?T6:A6,h.map.depthTexture.minFilter=CJ,h.map.depthTexture.magFilter=CJ;else h.map.depthTexture.compareFunction=null,h.map.depthTexture.minFilter=Y9,h.map.depthTexture.magFilter=Y9}h.camera.updateProjectionMatrix()}let W0=h.map.isWebGLCubeRenderTarget?6:1;for(let L0=0;L0<W0;L0++){if(h.map.isWebGLCubeRenderTarget)J.setRenderTarget(h.map,L0),J.clear();else{if(L0===0)J.setRenderTarget(h.map),J.clear();let E0=h.getViewport(L0);K.set(H.x*E0.x,H.y*E0.y,H.x*E0.z,H.y*E0.w),m.viewport(K)}if(u.isPointLight){let{camera:E0,matrix:ZJ}=h,e0=u.distance||E0.far;if(e0!==E0.far)E0.far=e0,E0.updateProjectionMatrix();b7.setFromMatrixPosition(u.matrixWorld),E0.position.copy(b7),KZ.copy(E0.position),KZ.add(FE[L0]),E0.up.copy(OE[L0]),E0.lookAt(KZ),E0.updateMatrixWorld(),ZJ.makeTranslation(-b7.x,-b7.y,-b7.z),gH.multiplyMatrices(E0.projectionMatrix,E0.matrixWorldInverse),h._frustum.setFromProjectionMatrix(gH,E0.coordinateSystem,E0.reversedDepth)}else h.updateMatrices(u);Z=h.getFrustum(),D(w,L,h.camera,u,this.type)}if(h.isPointLightShadow!==!0&&this.type===u8)_(h,L);h.needsUpdate=!1}N=this.type,O.needsUpdate=!1,J.setRenderTarget(z,g,A)};function _(I,w){let L=Q.update(B);if(E.defines.VSM_SAMPLES!==I.blurSamples)E.defines.VSM_SAMPLES=I.blurSamples,F.defines.VSM_SAMPLES=I.blurSamples,E.needsUpdate=!0,F.needsUpdate=!0;if(I.mapPass===null)I.mapPass=new rJ(W.x,W.y,{format:O8,type:v9});E.uniforms.shadow_pass.value=I.map.depthTexture,E.uniforms.resolution.value=I.mapSize,E.uniforms.radius.value=I.radius,J.setRenderTarget(I.mapPass),J.clear(),J.renderBufferDirect(w,null,L,E,B,null),F.uniforms.shadow_pass.value=I.mapPass.texture,F.uniforms.resolution.value=I.mapSize,F.uniforms.radius.value=I.radius,J.setRenderTarget(I.map),J.clear(),J.renderBufferDirect(w,null,L,F,B,null)}function C(I,w,L,z){let g=null,A=L.isPointLight===!0?I.customDistanceMaterial:I.customDepthMaterial;if(A!==void 0)g=A;else if(g=L.isPointLight===!0?X:Y,J.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){let m=g.uuid,a=w.uuid,p=U[m];if(p===void 0)p={},U[m]=p;let n=p[a];if(n===void 0)n=g.clone(),p[a]=n,w.addEventListener("dispose",P);g=n}if(g.visible=w.visible,g.wireframe=w.wireframe,z===u8)g.side=w.shadowSide!==null?w.shadowSide:w.side;else g.side=w.shadowSide!==null?w.shadowSide:q[w.side];if(g.alphaMap=w.alphaMap,g.alphaTest=w.alphaToCoverage===!0?0.5:w.alphaTest,g.map=w.map,g.clipShadows=w.clipShadows,g.clippingPlanes=w.clippingPlanes,g.clipIntersection=w.clipIntersection,g.displacementMap=w.displacementMap,g.displacementScale=w.displacementScale,g.displacementBias=w.displacementBias,g.wireframeLinewidth=w.wireframeLinewidth,g.linewidth=w.linewidth,L.isPointLight===!0&&g.isMeshDistanceMaterial===!0){let m=J.properties.get(g);m.light=L}return g}function D(I,w,L,z,g){if(I.visible===!1)return;if(I.layers.test(w.layers)&&(I.isMesh||I.isLine||I.isPoints)){if((I.castShadow||I.receiveShadow&&g===u8)&&(!I.frustumCulled||Z.intersectsObject(I))){I.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,I.matrixWorld);let a=Q.update(I),p=I.material;if(Array.isArray(p)){let n=a.groups;for(let u=0,h=n.length;u<h;u++){let o=n[u],r=p[o.materialIndex];if(r&&r.visible){let W0=C(I,r,z,g);I.onBeforeShadow(J,I,w,L,a,W0,o),J.renderBufferDirect(L,null,a,W0,I,o),I.onAfterShadow(J,I,w,L,a,W0,o)}}}else if(p.visible){let n=C(I,p,z,g);I.onBeforeShadow(J,I,w,L,a,n,null),J.renderBufferDirect(L,null,a,n,I,null),I.onAfterShadow(J,I,w,L,a,n,null)}}}let m=I.children;for(let a=0,p=m.length;a<p;a++)D(m[a],w,L,z,g)}function P(I){I.target.removeEventListener("dispose",P);for(let L in U){let z=U[L],g=I.target.uuid;if(g in z)z[g].dispose(),delete z[g]}}}function kE(J,Q){function $(){let S=!1,$0=new a0,c=null,H0=new a0(0,0,0,0);return{setMask:function(F0){if(c!==F0&&!S)J.colorMask(F0,F0,F0,F0),c=F0},setLocked:function(F0){S=F0},setClear:function(F0,t,K0,S0,GJ){if(GJ===!0)F0*=S0,t*=S0,K0*=S0;if($0.set(F0,t,K0,S0),H0.equals($0)===!1)J.clearColor(F0,t,K0,S0),H0.copy($0)},reset:function(){S=!1,c=null,H0.set(-1,0,0,0)}}}function Z(){let S=!1,$0=!1,c=null,H0=null,F0=null;return{setReversed:function(t){if($0!==t){let K0=Q.get("EXT_clip_control");if(t)K0.clipControlEXT(K0.LOWER_LEFT_EXT,K0.ZERO_TO_ONE_EXT);else K0.clipControlEXT(K0.LOWER_LEFT_EXT,K0.NEGATIVE_ONE_TO_ONE_EXT);$0=t;let S0=F0;F0=null,this.setClear(S0)}},getReversed:function(){return $0},setTest:function(t){if(t)R0(J.DEPTH_TEST);else w0(J.DEPTH_TEST)},setMask:function(t){if(c!==t&&!S)J.depthMask(t),c=t},setFunc:function(t){if($0)t=UH[t];if(H0!==t){switch(t){case fW:J.depthFunc(J.NEVER);break;case bW:J.depthFunc(J.ALWAYS);break;case xW:J.depthFunc(J.LESS);break;case hQ:J.depthFunc(J.LEQUAL);break;case gW:J.depthFunc(J.EQUAL);break;case pW:J.depthFunc(J.GEQUAL);break;case lW:J.depthFunc(J.GREATER);break;case mW:J.depthFunc(J.NOTEQUAL);break;default:J.depthFunc(J.LEQUAL)}H0=t}},setLocked:function(t){S=t},setClear:function(t){if(F0!==t){if(F0=t,$0)t=1-t;J.clearDepth(t)}},reset:function(){S=!1,c=null,H0=null,F0=null,$0=!1}}}function W(){let S=!1,$0=null,c=null,H0=null,F0=null,t=null,K0=null,S0=null,GJ=null;return{setTest:function(HJ){if(!S)if(HJ)R0(J.STENCIL_TEST);else w0(J.STENCIL_TEST)},setMask:function(HJ){if($0!==HJ&&!S)J.stencilMask(HJ),$0=HJ},setFunc:function(HJ,U9,z9){if(c!==HJ||H0!==U9||F0!==z9)J.stencilFunc(HJ,U9,z9),c=HJ,H0=U9,F0=z9},setOp:function(HJ,U9,z9){if(t!==HJ||K0!==U9||S0!==z9)J.stencilOp(HJ,U9,z9),t=HJ,K0=U9,S0=z9},setLocked:function(HJ){S=HJ},setClear:function(HJ){if(GJ!==HJ)J.clearStencil(HJ),GJ=HJ},reset:function(){S=!1,$0=null,c=null,H0=null,F0=null,t=null,K0=null,S0=null,GJ=null}}}let H=new $,K=new Z,Y=new W,X=new WeakMap,U=new WeakMap,G={},q={},E={},F=new WeakMap,k=[],B=null,O=!1,N=null,_=null,C=null,D=null,P=null,I=null,w=null,L=new I0(0,0,0),z=0,g=!1,A=null,m=null,a=null,p=null,n=null,u=J.getParameter(J.MAX_COMBINED_TEXTURE_IMAGE_UNITS),h=!1,o=0,r=J.getParameter(J.VERSION);if(r.indexOf("WebGL")!==-1)o=parseFloat(/^WebGL (\d)/.exec(r)[1]),h=o>=1;else if(r.indexOf("OpenGL ES")!==-1)o=parseFloat(/^OpenGL ES (\d)/.exec(r)[1]),h=o>=2;let W0=null,L0={},E0=J.getParameter(J.SCISSOR_BOX),ZJ=J.getParameter(J.VIEWPORT),e0=new a0().fromArray(E0),i=new a0().fromArray(ZJ);function Z0(S,$0,c,H0){let F0=new Uint8Array(4),t=J.createTexture();J.bindTexture(S,t),J.texParameteri(S,J.TEXTURE_MIN_FILTER,J.NEAREST),J.texParameteri(S,J.TEXTURE_MAG_FILTER,J.NEAREST);for(let K0=0;K0<c;K0++)if(S===J.TEXTURE_3D||S===J.TEXTURE_2D_ARRAY)J.texImage3D($0,0,J.RGBA,1,1,H0,0,J.RGBA,J.UNSIGNED_BYTE,F0);else J.texImage2D($0+K0,0,J.RGBA,1,1,0,J.RGBA,J.UNSIGNED_BYTE,F0);return t}let O0={};O0[J.TEXTURE_2D]=Z0(J.TEXTURE_2D,J.TEXTURE_2D,1),O0[J.TEXTURE_CUBE_MAP]=Z0(J.TEXTURE_CUBE_MAP,J.TEXTURE_CUBE_MAP_POSITIVE_X,6),O0[J.TEXTURE_2D_ARRAY]=Z0(J.TEXTURE_2D_ARRAY,J.TEXTURE_2D_ARRAY,1,1),O0[J.TEXTURE_3D]=Z0(J.TEXTURE_3D,J.TEXTURE_3D,1,1),H.setClear(0,0,0,1),K.setClear(1),Y.setClear(0),R0(J.DEPTH_TEST),K.setFunc(hQ),cJ(!1),XJ(SQ),R0(J.CULL_FACE),m0(O9);function R0(S){if(G[S]!==!0)J.enable(S),G[S]=!0}function w0(S){if(G[S]!==!1)J.disable(S),G[S]=!1}function d0(S,$0){if(E[S]!==$0){if(J.bindFramebuffer(S,$0),E[S]=$0,S===J.DRAW_FRAMEBUFFER)E[J.FRAMEBUFFER]=$0;if(S===J.FRAMEBUFFER)E[J.DRAW_FRAMEBUFFER]=$0;return!0}return!1}function g0(S,$0){let c=k,H0=!1;if(S){if(c=F.get($0),c===void 0)c=[],F.set($0,c);let F0=S.textures;if(c.length!==F0.length||c[0]!==J.COLOR_ATTACHMENT0){for(let t=0,K0=F0.length;t<K0;t++)c[t]=J.COLOR_ATTACHMENT0+t;c.length=F0.length,H0=!0}}else if(c[0]!==J.BACK)c[0]=J.BACK,H0=!0;if(H0)J.drawBuffers(c)}function l0(S){if(B!==S)return J.useProgram(S),B=S,!0;return!1}let WJ={[c8]:J.FUNC_ADD,[kW]:J.FUNC_SUBTRACT,[LW]:J.FUNC_REVERSE_SUBTRACT};WJ[DW]=J.MIN,WJ[VW]=J.MAX;let u0={[MW]:J.ZERO,[BW]:J.ONE,[zW]:J.SRC_COLOR,[CW]:J.SRC_ALPHA,[SW]:J.SRC_ALPHA_SATURATE,[AW]:J.DST_COLOR,[IW]:J.DST_ALPHA,[_W]:J.ONE_MINUS_SRC_COLOR,[PW]:J.ONE_MINUS_SRC_ALPHA,[TW]:J.ONE_MINUS_DST_COLOR,[wW]:J.ONE_MINUS_DST_ALPHA,[jW]:J.CONSTANT_COLOR,[vW]:J.ONE_MINUS_CONSTANT_COLOR,[yW]:J.CONSTANT_ALPHA,[hW]:J.ONE_MINUS_CONSTANT_ALPHA};function m0(S,$0,c,H0,F0,t,K0,S0,GJ,HJ){if(S===O9){if(O===!0)w0(J.BLEND),O=!1;return}if(O===!1)R0(J.BLEND),O=!0;if(S!==RW){if(S!==N||HJ!==g){if(_!==c8||P!==c8)J.blendEquation(J.FUNC_ADD),_=c8,P=c8;if(HJ)switch(S){case M7:J.blendFuncSeparate(J.ONE,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case jQ:J.blendFunc(J.ONE,J.ONE);break;case vQ:J.blendFuncSeparate(J.ZERO,J.ONE_MINUS_SRC_COLOR,J.ZERO,J.ONE);break;case yQ:J.blendFuncSeparate(J.DST_COLOR,J.ONE_MINUS_SRC_ALPHA,J.ZERO,J.ONE);break;default:A0("WebGLState: Invalid blending: ",S);break}else switch(S){case M7:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case jQ:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE,J.ONE,J.ONE);break;case vQ:A0("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case yQ:A0("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:A0("WebGLState: Invalid blending: ",S);break}C=null,D=null,I=null,w=null,L.set(0,0,0),z=0,N=S,g=HJ}return}if(F0=F0||$0,t=t||c,K0=K0||H0,$0!==_||F0!==P)J.blendEquationSeparate(WJ[$0],WJ[F0]),_=$0,P=F0;if(c!==C||H0!==D||t!==I||K0!==w)J.blendFuncSeparate(u0[c],u0[H0],u0[t],u0[K0]),C=c,D=H0,I=t,w=K0;if(S0.equals(L)===!1||GJ!==z)J.blendColor(S0.r,S0.g,S0.b,GJ),L.copy(S0),z=GJ;N=S,g=!1}function BJ(S,$0){S.side===aJ?w0(J.CULL_FACE):R0(J.CULL_FACE);let c=S.side===TJ;if($0)c=!c;cJ(c),S.blending===M7&&S.transparent===!1?m0(O9):m0(S.blending,S.blendEquation,S.blendSrc,S.blendDst,S.blendEquationAlpha,S.blendSrcAlpha,S.blendDstAlpha,S.blendColor,S.blendAlpha,S.premultipliedAlpha),K.setFunc(S.depthFunc),K.setTest(S.depthTest),K.setMask(S.depthWrite),H.setMask(S.colorWrite);let H0=S.stencilWrite;if(Y.setTest(H0),H0)Y.setMask(S.stencilWriteMask),Y.setFunc(S.stencilFunc,S.stencilRef,S.stencilFuncMask),Y.setOp(S.stencilFail,S.stencilZFail,S.stencilZPass);zJ(S.polygonOffset,S.polygonOffsetFactor,S.polygonOffsetUnits),S.alphaToCoverage===!0?R0(J.SAMPLE_ALPHA_TO_COVERAGE):w0(J.SAMPLE_ALPHA_TO_COVERAGE)}function cJ(S){if(A!==S){if(S)J.frontFace(J.CW);else J.frontFace(J.CCW);A=S}}function XJ(S){if(S!==NW){if(R0(J.CULL_FACE),S!==m)if(S===SQ)J.cullFace(J.BACK);else if(S===FW)J.cullFace(J.FRONT);else J.cullFace(J.FRONT_AND_BACK)}else w0(J.CULL_FACE);m=S}function PJ(S){if(S!==a){if(h)J.lineWidth(S);a=S}}function zJ(S,$0,c){if(S){if(R0(J.POLYGON_OFFSET_FILL),p!==$0||n!==c){if(p=$0,n=c,K.getReversed())$0=-$0;J.polygonOffset($0,c)}}else w0(J.POLYGON_OFFSET_FILL)}function kJ(S){if(S)R0(J.SCISSOR_TEST);else w0(J.SCISSOR_TEST)}function j(S){if(S===void 0)S=J.TEXTURE0+u-1;if(W0!==S)J.activeTexture(S),W0=S}function nJ(S,$0,c){if(c===void 0)if(W0===null)c=J.TEXTURE0+u-1;else c=W0;let H0=L0[c];if(H0===void 0)H0={type:void 0,texture:void 0},L0[c]=H0;if(H0.type!==S||H0.texture!==$0){if(W0!==c)J.activeTexture(c),W0=c;J.bindTexture(S,$0||O0[S]),H0.type=S,H0.texture=$0}}function i0(){let S=L0[W0];if(S!==void 0&&S.type!==void 0)J.bindTexture(S.type,null),S.type=void 0,S.texture=void 0}function UJ(){try{J.compressedTexImage2D(...arguments)}catch(S){A0("WebGLState:",S)}}function M(){try{J.compressedTexImage3D(...arguments)}catch(S){A0("WebGLState:",S)}}function R(){try{J.texSubImage2D(...arguments)}catch(S){A0("WebGLState:",S)}}function T(){try{J.texSubImage3D(...arguments)}catch(S){A0("WebGLState:",S)}}function l(){try{J.compressedTexSubImage2D(...arguments)}catch(S){A0("WebGLState:",S)}}function e(){try{J.compressedTexSubImage3D(...arguments)}catch(S){A0("WebGLState:",S)}}function J0(){try{J.texStorage2D(...arguments)}catch(S){A0("WebGLState:",S)}}function Y0(){try{J.texStorage3D(...arguments)}catch(S){A0("WebGLState:",S)}}function d(){try{J.texImage2D(...arguments)}catch(S){A0("WebGLState:",S)}}function s(){try{J.texImage3D(...arguments)}catch(S){A0("WebGLState:",S)}}function N0(S){if(q[S]!==void 0)return q[S];else return J.getParameter(S)}function B0(S,$0){if(q[S]!==$0)J.pixelStorei(S,$0),q[S]=$0}function X0(S){if(e0.equals(S)===!1)J.scissor(S.x,S.y,S.z,S.w),e0.copy(S)}function Q0(S){if(i.equals(S)===!1)J.viewport(S.x,S.y,S.z,S.w),i.copy(S)}function C0(S,$0){let c=U.get($0);if(c===void 0)c=new WeakMap,U.set($0,c);let H0=c.get(S);if(H0===void 0)H0=J.getUniformBlockIndex($0,S.name),c.set(S,H0)}function P0(S,$0){let H0=U.get($0).get(S);if(X.get($0)!==H0)J.uniformBlockBinding($0,H0,S.__bindingPointIndex),X.set($0,H0)}function n0(){J.disable(J.BLEND),J.disable(J.CULL_FACE),J.disable(J.DEPTH_TEST),J.disable(J.POLYGON_OFFSET_FILL),J.disable(J.SCISSOR_TEST),J.disable(J.STENCIL_TEST),J.disable(J.SAMPLE_ALPHA_TO_COVERAGE),J.blendEquation(J.FUNC_ADD),J.blendFunc(J.ONE,J.ZERO),J.blendFuncSeparate(J.ONE,J.ZERO,J.ONE,J.ZERO),J.blendColor(0,0,0,0),J.colorMask(!0,!0,!0,!0),J.clearColor(0,0,0,0),J.depthMask(!0),J.depthFunc(J.LESS),K.setReversed(!1),J.clearDepth(1),J.stencilMask(4294967295),J.stencilFunc(J.ALWAYS,0,4294967295),J.stencilOp(J.KEEP,J.KEEP,J.KEEP),J.clearStencil(0),J.cullFace(J.BACK),J.frontFace(J.CCW),J.polygonOffset(0,0),J.activeTexture(J.TEXTURE0),J.bindFramebuffer(J.FRAMEBUFFER,null),J.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),J.bindFramebuffer(J.READ_FRAMEBUFFER,null),J.useProgram(null),J.lineWidth(1),J.scissor(0,0,J.canvas.width,J.canvas.height),J.viewport(0,0,J.canvas.width,J.canvas.height),J.pixelStorei(J.PACK_ALIGNMENT,4),J.pixelStorei(J.UNPACK_ALIGNMENT,4),J.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,!1),J.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),J.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,J.BROWSER_DEFAULT_WEBGL),J.pixelStorei(J.PACK_ROW_LENGTH,0),J.pixelStorei(J.PACK_SKIP_PIXELS,0),J.pixelStorei(J.PACK_SKIP_ROWS,0),J.pixelStorei(J.UNPACK_ROW_LENGTH,0),J.pixelStorei(J.UNPACK_IMAGE_HEIGHT,0),J.pixelStorei(J.UNPACK_SKIP_PIXELS,0),J.pixelStorei(J.UNPACK_SKIP_ROWS,0),J.pixelStorei(J.UNPACK_SKIP_IMAGES,0),G={},q={},W0=null,L0={},E={},F=new WeakMap,k=[],B=null,O=!1,N=null,_=null,C=null,D=null,P=null,I=null,w=null,L=new I0(0,0,0),z=0,g=!1,A=null,m=null,a=null,p=null,n=null,e0.set(0,0,J.canvas.width,J.canvas.height),i.set(0,0,J.canvas.width,J.canvas.height),H.reset(),K.reset(),Y.reset()}return{buffers:{color:H,depth:K,stencil:Y},enable:R0,disable:w0,bindFramebuffer:d0,drawBuffers:g0,useProgram:l0,setBlending:m0,setMaterial:BJ,setFlipSided:cJ,setCullFace:XJ,setLineWidth:PJ,setPolygonOffset:zJ,setScissorTest:kJ,activeTexture:j,bindTexture:nJ,unbindTexture:i0,compressedTexImage2D:UJ,compressedTexImage3D:M,texImage2D:d,texImage3D:s,pixelStorei:B0,getParameter:N0,updateUBOMapping:C0,uniformBlockBinding:P0,texStorage2D:J0,texStorage3D:Y0,texSubImage2D:R,texSubImage3D:T,compressedTexSubImage2D:l,compressedTexSubImage3D:e,scissor:X0,viewport:Q0,reset:n0}}function LE(J,Q,$,Z,W,H,K){let Y=Q.has("WEBGL_multisampled_render_to_texture")?Q.get("WEBGL_multisampled_render_to_texture"):null,X=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),U=new y0,G=new WeakMap,q=new Set,E,F=new WeakMap,k=!1;try{k=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(M){}function B(M,R){return k?new OffscreenCanvas(M,R):l8("canvas")}function O(M,R,T){let l=1,e=UJ(M);if(e.width>T||e.height>T)l=T/Math.max(e.width,e.height);if(l<1)if(typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&M instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&M instanceof ImageBitmap||typeof VideoFrame<"u"&&M instanceof VideoFrame){let J0=Math.floor(l*e.width),Y0=Math.floor(l*e.height);if(E===void 0)E=B(J0,Y0);let d=R?B(J0,Y0):E;return d.width=J0,d.height=Y0,d.getContext("2d").drawImage(M,0,0,J0,Y0),M0("WebGLRenderer: Texture has been resized from ("+e.width+"x"+e.height+") to ("+J0+"x"+Y0+")."),d}else{if("data"in M)M0("WebGLRenderer: Image in DataTexture is too big ("+e.width+"x"+e.height+").");return M}return M}function N(M){return M.generateMipmaps}function _(M){J.generateMipmap(M)}function C(M){if(M.isWebGLCubeRenderTarget)return J.TEXTURE_CUBE_MAP;if(M.isWebGL3DRenderTarget)return J.TEXTURE_3D;if(M.isWebGLArrayRenderTarget||M.isCompressedArrayTexture)return J.TEXTURE_2D_ARRAY;return J.TEXTURE_2D}function D(M,R,T,l,e,J0=!1){if(M!==null){if(J[M]!==void 0)return J[M];M0("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+M+"'")}let Y0;if(l){if(Y0=Q.get("EXT_texture_norm16"),!Y0)M0("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension")}let d=R;if(R===J.RED){if(T===J.FLOAT)d=J.R32F;if(T===J.HALF_FLOAT)d=J.R16F;if(T===J.UNSIGNED_BYTE)d=J.R8;if(T===J.UNSIGNED_SHORT&&Y0)d=Y0.R16_EXT;if(T===J.SHORT&&Y0)d=Y0.R16_SNORM_EXT}if(R===J.RED_INTEGER){if(T===J.UNSIGNED_BYTE)d=J.R8UI;if(T===J.UNSIGNED_SHORT)d=J.R16UI;if(T===J.UNSIGNED_INT)d=J.R32UI;if(T===J.BYTE)d=J.R8I;if(T===J.SHORT)d=J.R16I;if(T===J.INT)d=J.R32I}if(R===J.RG){if(T===J.FLOAT)d=J.RG32F;if(T===J.HALF_FLOAT)d=J.RG16F;if(T===J.UNSIGNED_BYTE)d=J.RG8;if(T===J.UNSIGNED_SHORT&&Y0)d=Y0.RG16_EXT;if(T===J.SHORT&&Y0)d=Y0.RG16_SNORM_EXT}if(R===J.RG_INTEGER){if(T===J.UNSIGNED_BYTE)d=J.RG8UI;if(T===J.UNSIGNED_SHORT)d=J.RG16UI;if(T===J.UNSIGNED_INT)d=J.RG32UI;if(T===J.BYTE)d=J.RG8I;if(T===J.SHORT)d=J.RG16I;if(T===J.INT)d=J.RG32I}if(R===J.RGB_INTEGER){if(T===J.UNSIGNED_BYTE)d=J.RGB8UI;if(T===J.UNSIGNED_SHORT)d=J.RGB16UI;if(T===J.UNSIGNED_INT)d=J.RGB32UI;if(T===J.BYTE)d=J.RGB8I;if(T===J.SHORT)d=J.RGB16I;if(T===J.INT)d=J.RGB32I}if(R===J.RGBA_INTEGER){if(T===J.UNSIGNED_BYTE)d=J.RGBA8UI;if(T===J.UNSIGNED_SHORT)d=J.RGBA16UI;if(T===J.UNSIGNED_INT)d=J.RGBA32UI;if(T===J.BYTE)d=J.RGBA8I;if(T===J.SHORT)d=J.RGBA16I;if(T===J.INT)d=J.RGBA32I}if(R===J.RGB){if(T===J.UNSIGNED_SHORT&&Y0)d=Y0.RGB16_EXT;if(T===J.SHORT&&Y0)d=Y0.RGB16_SNORM_EXT;if(T===J.UNSIGNED_INT_5_9_9_9_REV)d=J.RGB9_E5;if(T===J.UNSIGNED_INT_10F_11F_11F_REV)d=J.R11F_G11F_B10F}if(R===J.RGBA){let s=J0?w$:b0.getTransfer(e);if(T===J.FLOAT)d=J.RGBA32F;if(T===J.HALF_FLOAT)d=J.RGBA16F;if(T===J.UNSIGNED_BYTE)d=s===$J?J.SRGB8_ALPHA8:J.RGBA8;if(T===J.UNSIGNED_SHORT&&Y0)d=Y0.RGBA16_EXT;if(T===J.SHORT&&Y0)d=Y0.RGBA16_SNORM_EXT;if(T===J.UNSIGNED_SHORT_4_4_4_4)d=J.RGBA4;if(T===J.UNSIGNED_SHORT_5_5_5_1)d=J.RGB5_A1}if(d===J.R16F||d===J.R32F||d===J.RG16F||d===J.RG32F||d===J.RGBA16F||d===J.RGBA32F)Q.get("EXT_color_buffer_float");return d}function P(M,R){let T;if(M){if(R===null||R===s9||R===a8)T=J.DEPTH24_STENCIL8;else if(R===j9)T=J.DEPTH32F_STENCIL8;else if(R===_7)T=J.DEPTH24_STENCIL8,M0("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")}else if(R===null||R===s9||R===a8)T=J.DEPTH_COMPONENT24;else if(R===j9)T=J.DEPTH_COMPONENT32F;else if(R===_7)T=J.DEPTH_COMPONENT16;return T}function I(M,R){if(N(M)===!0||M.isFramebufferTexture&&M.minFilter!==Y9&&M.minFilter!==CJ)return Math.log2(Math.max(R.width,R.height))+1;else if(M.mipmaps!==void 0&&M.mipmaps.length>0)return M.mipmaps.length;else if(M.isCompressedTexture&&Array.isArray(M.image))return R.mipmaps.length;else return 1}function w(M){let R=M.target;if(R.removeEventListener("dispose",w),z(R),R.isVideoTexture)G.delete(R);if(R.isHTMLTexture)q.delete(R)}function L(M){let R=M.target;R.removeEventListener("dispose",L),A(R)}function z(M){let R=Z.get(M);if(R.__webglInit===void 0)return;let T=M.source,l=F.get(T);if(l){let e=l[R.__cacheKey];if(e.usedTimes--,e.usedTimes===0)g(M);if(Object.keys(l).length===0)F.delete(T)}Z.remove(M)}function g(M){let R=Z.get(M);J.deleteTexture(R.__webglTexture);let T=M.source,l=F.get(T);delete l[R.__cacheKey],K.memory.textures--}function A(M){let R=Z.get(M);if(M.depthTexture)M.depthTexture.dispose(),Z.remove(M.depthTexture);if(M.isWebGLCubeRenderTarget)for(let l=0;l<6;l++){if(Array.isArray(R.__webglFramebuffer[l]))for(let e=0;e<R.__webglFramebuffer[l].length;e++)J.deleteFramebuffer(R.__webglFramebuffer[l][e]);else J.deleteFramebuffer(R.__webglFramebuffer[l]);if(R.__webglDepthbuffer)J.deleteRenderbuffer(R.__webglDepthbuffer[l])}else{if(Array.isArray(R.__webglFramebuffer))for(let l=0;l<R.__webglFramebuffer.length;l++)J.deleteFramebuffer(R.__webglFramebuffer[l]);else J.deleteFramebuffer(R.__webglFramebuffer);if(R.__webglDepthbuffer)J.deleteRenderbuffer(R.__webglDepthbuffer);if(R.__webglMultisampledFramebuffer)J.deleteFramebuffer(R.__webglMultisampledFramebuffer);if(R.__webglColorRenderbuffer){for(let l=0;l<R.__webglColorRenderbuffer.length;l++)if(R.__webglColorRenderbuffer[l])J.deleteRenderbuffer(R.__webglColorRenderbuffer[l])}if(R.__webglDepthRenderbuffer)J.deleteRenderbuffer(R.__webglDepthRenderbuffer)}let T=M.textures;for(let l=0,e=T.length;l<e;l++){let J0=Z.get(T[l]);if(J0.__webglTexture)J.deleteTexture(J0.__webglTexture),K.memory.textures--;Z.remove(T[l])}Z.remove(M)}let m=0;function a(){m=0}function p(){return m}function n(M){m=M}function u(){let M=m;if(M>=W.maxTextures)M0("WebGLTextures: Trying to use "+M+" texture units while this GPU supports only "+W.maxTextures);return m+=1,M}function h(M){let R=[];return R.push(M.wrapS),R.push(M.wrapT),R.push(M.wrapR||0),R.push(M.magFilter),R.push(M.minFilter),R.push(M.anisotropy),R.push(M.internalFormat),R.push(M.format),R.push(M.type),R.push(M.generateMipmaps),R.push(M.premultiplyAlpha),R.push(M.flipY),R.push(M.unpackAlignment),R.push(M.colorSpace),R.join()}function o(M,R){let T=Z.get(M);if(M.isVideoTexture)nJ(M);if(M.isRenderTargetTexture===!1&&M.isExternalTexture!==!0&&M.version>0&&T.__version!==M.version){let l=M.image;if(l===null)M0("WebGLRenderer: Texture marked for update but no image data found.");else if(l.complete===!1)M0("WebGLRenderer: Texture marked for update but image is incomplete");else{w0(T,M,R);return}}else if(M.isExternalTexture)T.__webglTexture=M.sourceTexture?M.sourceTexture:null;$.bindTexture(J.TEXTURE_2D,T.__webglTexture,J.TEXTURE0+R)}function r(M,R){let T=Z.get(M);if(M.isRenderTargetTexture===!1&&M.version>0&&T.__version!==M.version){w0(T,M,R);return}else if(M.isExternalTexture)T.__webglTexture=M.sourceTexture?M.sourceTexture:null;$.bindTexture(J.TEXTURE_2D_ARRAY,T.__webglTexture,J.TEXTURE0+R)}function W0(M,R){let T=Z.get(M);if(M.isRenderTargetTexture===!1&&M.version>0&&T.__version!==M.version){w0(T,M,R);return}$.bindTexture(J.TEXTURE_3D,T.__webglTexture,J.TEXTURE0+R)}function L0(M,R){let T=Z.get(M);if(M.isCubeDepthTexture!==!0&&M.version>0&&T.__version!==M.version){d0(T,M,R);return}$.bindTexture(J.TEXTURE_CUBE_MAP,T.__webglTexture,J.TEXTURE0+R)}let E0={[s8]:J.REPEAT,[i8]:J.CLAMP_TO_EDGE,[V6]:J.MIRRORED_REPEAT},ZJ={[Y9]:J.NEAREST,[M6]:J.NEAREST_MIPMAP_NEAREST,[q8]:J.NEAREST_MIPMAP_LINEAR,[CJ]:J.LINEAR,[o8]:J.LINEAR_MIPMAP_NEAREST,[R9]:J.LINEAR_MIPMAP_LINEAR},e0={[JH]:J.NEVER,[HH]:J.ALWAYS,[QH]:J.LESS,[A6]:J.LEQUAL,[$H]:J.EQUAL,[T6]:J.GEQUAL,[ZH]:J.GREATER,[WH]:J.NOTEQUAL};function i(M,R){if(R.type===j9&&Q.has("OES_texture_float_linear")===!1&&(R.magFilter===CJ||R.magFilter===o8||R.magFilter===q8||R.magFilter===R9||R.minFilter===CJ||R.minFilter===o8||R.minFilter===q8||R.minFilter===R9))M0("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.");if(J.texParameteri(M,J.TEXTURE_WRAP_S,E0[R.wrapS]),J.texParameteri(M,J.TEXTURE_WRAP_T,E0[R.wrapT]),M===J.TEXTURE_3D||M===J.TEXTURE_2D_ARRAY)J.texParameteri(M,J.TEXTURE_WRAP_R,E0[R.wrapR]);if(J.texParameteri(M,J.TEXTURE_MAG_FILTER,ZJ[R.magFilter]),J.texParameteri(M,J.TEXTURE_MIN_FILTER,ZJ[R.minFilter]),R.compareFunction)J.texParameteri(M,J.TEXTURE_COMPARE_MODE,J.COMPARE_REF_TO_TEXTURE),J.texParameteri(M,J.TEXTURE_COMPARE_FUNC,e0[R.compareFunction]);if(Q.has("EXT_texture_filter_anisotropic")===!0){if(R.magFilter===Y9)return;if(R.minFilter!==q8&&R.minFilter!==R9)return;if(R.type===j9&&Q.has("OES_texture_float_linear")===!1)return;if(R.anisotropy>1||Z.get(R).__currentAnisotropy){let T=Q.get("EXT_texture_filter_anisotropic");J.texParameterf(M,T.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(R.anisotropy,W.getMaxAnisotropy())),Z.get(R).__currentAnisotropy=R.anisotropy}}}function Z0(M,R){let T=!1;if(M.__webglInit===void 0)M.__webglInit=!0,R.addEventListener("dispose",w);let l=R.source,e=F.get(l);if(e===void 0)e={},F.set(l,e);let J0=h(R);if(J0!==M.__cacheKey){if(e[J0]===void 0)e[J0]={texture:J.createTexture(),usedTimes:0},K.memory.textures++,T=!0;e[J0].usedTimes++;let Y0=e[M.__cacheKey];if(Y0!==void 0){if(e[M.__cacheKey].usedTimes--,Y0.usedTimes===0)g(R)}M.__cacheKey=J0,M.__webglTexture=e[J0].texture}return T}function O0(M,R,T){return Math.floor(Math.floor(M/T)/R)}function R0(M,R,T,l){let J0=M.updateRanges;if(J0.length===0)$.texSubImage2D(J.TEXTURE_2D,0,0,0,R.width,R.height,T,l,R.data);else{J0.sort((B0,X0)=>B0.start-X0.start);let Y0=0;for(let B0=1;B0<J0.length;B0++){let X0=J0[Y0],Q0=J0[B0],C0=X0.start+X0.count,P0=O0(Q0.start,R.width,4),n0=O0(X0.start,R.width,4);if(Q0.start<=C0+1&&P0===n0&&O0(Q0.start+Q0.count-1,R.width,4)===P0)X0.count=Math.max(X0.count,Q0.start+Q0.count-X0.start);else++Y0,J0[Y0]=Q0}J0.length=Y0+1;let d=$.getParameter(J.UNPACK_ROW_LENGTH),s=$.getParameter(J.UNPACK_SKIP_PIXELS),N0=$.getParameter(J.UNPACK_SKIP_ROWS);$.pixelStorei(J.UNPACK_ROW_LENGTH,R.width);for(let B0=0,X0=J0.length;B0<X0;B0++){let Q0=J0[B0],C0=Math.floor(Q0.start/4),P0=Math.ceil(Q0.count/4),n0=C0%R.width,S=Math.floor(C0/R.width),$0=P0,c=1;$.pixelStorei(J.UNPACK_SKIP_PIXELS,n0),$.pixelStorei(J.UNPACK_SKIP_ROWS,S),$.texSubImage2D(J.TEXTURE_2D,0,n0,S,$0,1,T,l,R.data)}M.clearUpdateRanges(),$.pixelStorei(J.UNPACK_ROW_LENGTH,d),$.pixelStorei(J.UNPACK_SKIP_PIXELS,s),$.pixelStorei(J.UNPACK_SKIP_ROWS,N0)}}function w0(M,R,T){let l=J.TEXTURE_2D;if(R.isDataArrayTexture||R.isCompressedArrayTexture)l=J.TEXTURE_2D_ARRAY;if(R.isData3DTexture)l=J.TEXTURE_3D;let e=Z0(M,R),J0=R.source;$.bindTexture(l,M.__webglTexture,J.TEXTURE0+T);let Y0=Z.get(J0);if(J0.version!==Y0.__version||e===!0){if($.activeTexture(J.TEXTURE0+T),(typeof ImageBitmap<"u"&&R.image instanceof ImageBitmap)===!1){let c=b0.getPrimaries(b0.workingColorSpace),H0=R.colorSpace===R8?null:b0.getPrimaries(R.colorSpace),F0=R.colorSpace===R8||c===H0?J.NONE:J.BROWSER_DEFAULT_WEBGL;$.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,R.flipY),$.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),$.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,F0)}$.pixelStorei(J.UNPACK_ALIGNMENT,R.unpackAlignment);let s=O(R.image,!1,W.maxTextureSize);s=i0(R,s);let N0=H.convert(R.format,R.colorSpace),B0=H.convert(R.type),X0=D(R.internalFormat,N0,B0,R.normalized,R.colorSpace,R.isVideoTexture);i(l,R);let Q0,C0=R.mipmaps,P0=R.isVideoTexture!==!0,n0=Y0.__version===void 0||e===!0,S=J0.dataReady,$0=I(R,s);if(R.isDepthTexture){if(X0=P(R.format===F8,R.type),n0)if(P0)$.texStorage2D(J.TEXTURE_2D,1,X0,s.width,s.height);else $.texImage2D(J.TEXTURE_2D,0,X0,s.width,s.height,0,N0,B0,null)}else if(R.isDataTexture)if(C0.length>0){if(P0&&n0)$.texStorage2D(J.TEXTURE_2D,$0,X0,C0[0].width,C0[0].height);for(let c=0,H0=C0.length;c<H0;c++)if(Q0=C0[c],P0){if(S)$.texSubImage2D(J.TEXTURE_2D,c,0,0,Q0.width,Q0.height,N0,B0,Q0.data)}else $.texImage2D(J.TEXTURE_2D,c,X0,Q0.width,Q0.height,0,N0,B0,Q0.data);R.generateMipmaps=!1}else if(P0){if(n0)$.texStorage2D(J.TEXTURE_2D,$0,X0,s.width,s.height);if(S)R0(R,s,N0,B0)}else $.texImage2D(J.TEXTURE_2D,0,X0,s.width,s.height,0,N0,B0,s.data);else if(R.isCompressedTexture)if(R.isCompressedArrayTexture){if(P0&&n0)$.texStorage3D(J.TEXTURE_2D_ARRAY,$0,X0,C0[0].width,C0[0].height,s.depth);for(let c=0,H0=C0.length;c<H0;c++)if(Q0=C0[c],R.format!==k9)if(N0!==null)if(P0){if(S)if(R.layerUpdates.size>0){let F0=JZ(Q0.width,Q0.height,R.format,R.type);for(let t of R.layerUpdates){let K0=Q0.data.subarray(t*F0/Q0.data.BYTES_PER_ELEMENT,(t+1)*F0/Q0.data.BYTES_PER_ELEMENT);$.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,c,0,0,t,Q0.width,Q0.height,1,N0,K0)}R.clearLayerUpdates()}else $.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,c,0,0,0,Q0.width,Q0.height,s.depth,N0,Q0.data)}else $.compressedTexImage3D(J.TEXTURE_2D_ARRAY,c,X0,Q0.width,Q0.height,s.depth,0,Q0.data,0,0);else M0("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(P0){if(S)$.texSubImage3D(J.TEXTURE_2D_ARRAY,c,0,0,0,Q0.width,Q0.height,s.depth,N0,B0,Q0.data)}else $.texImage3D(J.TEXTURE_2D_ARRAY,c,X0,Q0.width,Q0.height,s.depth,0,N0,B0,Q0.data)}else{if(P0&&n0)$.texStorage2D(J.TEXTURE_2D,$0,X0,C0[0].width,C0[0].height);for(let c=0,H0=C0.length;c<H0;c++)if(Q0=C0[c],R.format!==k9)if(N0!==null)if(P0){if(S)$.compressedTexSubImage2D(J.TEXTURE_2D,c,0,0,Q0.width,Q0.height,N0,Q0.data)}else $.compressedTexImage2D(J.TEXTURE_2D,c,X0,Q0.width,Q0.height,0,Q0.data);else M0("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(P0){if(S)$.texSubImage2D(J.TEXTURE_2D,c,0,0,Q0.width,Q0.height,N0,B0,Q0.data)}else $.texImage2D(J.TEXTURE_2D,c,X0,Q0.width,Q0.height,0,N0,B0,Q0.data)}else if(R.isDataArrayTexture)if(P0){if(n0)$.texStorage3D(J.TEXTURE_2D_ARRAY,$0,X0,s.width,s.height,s.depth);if(S)if(R.layerUpdates.size>0){let c=JZ(s.width,s.height,R.format,R.type);for(let H0 of R.layerUpdates){let F0=s.data.subarray(H0*c/s.data.BYTES_PER_ELEMENT,(H0+1)*c/s.data.BYTES_PER_ELEMENT);$.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,H0,s.width,s.height,1,N0,B0,F0)}R.clearLayerUpdates()}else $.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,0,s.width,s.height,s.depth,N0,B0,s.data)}else $.texImage3D(J.TEXTURE_2D_ARRAY,0,X0,s.width,s.height,s.depth,0,N0,B0,s.data);else if(R.isData3DTexture)if(P0){if(n0)$.texStorage3D(J.TEXTURE_3D,$0,X0,s.width,s.height,s.depth);if(S)$.texSubImage3D(J.TEXTURE_3D,0,0,0,0,s.width,s.height,s.depth,N0,B0,s.data)}else $.texImage3D(J.TEXTURE_3D,0,X0,s.width,s.height,s.depth,0,N0,B0,s.data);else if(R.isFramebufferTexture){if(n0)if(P0)$.texStorage2D(J.TEXTURE_2D,$0,X0,s.width,s.height);else{let{width:c,height:H0}=s;for(let F0=0;F0<$0;F0++)$.texImage2D(J.TEXTURE_2D,F0,X0,c,H0,0,N0,B0,null),c>>=1,H0>>=1}}else if(R.isHTMLTexture){if("texElementImage2D"in J){let c=J.canvas;if(!c.hasAttribute("layoutsubtree"))c.setAttribute("layoutsubtree","true");if(s.parentNode!==c){c.appendChild(s),q.add(R),c.onpaint=(H0)=>{let F0=H0.changedElements;for(let t of q)if(F0.includes(t.image))t.needsUpdate=!0},c.requestPaint();return}if(J.texElementImage2D.length===3)J.texElementImage2D(J.TEXTURE_2D,J.RGBA8,s);else{let{RGBA:F0,RGBA:t,UNSIGNED_BYTE:K0}=J;J.texElementImage2D(J.TEXTURE_2D,0,F0,t,K0,s)}J.texParameteri(J.TEXTURE_2D,J.TEXTURE_MIN_FILTER,J.LINEAR),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_S,J.CLAMP_TO_EDGE),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_T,J.CLAMP_TO_EDGE)}}else if(C0.length>0){if(P0&&n0){let c=UJ(C0[0]);$.texStorage2D(J.TEXTURE_2D,$0,X0,c.width,c.height)}for(let c=0,H0=C0.length;c<H0;c++)if(Q0=C0[c],P0){if(S)$.texSubImage2D(J.TEXTURE_2D,c,0,0,N0,B0,Q0)}else $.texImage2D(J.TEXTURE_2D,c,X0,N0,B0,Q0);R.generateMipmaps=!1}else if(P0){if(n0){let c=UJ(s);$.texStorage2D(J.TEXTURE_2D,$0,X0,c.width,c.height)}if(S)$.texSubImage2D(J.TEXTURE_2D,0,0,0,N0,B0,s)}else $.texImage2D(J.TEXTURE_2D,0,X0,N0,B0,s);if(N(R))_(l);if(Y0.__version=J0.version,R.onUpdate)R.onUpdate(R)}M.__version=R.version}function d0(M,R,T){if(R.image.length!==6)return;let l=Z0(M,R),e=R.source;$.bindTexture(J.TEXTURE_CUBE_MAP,M.__webglTexture,J.TEXTURE0+T);let J0=Z.get(e);if(e.version!==J0.__version||l===!0){$.activeTexture(J.TEXTURE0+T);let Y0=b0.getPrimaries(b0.workingColorSpace),d=R.colorSpace===R8?null:b0.getPrimaries(R.colorSpace),s=R.colorSpace===R8||Y0===d?J.NONE:J.BROWSER_DEFAULT_WEBGL;$.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,R.flipY),$.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),$.pixelStorei(J.UNPACK_ALIGNMENT,R.unpackAlignment),$.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,s);let N0=R.isCompressedTexture||R.image[0].isCompressedTexture,B0=R.image[0]&&R.image[0].isDataTexture,X0=[];for(let t=0;t<6;t++){if(!N0&&!B0)X0[t]=O(R.image[t],!0,W.maxCubemapSize);else X0[t]=B0?R.image[t].image:R.image[t];X0[t]=i0(R,X0[t])}let Q0=X0[0],C0=H.convert(R.format,R.colorSpace),P0=H.convert(R.type),n0=D(R.internalFormat,C0,P0,R.normalized,R.colorSpace),S=R.isVideoTexture!==!0,$0=J0.__version===void 0||l===!0,c=e.dataReady,H0=I(R,Q0);i(J.TEXTURE_CUBE_MAP,R);let F0;if(N0){if(S&&$0)$.texStorage2D(J.TEXTURE_CUBE_MAP,H0,n0,Q0.width,Q0.height);for(let t=0;t<6;t++){F0=X0[t].mipmaps;for(let K0=0;K0<F0.length;K0++){let S0=F0[K0];if(R.format!==k9)if(C0!==null)if(S){if(c)$.compressedTexSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,K0,0,0,S0.width,S0.height,C0,S0.data)}else $.compressedTexImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,K0,n0,S0.width,S0.height,0,S0.data);else M0("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()");else if(S){if(c)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,K0,0,0,S0.width,S0.height,C0,P0,S0.data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,K0,n0,S0.width,S0.height,0,C0,P0,S0.data)}}}else{if(F0=R.mipmaps,S&&$0){if(F0.length>0)H0++;let t=UJ(X0[0]);$.texStorage2D(J.TEXTURE_CUBE_MAP,H0,n0,t.width,t.height)}for(let t=0;t<6;t++)if(B0){if(S){if(c)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,X0[t].width,X0[t].height,C0,P0,X0[t].data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,n0,X0[t].width,X0[t].height,0,C0,P0,X0[t].data);for(let K0=0;K0<F0.length;K0++){let GJ=F0[K0].image[t].image;if(S){if(c)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,K0+1,0,0,GJ.width,GJ.height,C0,P0,GJ.data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,K0+1,n0,GJ.width,GJ.height,0,C0,P0,GJ.data)}}else{if(S){if(c)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,C0,P0,X0[t])}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,n0,C0,P0,X0[t]);for(let K0=0;K0<F0.length;K0++){let S0=F0[K0];if(S){if(c)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,K0+1,0,0,C0,P0,S0.image[t])}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,K0+1,n0,C0,P0,S0.image[t])}}}if(N(R))_(J.TEXTURE_CUBE_MAP);if(J0.__version=e.version,R.onUpdate)R.onUpdate(R)}M.__version=R.version}function g0(M,R,T,l,e,J0){let Y0=H.convert(T.format,T.colorSpace),d=H.convert(T.type),s=D(T.internalFormat,Y0,d,T.normalized,T.colorSpace),N0=Z.get(R),B0=Z.get(T);if(B0.__renderTarget=R,!N0.__hasExternalTextures){let X0=Math.max(1,R.width>>J0),Q0=Math.max(1,R.height>>J0);if(e===J.TEXTURE_3D||e===J.TEXTURE_2D_ARRAY)$.texImage3D(e,J0,s,X0,Q0,R.depth,0,Y0,d,null);else $.texImage2D(e,J0,s,X0,Q0,0,Y0,d,null)}if($.bindFramebuffer(J.FRAMEBUFFER,M),j(R))Y.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,l,e,B0.__webglTexture,0,kJ(R));else if(e===J.TEXTURE_2D||e>=J.TEXTURE_CUBE_MAP_POSITIVE_X&&e<=J.TEXTURE_CUBE_MAP_NEGATIVE_Z)J.framebufferTexture2D(J.FRAMEBUFFER,l,e,B0.__webglTexture,J0);$.bindFramebuffer(J.FRAMEBUFFER,null)}function l0(M,R,T){if(J.bindRenderbuffer(J.RENDERBUFFER,M),R.depthBuffer){let l=R.depthTexture,e=l&&l.isDepthTexture?l.type:null,J0=P(R.stencilBuffer,e),Y0=R.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;if(j(R))Y.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,kJ(R),J0,R.width,R.height);else if(T)J.renderbufferStorageMultisample(J.RENDERBUFFER,kJ(R),J0,R.width,R.height);else J.renderbufferStorage(J.RENDERBUFFER,J0,R.width,R.height);J.framebufferRenderbuffer(J.FRAMEBUFFER,Y0,J.RENDERBUFFER,M)}else{let l=R.textures;for(let e=0;e<l.length;e++){let J0=l[e],Y0=H.convert(J0.format,J0.colorSpace),d=H.convert(J0.type),s=D(J0.internalFormat,Y0,d,J0.normalized,J0.colorSpace);if(j(R))Y.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,kJ(R),s,R.width,R.height);else if(T)J.renderbufferStorageMultisample(J.RENDERBUFFER,kJ(R),s,R.width,R.height);else J.renderbufferStorage(J.RENDERBUFFER,s,R.width,R.height)}}J.bindRenderbuffer(J.RENDERBUFFER,null)}function WJ(M,R,T){let l=R.isWebGLCubeRenderTarget===!0;if($.bindFramebuffer(J.FRAMEBUFFER,M),!(R.depthTexture&&R.depthTexture.isDepthTexture))throw Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let e=Z.get(R.depthTexture);if(e.__renderTarget=R,!e.__webglTexture||R.depthTexture.image.width!==R.width||R.depthTexture.image.height!==R.height)R.depthTexture.image.width=R.width,R.depthTexture.image.height=R.height,R.depthTexture.needsUpdate=!0;if(l){if(e.__webglInit===void 0)e.__webglInit=!0,R.depthTexture.addEventListener("dispose",w);if(e.__webglTexture===void 0){e.__webglTexture=J.createTexture(),$.bindTexture(J.TEXTURE_CUBE_MAP,e.__webglTexture),i(J.TEXTURE_CUBE_MAP,R.depthTexture);let N0=H.convert(R.depthTexture.format),B0=H.convert(R.depthTexture.type),X0;if(R.depthTexture.format===N8)X0=J.DEPTH_COMPONENT24;else if(R.depthTexture.format===F8)X0=J.DEPTH24_STENCIL8;for(let Q0=0;Q0<6;Q0++)J.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+Q0,0,X0,R.width,R.height,0,N0,B0,null)}}else o(R.depthTexture,0);let J0=e.__webglTexture,Y0=kJ(R),d=l?J.TEXTURE_CUBE_MAP_POSITIVE_X+T:J.TEXTURE_2D,s=R.depthTexture.format===F8?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;if(R.depthTexture.format===N8)if(j(R))Y.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,s,d,J0,0,Y0);else J.framebufferTexture2D(J.FRAMEBUFFER,s,d,J0,0);else if(R.depthTexture.format===F8)if(j(R))Y.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,s,d,J0,0,Y0);else J.framebufferTexture2D(J.FRAMEBUFFER,s,d,J0,0);else throw Error("THREE.WebGLTextures: Unknown depthTexture format.")}function u0(M){let R=Z.get(M),T=M.isWebGLCubeRenderTarget===!0;if(R.__boundDepthTexture!==M.depthTexture){let l=M.depthTexture;if(R.__depthDisposeCallback)R.__depthDisposeCallback();if(l){let e=()=>{delete R.__boundDepthTexture,delete R.__depthDisposeCallback,l.removeEventListener("dispose",e)};l.addEventListener("dispose",e),R.__depthDisposeCallback=e}R.__boundDepthTexture=l}if(M.depthTexture&&!R.__autoAllocateDepthBuffer)if(T)for(let l=0;l<6;l++)WJ(R.__webglFramebuffer[l],M,l);else{let l=M.texture.mipmaps;if(l&&l.length>0)WJ(R.__webglFramebuffer[0],M,0);else WJ(R.__webglFramebuffer,M,0)}else if(T){R.__webglDepthbuffer=[];for(let l=0;l<6;l++)if($.bindFramebuffer(J.FRAMEBUFFER,R.__webglFramebuffer[l]),R.__webglDepthbuffer[l]===void 0)R.__webglDepthbuffer[l]=J.createRenderbuffer(),l0(R.__webglDepthbuffer[l],M,!1);else{let e=M.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,J0=R.__webglDepthbuffer[l];J.bindRenderbuffer(J.RENDERBUFFER,J0),J.framebufferRenderbuffer(J.FRAMEBUFFER,e,J.RENDERBUFFER,J0)}}else{let l=M.texture.mipmaps;if(l&&l.length>0)$.bindFramebuffer(J.FRAMEBUFFER,R.__webglFramebuffer[0]);else $.bindFramebuffer(J.FRAMEBUFFER,R.__webglFramebuffer);if(R.__webglDepthbuffer===void 0)R.__webglDepthbuffer=J.createRenderbuffer(),l0(R.__webglDepthbuffer,M,!1);else{let e=M.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,J0=R.__webglDepthbuffer;J.bindRenderbuffer(J.RENDERBUFFER,J0),J.framebufferRenderbuffer(J.FRAMEBUFFER,e,J.RENDERBUFFER,J0)}}$.bindFramebuffer(J.FRAMEBUFFER,null)}function m0(M,R,T){let l=Z.get(M);if(R!==void 0)g0(l.__webglFramebuffer,M,M.texture,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,0);if(T!==void 0)u0(M)}function BJ(M){let R=M.texture,T=Z.get(M),l=Z.get(R);M.addEventListener("dispose",L);let e=M.textures,J0=M.isWebGLCubeRenderTarget===!0,Y0=e.length>1;if(!Y0){if(l.__webglTexture===void 0)l.__webglTexture=J.createTexture();l.__version=R.version,K.memory.textures++}if(J0){T.__webglFramebuffer=[];for(let d=0;d<6;d++)if(R.mipmaps&&R.mipmaps.length>0){T.__webglFramebuffer[d]=[];for(let s=0;s<R.mipmaps.length;s++)T.__webglFramebuffer[d][s]=J.createFramebuffer()}else T.__webglFramebuffer[d]=J.createFramebuffer()}else{if(R.mipmaps&&R.mipmaps.length>0){T.__webglFramebuffer=[];for(let d=0;d<R.mipmaps.length;d++)T.__webglFramebuffer[d]=J.createFramebuffer()}else T.__webglFramebuffer=J.createFramebuffer();if(Y0)for(let d=0,s=e.length;d<s;d++){let N0=Z.get(e[d]);if(N0.__webglTexture===void 0)N0.__webglTexture=J.createTexture(),K.memory.textures++}if(M.samples>0&&j(M)===!1){T.__webglMultisampledFramebuffer=J.createFramebuffer(),T.__webglColorRenderbuffer=[],$.bindFramebuffer(J.FRAMEBUFFER,T.__webglMultisampledFramebuffer);for(let d=0;d<e.length;d++){let s=e[d];T.__webglColorRenderbuffer[d]=J.createRenderbuffer(),J.bindRenderbuffer(J.RENDERBUFFER,T.__webglColorRenderbuffer[d]);let N0=H.convert(s.format,s.colorSpace),B0=H.convert(s.type),X0=D(s.internalFormat,N0,B0,s.normalized,s.colorSpace,M.isXRRenderTarget===!0),Q0=kJ(M);J.renderbufferStorageMultisample(J.RENDERBUFFER,Q0,X0,M.width,M.height),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+d,J.RENDERBUFFER,T.__webglColorRenderbuffer[d])}if(J.bindRenderbuffer(J.RENDERBUFFER,null),M.depthBuffer)T.__webglDepthRenderbuffer=J.createRenderbuffer(),l0(T.__webglDepthRenderbuffer,M,!0);$.bindFramebuffer(J.FRAMEBUFFER,null)}}if(J0){$.bindTexture(J.TEXTURE_CUBE_MAP,l.__webglTexture),i(J.TEXTURE_CUBE_MAP,R);for(let d=0;d<6;d++)if(R.mipmaps&&R.mipmaps.length>0)for(let s=0;s<R.mipmaps.length;s++)g0(T.__webglFramebuffer[d][s],M,R,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+d,s);else g0(T.__webglFramebuffer[d],M,R,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+d,0);if(N(R))_(J.TEXTURE_CUBE_MAP);$.unbindTexture()}else if(Y0){for(let d=0,s=e.length;d<s;d++){let N0=e[d],B0=Z.get(N0),X0=J.TEXTURE_2D;if(M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)X0=M.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;if($.bindTexture(X0,B0.__webglTexture),i(X0,N0),g0(T.__webglFramebuffer,M,N0,J.COLOR_ATTACHMENT0+d,X0,0),N(N0))_(X0)}$.unbindTexture()}else{let d=J.TEXTURE_2D;if(M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)d=M.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;if($.bindTexture(d,l.__webglTexture),i(d,R),R.mipmaps&&R.mipmaps.length>0)for(let s=0;s<R.mipmaps.length;s++)g0(T.__webglFramebuffer[s],M,R,J.COLOR_ATTACHMENT0,d,s);else g0(T.__webglFramebuffer,M,R,J.COLOR_ATTACHMENT0,d,0);if(N(R))_(d);$.unbindTexture()}if(M.depthBuffer)u0(M)}function cJ(M){let R=M.textures;for(let T=0,l=R.length;T<l;T++){let e=R[T];if(N(e)){let J0=C(M),Y0=Z.get(e).__webglTexture;$.bindTexture(J0,Y0),_(J0),$.unbindTexture()}}}let XJ=[],PJ=[];function zJ(M){if(M.samples>0){if(j(M)===!1){let{textures:R,width:T,height:l}=M,e=J.COLOR_BUFFER_BIT,J0=M.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,Y0=Z.get(M),d=R.length>1;if(d)for(let N0=0;N0<R.length;N0++)$.bindFramebuffer(J.FRAMEBUFFER,Y0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+N0,J.RENDERBUFFER,null),$.bindFramebuffer(J.FRAMEBUFFER,Y0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+N0,J.TEXTURE_2D,null,0);$.bindFramebuffer(J.READ_FRAMEBUFFER,Y0.__webglMultisampledFramebuffer);let s=M.texture.mipmaps;if(s&&s.length>0)$.bindFramebuffer(J.DRAW_FRAMEBUFFER,Y0.__webglFramebuffer[0]);else $.bindFramebuffer(J.DRAW_FRAMEBUFFER,Y0.__webglFramebuffer);for(let N0=0;N0<R.length;N0++){if(M.resolveDepthBuffer){if(M.depthBuffer)e|=J.DEPTH_BUFFER_BIT;if(M.stencilBuffer&&M.resolveStencilBuffer)e|=J.STENCIL_BUFFER_BIT}if(d){J.framebufferRenderbuffer(J.READ_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.RENDERBUFFER,Y0.__webglColorRenderbuffer[N0]);let B0=Z.get(R[N0]).__webglTexture;J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,B0,0)}if(J.blitFramebuffer(0,0,T,l,0,0,T,l,e,J.NEAREST),X===!0){if(XJ.length=0,PJ.length=0,XJ.push(J.COLOR_ATTACHMENT0+N0),M.depthBuffer&&M.resolveDepthBuffer===!1)XJ.push(J0),PJ.push(J0),J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,PJ);J.invalidateFramebuffer(J.READ_FRAMEBUFFER,XJ)}}if($.bindFramebuffer(J.READ_FRAMEBUFFER,null),$.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),d)for(let N0=0;N0<R.length;N0++){$.bindFramebuffer(J.FRAMEBUFFER,Y0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+N0,J.RENDERBUFFER,Y0.__webglColorRenderbuffer[N0]);let B0=Z.get(R[N0]).__webglTexture;$.bindFramebuffer(J.FRAMEBUFFER,Y0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+N0,J.TEXTURE_2D,B0,0)}$.bindFramebuffer(J.DRAW_FRAMEBUFFER,Y0.__webglMultisampledFramebuffer)}else if(M.depthBuffer&&M.resolveDepthBuffer===!1&&X){let R=M.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,[R])}}}function kJ(M){return Math.min(W.maxSamples,M.samples)}function j(M){let R=Z.get(M);return M.samples>0&&Q.has("WEBGL_multisampled_render_to_texture")===!0&&R.__useRenderToTexture!==!1}function nJ(M){let R=K.render.frame;if(G.get(M)!==R)G.set(M,R),M.update()}function i0(M,R){let{colorSpace:T,format:l,type:e}=M;if(M.isCompressedTexture===!0||M.isVideoTexture===!0)return R;if(T!==pJ&&T!==R8)if(b0.getTransfer(T)===$J){if(l!==k9||e!==X9)M0("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.")}else A0("WebGLTextures: Unsupported texture color space:",T);return R}function UJ(M){if(typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement)U.width=M.naturalWidth||M.width,U.height=M.naturalHeight||M.height;else if(typeof VideoFrame<"u"&&M instanceof VideoFrame)U.width=M.displayWidth,U.height=M.displayHeight;else U.width=M.width,U.height=M.height;return U}this.allocateTextureUnit=u,this.resetTextureUnits=a,this.getTextureUnits=p,this.setTextureUnits=n,this.setTexture2D=o,this.setTexture2DArray=r,this.setTexture3D=W0,this.setTextureCube=L0,this.rebindTextures=m0,this.setupRenderTarget=BJ,this.updateRenderTargetMipmap=cJ,this.updateMultisampleRenderTarget=zJ,this.setupDepthRenderbuffer=u0,this.setupFrameBufferTexture=g0,this.useMultisampledRTT=j,this.isReversedDepthBuffer=function(){return $.buffers.depth.getReversed()}}function DE(J,Q){function $(Z,W=R8){let H,K=b0.getTransfer(W);if(Z===X9)return J.UNSIGNED_BYTE;if(Z===dQ)return J.UNSIGNED_SHORT_4_4_4_4;if(Z===uQ)return J.UNSIGNED_SHORT_5_5_5_1;if(Z===iW)return J.UNSIGNED_INT_5_9_9_9_REV;if(Z===oW)return J.UNSIGNED_INT_10F_11F_11F_REV;if(Z===nW)return J.BYTE;if(Z===sW)return J.SHORT;if(Z===_7)return J.UNSIGNED_SHORT;if(Z===mQ)return J.INT;if(Z===s9)return J.UNSIGNED_INT;if(Z===j9)return J.FLOAT;if(Z===v9)return J.HALF_FLOAT;if(Z===aW)return J.ALPHA;if(Z===rW)return J.RGB;if(Z===k9)return J.RGBA;if(Z===N8)return J.DEPTH_COMPONENT;if(Z===F8)return J.DEPTH_STENCIL;if(Z===tW)return J.RED;if(Z===cQ)return J.RED_INTEGER;if(Z===O8)return J.RG;if(Z===nQ)return J.RG_INTEGER;if(Z===sQ)return J.RGBA_INTEGER;if(Z===B6||Z===z6||Z===_6||Z===C6)if(K===$J)if(H=Q.get("WEBGL_compressed_texture_s3tc_srgb"),H!==null){if(Z===B6)return H.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(Z===z6)return H.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(Z===_6)return H.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(Z===C6)return H.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(H=Q.get("WEBGL_compressed_texture_s3tc"),H!==null){if(Z===B6)return H.COMPRESSED_RGB_S3TC_DXT1_EXT;if(Z===z6)return H.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(Z===_6)return H.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(Z===C6)return H.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(Z===iQ||Z===oQ||Z===aQ||Z===rQ)if(H=Q.get("WEBGL_compressed_texture_pvrtc"),H!==null){if(Z===iQ)return H.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(Z===oQ)return H.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(Z===aQ)return H.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(Z===rQ)return H.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(Z===tQ||Z===eQ||Z===J$||Z===Q$||Z===$$||Z===P6||Z===Z$)if(H=Q.get("WEBGL_compressed_texture_etc"),H!==null){if(Z===tQ||Z===eQ)return K===$J?H.COMPRESSED_SRGB8_ETC2:H.COMPRESSED_RGB8_ETC2;if(Z===J$)return K===$J?H.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:H.COMPRESSED_RGBA8_ETC2_EAC;if(Z===Q$)return H.COMPRESSED_R11_EAC;if(Z===$$)return H.COMPRESSED_SIGNED_R11_EAC;if(Z===P6)return H.COMPRESSED_RG11_EAC;if(Z===Z$)return H.COMPRESSED_SIGNED_RG11_EAC}else return null;if(Z===W$||Z===H$||Z===K$||Z===Y$||Z===X$||Z===U$||Z===G$||Z===E$||Z===q$||Z===N$||Z===F$||Z===O$||Z===R$||Z===k$)if(H=Q.get("WEBGL_compressed_texture_astc"),H!==null){if(Z===W$)return K===$J?H.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:H.COMPRESSED_RGBA_ASTC_4x4_KHR;if(Z===H$)return K===$J?H.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:H.COMPRESSED_RGBA_ASTC_5x4_KHR;if(Z===K$)return K===$J?H.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:H.COMPRESSED_RGBA_ASTC_5x5_KHR;if(Z===Y$)return K===$J?H.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:H.COMPRESSED_RGBA_ASTC_6x5_KHR;if(Z===X$)return K===$J?H.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:H.COMPRESSED_RGBA_ASTC_6x6_KHR;if(Z===U$)return K===$J?H.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:H.COMPRESSED_RGBA_ASTC_8x5_KHR;if(Z===G$)return K===$J?H.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:H.COMPRESSED_RGBA_ASTC_8x6_KHR;if(Z===E$)return K===$J?H.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:H.COMPRESSED_RGBA_ASTC_8x8_KHR;if(Z===q$)return K===$J?H.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:H.COMPRESSED_RGBA_ASTC_10x5_KHR;if(Z===N$)return K===$J?H.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:H.COMPRESSED_RGBA_ASTC_10x6_KHR;if(Z===F$)return K===$J?H.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:H.COMPRESSED_RGBA_ASTC_10x8_KHR;if(Z===O$)return K===$J?H.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:H.COMPRESSED_RGBA_ASTC_10x10_KHR;if(Z===R$)return K===$J?H.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:H.COMPRESSED_RGBA_ASTC_12x10_KHR;if(Z===k$)return K===$J?H.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:H.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(Z===L$||Z===D$||Z===V$)if(H=Q.get("EXT_texture_compression_bptc"),H!==null){if(Z===L$)return K===$J?H.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:H.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(Z===D$)return H.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(Z===V$)return H.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(Z===M$||Z===B$||Z===I6||Z===z$)if(H=Q.get("EXT_texture_compression_rgtc"),H!==null){if(Z===M$)return H.COMPRESSED_RED_RGTC1_EXT;if(Z===B$)return H.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(Z===I6)return H.COMPRESSED_RED_GREEN_RGTC2_EXT;if(Z===z$)return H.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;if(Z===a8)return J.UNSIGNED_INT_24_8;return J[Z]!==void 0?J[Z]:null}return{convert:$}}var VE=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ME=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class rH{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(J,Q){if(this.texture===null){let $=new l6(J.texture);if(J.depthNear!==Q.depthNear||J.depthFar!==Q.depthFar)this.depthNear=J.depthNear,this.depthFar=J.depthFar;this.texture=$}}getMesh(J){if(this.texture!==null){if(this.mesh===null){let Q=J.cameras[0].viewport,$=new eJ({vertexShader:VE,fragmentShader:ME,uniforms:{depthColor:{value:this.texture},depthWidth:{value:Q.z},depthHeight:{value:Q.w}}});this.mesh=new YJ(new k8(20,20),$)}}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class tH extends D9{constructor(J,Q){super();let $=this,Z=null,W=1,H=null,K="local-floor",Y=1,X=null,U=null,G=null,q=null,E=null,F=null,k=typeof XRWebGLBinding<"u",B=new rH,O={},N=Q.getContextAttributes(),_=null,C=null,D=[],P=[],I=new y0,w=null,L=new LJ;L.viewport=new a0;let z=new LJ;z.viewport=new a0;let g=[L,z],A=new i$,m=null,a=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(i){let Z0=D[i];if(Z0===void 0)Z0=new I7,D[i]=Z0;return Z0.getTargetRaySpace()},this.getControllerGrip=function(i){let Z0=D[i];if(Z0===void 0)Z0=new I7,D[i]=Z0;return Z0.getGripSpace()},this.getHand=function(i){let Z0=D[i];if(Z0===void 0)Z0=new I7,D[i]=Z0;return Z0.getHandSpace()};function p(i){let Z0=P.indexOf(i.inputSource);if(Z0===-1)return;let O0=D[Z0];if(O0!==void 0)O0.update(i.inputSource,i.frame,X||H),O0.dispatchEvent({type:i.type,data:i.inputSource})}function n(){Z.removeEventListener("select",p),Z.removeEventListener("selectstart",p),Z.removeEventListener("selectend",p),Z.removeEventListener("squeeze",p),Z.removeEventListener("squeezestart",p),Z.removeEventListener("squeezeend",p),Z.removeEventListener("end",n),Z.removeEventListener("inputsourceschange",u);for(let i=0;i<D.length;i++){let Z0=P[i];if(Z0===null)continue;P[i]=null,D[i].disconnect(Z0)}m=null,a=null,B.reset();for(let i in O)delete O[i];J.setRenderTarget(_),E=null,q=null,G=null,Z=null,C=null,e0.stop(),$.isPresenting=!1,J.setPixelRatio(w),J.setSize(I.width,I.height,!1),$.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(i){if(W=i,$.isPresenting===!0)M0("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(i){if(K=i,$.isPresenting===!0)M0("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return X||H},this.setReferenceSpace=function(i){X=i},this.getBaseLayer=function(){return q!==null?q:E},this.getBinding=function(){if(G===null&&k)G=new XRWebGLBinding(Z,Q);return G},this.getFrame=function(){return F},this.getSession=function(){return Z},this.setSession=async function(i){if(Z=i,Z!==null){if(_=J.getRenderTarget(),Z.addEventListener("select",p),Z.addEventListener("selectstart",p),Z.addEventListener("selectend",p),Z.addEventListener("squeeze",p),Z.addEventListener("squeezestart",p),Z.addEventListener("squeezeend",p),Z.addEventListener("end",n),Z.addEventListener("inputsourceschange",u),N.xrCompatible!==!0)await Q.makeXRCompatible();if(w=J.getPixelRatio(),J.getSize(I),!(k&&("createProjectionLayer"in XRWebGLBinding.prototype))){let O0={antialias:N.antialias,alpha:!0,depth:N.depth,stencil:N.stencil,framebufferScaleFactor:W};E=new XRWebGLLayer(Z,Q,O0),Z.updateRenderState({baseLayer:E}),J.setPixelRatio(1),J.setSize(E.framebufferWidth,E.framebufferHeight,!1),C=new rJ(E.framebufferWidth,E.framebufferHeight,{format:k9,type:X9,colorSpace:J.outputColorSpace,stencilBuffer:N.stencil,resolveDepthBuffer:E.ignoreDepthValues===!1,resolveStencilBuffer:E.ignoreDepthValues===!1})}else{let O0=null,R0=null,w0=null;if(N.depth)w0=N.stencil?Q.DEPTH24_STENCIL8:Q.DEPTH_COMPONENT24,O0=N.stencil?F8:N8,R0=N.stencil?a8:s9;let d0={colorFormat:Q.RGBA8,depthFormat:w0,scaleFactor:W};G=this.getBinding(),q=G.createProjectionLayer(d0),Z.updateRenderState({layers:[q]}),J.setPixelRatio(1),J.setSize(q.textureWidth,q.textureHeight,!1),C=new rJ(q.textureWidth,q.textureHeight,{format:k9,type:X9,depthTexture:new i9(q.textureWidth,q.textureHeight,R0,void 0,void 0,void 0,void 0,void 0,void 0,O0),stencilBuffer:N.stencil,colorSpace:J.outputColorSpace,samples:N.antialias?4:0,resolveDepthBuffer:q.ignoreDepthValues===!1,resolveStencilBuffer:q.ignoreDepthValues===!1})}C.isXRRenderTarget=!0,this.setFoveation(Y),X=null,H=await Z.requestReferenceSpace(K),e0.setContext(Z),e0.start(),$.isPresenting=!0,$.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(Z!==null)return Z.environmentBlendMode},this.getDepthTexture=function(){return B.getDepthTexture()};function u(i){for(let Z0=0;Z0<i.removed.length;Z0++){let O0=i.removed[Z0],R0=P.indexOf(O0);if(R0>=0)P[R0]=null,D[R0].disconnect(O0)}for(let Z0=0;Z0<i.added.length;Z0++){let O0=i.added[Z0],R0=P.indexOf(O0);if(R0===-1){for(let d0=0;d0<D.length;d0++)if(d0>=P.length){P.push(O0),R0=d0;break}else if(P[d0]===null){P[d0]=O0,R0=d0;break}if(R0===-1)break}let w0=D[R0];if(w0)w0.connect(O0)}}let h=new y,o=new y;function r(i,Z0,O0){h.setFromMatrixPosition(Z0.matrixWorld),o.setFromMatrixPosition(O0.matrixWorld);let R0=h.distanceTo(o),w0=Z0.projectionMatrix.elements,d0=O0.projectionMatrix.elements,g0=w0[14]/(w0[10]-1),l0=w0[14]/(w0[10]+1),WJ=(w0[9]+1)/w0[5],u0=(w0[9]-1)/w0[5],m0=(w0[8]-1)/w0[0],BJ=(d0[8]+1)/d0[0],cJ=g0*m0,XJ=g0*BJ,PJ=R0/(-m0+BJ),zJ=PJ*-m0;if(Z0.matrixWorld.decompose(i.position,i.quaternion,i.scale),i.translateX(zJ),i.translateZ(PJ),i.matrixWorld.compose(i.position,i.quaternion,i.scale),i.matrixWorldInverse.copy(i.matrixWorld).invert(),w0[10]===-1)i.projectionMatrix.copy(Z0.projectionMatrix),i.projectionMatrixInverse.copy(Z0.projectionMatrixInverse);else{let kJ=g0+PJ,j=l0+PJ,nJ=cJ-zJ,i0=XJ+(R0-zJ),UJ=WJ*l0/j*kJ,M=u0*l0/j*kJ;i.projectionMatrix.makePerspective(nJ,i0,UJ,M,kJ,j),i.projectionMatrixInverse.copy(i.projectionMatrix).invert()}}function W0(i,Z0){if(Z0===null)i.matrixWorld.copy(i.matrix);else i.matrixWorld.multiplyMatrices(Z0.matrixWorld,i.matrix);i.matrixWorldInverse.copy(i.matrixWorld).invert()}this.updateCamera=function(i){if(Z===null)return;let{near:Z0,far:O0}=i;if(B.texture!==null){if(B.depthNear>0)Z0=B.depthNear;if(B.depthFar>0)O0=B.depthFar}if(A.near=z.near=L.near=Z0,A.far=z.far=L.far=O0,m!==A.near||a!==A.far)Z.updateRenderState({depthNear:A.near,depthFar:A.far}),m=A.near,a=A.far;A.layers.mask=i.layers.mask|6,L.layers.mask=A.layers.mask&-5,z.layers.mask=A.layers.mask&-3;let R0=i.parent,w0=A.cameras;W0(A,R0);for(let d0=0;d0<w0.length;d0++)W0(w0[d0],R0);if(w0.length===2)r(A,L,z);else A.projectionMatrix.copy(L.projectionMatrix);L0(i,A,R0)};function L0(i,Z0,O0){if(O0===null)i.matrix.copy(Z0.matrixWorld);else i.matrix.copy(O0.matrixWorld),i.matrix.invert(),i.matrix.multiply(Z0.matrixWorld);if(i.matrix.decompose(i.position,i.quaternion,i.scale),i.updateMatrixWorld(!0),i.projectionMatrix.copy(Z0.projectionMatrix),i.projectionMatrixInverse.copy(Z0.projectionMatrixInverse),i.isPerspectiveCamera)i.fov=U8*2*Math.atan(1/i.projectionMatrix.elements[5]),i.zoom=1}this.getCamera=function(){return A},this.getFoveation=function(){if(q===null&&E===null)return;return Y},this.setFoveation=function(i){if(Y=i,q!==null)q.fixedFoveation=i;if(E!==null&&E.fixedFoveation!==void 0)E.fixedFoveation=i},this.hasDepthSensing=function(){return B.texture!==null},this.getDepthSensingMesh=function(){return B.getMesh(A)},this.getCameraTexture=function(i){return O[i]};let E0=null;function ZJ(i,Z0){if(U=Z0.getViewerPose(X||H),F=Z0,U!==null){let O0=U.views;if(E!==null)J.setRenderTargetFramebuffer(C,E.framebuffer),J.setRenderTarget(C);let R0=!1;if(O0.length!==A.cameras.length)A.cameras.length=0,R0=!0;for(let l0=0;l0<O0.length;l0++){let WJ=O0[l0],u0=null;if(E!==null)u0=E.getViewport(WJ);else{let BJ=G.getViewSubImage(q,WJ);if(u0=BJ.viewport,l0===0)J.setRenderTargetTextures(C,BJ.colorTexture,BJ.depthStencilTexture),J.setRenderTarget(C)}let m0=g[l0];if(m0===void 0)m0=new LJ,m0.layers.enable(l0),m0.viewport=new a0,g[l0]=m0;if(m0.matrix.fromArray(WJ.transform.matrix),m0.matrix.decompose(m0.position,m0.quaternion,m0.scale),m0.projectionMatrix.fromArray(WJ.projectionMatrix),m0.projectionMatrixInverse.copy(m0.projectionMatrix).invert(),m0.viewport.set(u0.x,u0.y,u0.width,u0.height),l0===0)A.matrix.copy(m0.matrix),A.matrix.decompose(A.position,A.quaternion,A.scale);if(R0===!0)A.cameras.push(m0)}let w0=Z.enabledFeatures;if(w0&&w0.includes("depth-sensing")&&Z.depthUsage=="gpu-optimized"&&k){G=$.getBinding();let l0=G.getDepthInformation(O0[0]);if(l0&&l0.isValid&&l0.texture)B.init(l0,Z.renderState)}if(w0&&w0.includes("camera-access")&&k){J.state.unbindTexture(),G=$.getBinding();for(let l0=0;l0<O0.length;l0++){let WJ=O0[l0].camera;if(WJ){let u0=O[WJ];if(!u0)u0=new l6,O[WJ]=u0;let m0=G.getCameraImage(WJ);u0.sourceTexture=m0}}}}for(let O0=0;O0<D.length;O0++){let R0=P[O0],w0=D[O0];if(R0!==null&&w0!==void 0)w0.update(R0,Z0,X||H)}if(E0)E0(i,Z0);if(Z0.detectedPlanes)$.dispatchEvent({type:"planesdetected",data:Z0});F=null}let e0=new pH;e0.setAnimationLoop(ZJ),this.setAnimationLoop=function(i){E0=i},this.dispose=function(){}}}var BE=new j0,eH=new T0;eH.set(-1,0,0,0,1,0,0,0,1);function zE(J,Q){function $(O,N){if(O.matrixAutoUpdate===!0)O.updateMatrix();N.value.copy(O.matrix)}function Z(O,N){if(N.color.getRGB(O.fogColor.value,b$(J)),N.isFog)O.fogNear.value=N.near,O.fogFar.value=N.far;else if(N.isFogExp2)O.fogDensity.value=N.density}function W(O,N,_,C,D){if(N.isNodeMaterial)N.uniformsNeedUpdate=!1;else if(N.isMeshBasicMaterial)H(O,N);else if(N.isMeshLambertMaterial){if(H(O,N),N.envMap)O.envMapIntensity.value=N.envMapIntensity}else if(N.isMeshToonMaterial)H(O,N),q(O,N);else if(N.isMeshPhongMaterial){if(H(O,N),G(O,N),N.envMap)O.envMapIntensity.value=N.envMapIntensity}else if(N.isMeshStandardMaterial){if(H(O,N),E(O,N),N.isMeshPhysicalMaterial)F(O,N,D)}else if(N.isMeshMatcapMaterial)H(O,N),k(O,N);else if(N.isMeshDepthMaterial)H(O,N);else if(N.isMeshDistanceMaterial)H(O,N),B(O,N);else if(N.isMeshNormalMaterial)H(O,N);else if(N.isLineBasicMaterial){if(K(O,N),N.isLineDashedMaterial)Y(O,N)}else if(N.isPointsMaterial)X(O,N,_,C);else if(N.isSpriteMaterial)U(O,N);else if(N.isShadowMaterial)O.color.value.copy(N.color),O.opacity.value=N.opacity;else if(N.isShaderMaterial)N.uniformsNeedUpdate=!1}function H(O,N){if(O.opacity.value=N.opacity,N.color)O.diffuse.value.copy(N.color);if(N.emissive)O.emissive.value.copy(N.emissive).multiplyScalar(N.emissiveIntensity);if(N.map)O.map.value=N.map,$(N.map,O.mapTransform);if(N.alphaMap)O.alphaMap.value=N.alphaMap,$(N.alphaMap,O.alphaMapTransform);if(N.bumpMap){if(O.bumpMap.value=N.bumpMap,$(N.bumpMap,O.bumpMapTransform),O.bumpScale.value=N.bumpScale,N.side===TJ)O.bumpScale.value*=-1}if(N.normalMap){if(O.normalMap.value=N.normalMap,$(N.normalMap,O.normalMapTransform),O.normalScale.value.copy(N.normalScale),N.side===TJ)O.normalScale.value.negate()}if(N.displacementMap)O.displacementMap.value=N.displacementMap,$(N.displacementMap,O.displacementMapTransform),O.displacementScale.value=N.displacementScale,O.displacementBias.value=N.displacementBias;if(N.emissiveMap)O.emissiveMap.value=N.emissiveMap,$(N.emissiveMap,O.emissiveMapTransform);if(N.specularMap)O.specularMap.value=N.specularMap,$(N.specularMap,O.specularMapTransform);if(N.alphaTest>0)O.alphaTest.value=N.alphaTest;let _=Q.get(N),C=_.envMap,D=_.envMapRotation;if(C){if(O.envMap.value=C,O.envMapRotation.value.setFromMatrix4(BE.makeRotationFromEuler(D)).transpose(),C.isCubeTexture&&C.isRenderTargetTexture===!1)O.envMapRotation.value.premultiply(eH);O.reflectivity.value=N.reflectivity,O.ior.value=N.ior,O.refractionRatio.value=N.refractionRatio}if(N.lightMap)O.lightMap.value=N.lightMap,O.lightMapIntensity.value=N.lightMapIntensity,$(N.lightMap,O.lightMapTransform);if(N.aoMap)O.aoMap.value=N.aoMap,O.aoMapIntensity.value=N.aoMapIntensity,$(N.aoMap,O.aoMapTransform)}function K(O,N){if(O.diffuse.value.copy(N.color),O.opacity.value=N.opacity,N.map)O.map.value=N.map,$(N.map,O.mapTransform)}function Y(O,N){O.dashSize.value=N.dashSize,O.totalSize.value=N.dashSize+N.gapSize,O.scale.value=N.scale}function X(O,N,_,C){if(O.diffuse.value.copy(N.color),O.opacity.value=N.opacity,O.size.value=N.size*_,O.scale.value=C*0.5,N.map)O.map.value=N.map,$(N.map,O.uvTransform);if(N.alphaMap)O.alphaMap.value=N.alphaMap,$(N.alphaMap,O.alphaMapTransform);if(N.alphaTest>0)O.alphaTest.value=N.alphaTest}function U(O,N){if(O.diffuse.value.copy(N.color),O.opacity.value=N.opacity,O.rotation.value=N.rotation,N.map)O.map.value=N.map,$(N.map,O.mapTransform);if(N.alphaMap)O.alphaMap.value=N.alphaMap,$(N.alphaMap,O.alphaMapTransform);if(N.alphaTest>0)O.alphaTest.value=N.alphaTest}function G(O,N){O.specular.value.copy(N.specular),O.shininess.value=Math.max(N.shininess,0.0001)}function q(O,N){if(N.gradientMap)O.gradientMap.value=N.gradientMap}function E(O,N){if(O.metalness.value=N.metalness,N.metalnessMap)O.metalnessMap.value=N.metalnessMap,$(N.metalnessMap,O.metalnessMapTransform);if(O.roughness.value=N.roughness,N.roughnessMap)O.roughnessMap.value=N.roughnessMap,$(N.roughnessMap,O.roughnessMapTransform);if(N.envMap)O.envMapIntensity.value=N.envMapIntensity}function F(O,N,_){if(O.ior.value=N.ior,N.sheen>0){if(O.sheenColor.value.copy(N.sheenColor).multiplyScalar(N.sheen),O.sheenRoughness.value=N.sheenRoughness,N.sheenColorMap)O.sheenColorMap.value=N.sheenColorMap,$(N.sheenColorMap,O.sheenColorMapTransform);if(N.sheenRoughnessMap)O.sheenRoughnessMap.value=N.sheenRoughnessMap,$(N.sheenRoughnessMap,O.sheenRoughnessMapTransform)}if(N.clearcoat>0){if(O.clearcoat.value=N.clearcoat,O.clearcoatRoughness.value=N.clearcoatRoughness,N.clearcoatMap)O.clearcoatMap.value=N.clearcoatMap,$(N.clearcoatMap,O.clearcoatMapTransform);if(N.clearcoatRoughnessMap)O.clearcoatRoughnessMap.value=N.clearcoatRoughnessMap,$(N.clearcoatRoughnessMap,O.clearcoatRoughnessMapTransform);if(N.clearcoatNormalMap){if(O.clearcoatNormalMap.value=N.clearcoatNormalMap,$(N.clearcoatNormalMap,O.clearcoatNormalMapTransform),O.clearcoatNormalScale.value.copy(N.clearcoatNormalScale),N.side===TJ)O.clearcoatNormalScale.value.negate()}}if(N.dispersion>0)O.dispersion.value=N.dispersion;if(N.iridescence>0){if(O.iridescence.value=N.iridescence,O.iridescenceIOR.value=N.iridescenceIOR,O.iridescenceThicknessMinimum.value=N.iridescenceThicknessRange[0],O.iridescenceThicknessMaximum.value=N.iridescenceThicknessRange[1],N.iridescenceMap)O.iridescenceMap.value=N.iridescenceMap,$(N.iridescenceMap,O.iridescenceMapTransform);if(N.iridescenceThicknessMap)O.iridescenceThicknessMap.value=N.iridescenceThicknessMap,$(N.iridescenceThicknessMap,O.iridescenceThicknessMapTransform)}if(N.transmission>0){if(O.transmission.value=N.transmission,O.transmissionSamplerMap.value=_.texture,O.transmissionSamplerSize.value.set(_.width,_.height),N.transmissionMap)O.transmissionMap.value=N.transmissionMap,$(N.transmissionMap,O.transmissionMapTransform);if(O.thickness.value=N.thickness,N.thicknessMap)O.thicknessMap.value=N.thicknessMap,$(N.thicknessMap,O.thicknessMapTransform);O.attenuationDistance.value=N.attenuationDistance,O.attenuationColor.value.copy(N.attenuationColor)}if(N.anisotropy>0){if(O.anisotropyVector.value.set(N.anisotropy*Math.cos(N.anisotropyRotation),N.anisotropy*Math.sin(N.anisotropyRotation)),N.anisotropyMap)O.anisotropyMap.value=N.anisotropyMap,$(N.anisotropyMap,O.anisotropyMapTransform)}if(O.specularIntensity.value=N.specularIntensity,O.specularColor.value.copy(N.specularColor),N.specularColorMap)O.specularColorMap.value=N.specularColorMap,$(N.specularColorMap,O.specularColorMapTransform);if(N.specularIntensityMap)O.specularIntensityMap.value=N.specularIntensityMap,$(N.specularIntensityMap,O.specularIntensityMapTransform)}function k(O,N){if(N.matcap)O.matcap.value=N.matcap}function B(O,N){let _=Q.get(N).light;O.referencePosition.value.setFromMatrixPosition(_.matrixWorld),O.nearDistance.value=_.shadow.camera.near,O.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:Z,refreshMaterialUniforms:W}}function _E(J,Q,$,Z){let W={},H={},K=[],Y=J.getParameter(J.MAX_UNIFORM_BUFFER_BINDINGS);function X(D,P){let I=P.program;Z.uniformBlockBinding(D,I)}function U(D,P){let I=W[D.id];if(I===void 0)O(D),I=G(D),W[D.id]=I,D.addEventListener("dispose",_);let w=P.program;Z.updateUBOMapping(D,w);let L=Q.render.frame;if(H[D.id]!==L)E(D),H[D.id]=L}function G(D){let P=q();D.__bindingPointIndex=P;let I=J.createBuffer(),w=D.__size,L=D.usage;return J.bindBuffer(J.UNIFORM_BUFFER,I),J.bufferData(J.UNIFORM_BUFFER,w,L),J.bindBuffer(J.UNIFORM_BUFFER,null),J.bindBufferBase(J.UNIFORM_BUFFER,P,I),I}function q(){for(let D=0;D<Y;D++)if(K.indexOf(D)===-1)return K.push(D),D;return A0("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function E(D){let P=W[D.id],I=D.uniforms,w=D.__cache;J.bindBuffer(J.UNIFORM_BUFFER,P);for(let L=0,z=I.length;L<z;L++){let g=I[L];if(Array.isArray(g))for(let A=0,m=g.length;A<m;A++)F(g[A],L,A,w);else F(g,L,0,w)}J.bindBuffer(J.UNIFORM_BUFFER,null)}function F(D,P,I,w){if(B(D,P,I,w)===!0){let{__offset:L,value:z}=D;if(Array.isArray(z)){let g=0;for(let A=0;A<z.length;A++){let m=z[A],a=N(m);if(k(m,D.__data,g),typeof m!=="number"&&typeof m!=="boolean"&&!m.isMatrix3&&!ArrayBuffer.isView(m))g+=a.storage/Float32Array.BYTES_PER_ELEMENT}}else k(z,D.__data,0);J.bufferSubData(J.UNIFORM_BUFFER,L,D.__data)}}function k(D,P,I){if(typeof D==="number"||typeof D==="boolean")P[0]=D;else if(D.isMatrix3)P[0]=D.elements[0],P[1]=D.elements[1],P[2]=D.elements[2],P[3]=0,P[4]=D.elements[3],P[5]=D.elements[4],P[6]=D.elements[5],P[7]=0,P[8]=D.elements[6],P[9]=D.elements[7],P[10]=D.elements[8],P[11]=0;else if(ArrayBuffer.isView(D))P.set(new D.constructor(D.buffer,D.byteOffset,P.length));else D.toArray(P,I)}function B(D,P,I,w){let L=D.value,z=P+"_"+I;if(w[z]===void 0){if(typeof L==="number"||typeof L==="boolean")w[z]=L;else if(ArrayBuffer.isView(L))w[z]=L.slice();else w[z]=L.clone();return!0}else{let g=w[z];if(typeof L==="number"||typeof L==="boolean"){if(g!==L)return w[z]=L,!0}else if(ArrayBuffer.isView(L))return!0;else if(g.equals(L)===!1)return g.copy(L),!0}return!1}function O(D){let P=D.uniforms,I=0,w=16;for(let z=0,g=P.length;z<g;z++){let A=Array.isArray(P[z])?P[z]:[P[z]];for(let m=0,a=A.length;m<a;m++){let p=A[m],n=Array.isArray(p.value)?p.value:[p.value];for(let u=0,h=n.length;u<h;u++){let o=n[u],r=N(o),W0=I%w,L0=W0%r.boundary,E0=W0+L0;if(I+=L0,E0!==0&&w-E0<r.storage)I+=w-E0;p.__data=new Float32Array(r.storage/Float32Array.BYTES_PER_ELEMENT),p.__offset=I,I+=r.storage}}}let L=I%w;if(L>0)I+=w-L;return D.__size=I,D.__cache={},this}function N(D){let P={boundary:0,storage:0};if(typeof D==="number"||typeof D==="boolean")P.boundary=4,P.storage=4;else if(D.isVector2)P.boundary=8,P.storage=8;else if(D.isVector3||D.isColor)P.boundary=16,P.storage=12;else if(D.isVector4)P.boundary=16,P.storage=16;else if(D.isMatrix3)P.boundary=48,P.storage=48;else if(D.isMatrix4)P.boundary=64,P.storage=64;else if(D.isTexture)M0("WebGLRenderer: Texture samplers can not be part of an uniforms group.");else if(ArrayBuffer.isView(D))P.boundary=16,P.storage=D.byteLength;else M0("WebGLRenderer: Unsupported uniform value type.",D);return P}function _(D){let P=D.target;P.removeEventListener("dispose",_);let I=K.indexOf(P.__bindingPointIndex);K.splice(I,1),J.deleteBuffer(W[P.id]),delete W[P.id],delete H[P.id]}function C(){for(let D in W)J.deleteBuffer(W[D]);K=[],W={},H={}}return{bind:X,update:U,dispose:C}}var CE=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),V9=null;function PE(){if(V9===null)V9=new T7(CE,16,16,O8,v9),V9.name="DFG_LUT",V9.minFilter=CJ,V9.magFilter=CJ,V9.wrapS=i8,V9.wrapT=i8,V9.generateMipmaps=!1,V9.needsUpdate=!0;return V9}class GZ{constructor(J={}){let{canvas:Q=KH(),context:$=null,depth:Z=!0,stencil:W=!1,alpha:H=!1,antialias:K=!1,premultipliedAlpha:Y=!0,preserveDrawingBuffer:X=!1,powerPreference:U="default",failIfMajorPerformanceCaveat:G=!1,reversedDepthBuffer:q=!1,outputBufferType:E=X9}=J;this.isWebGLRenderer=!0;let F;if($!==null){if(typeof WebGLRenderingContext<"u"&&$ instanceof WebGLRenderingContext)throw Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");F=$.getContextAttributes().alpha}else F=H;let k=E,B=new Set([sQ,nQ,cQ]),O=new Set([X9,s9,_7,a8,dQ,uQ]),N=new Uint32Array(4),_=new Int32Array(4),C=new y,D=null,P=null,I=[],w=[],L=null;this.domElement=Q,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=K9,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let z=this,g=!1,A=null,m=null,a=null,p=null;this._outputColorSpace=L9;let n=0,u=0,h=null,o=-1,r=null,W0=new a0,L0=new a0,E0=null,ZJ=new I0(0),e0=0,i=Q.width,Z0=Q.height,O0=1,R0=null,w0=null,d0=new a0(0,0,i,Z0),g0=new a0(0,0,i,Z0),l0=!1,WJ=new j7,u0=!1,m0=!1,BJ=new j0,cJ=new y,XJ=new a0,PJ={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},zJ=!1;function kJ(){return h===null?O0:1}let j=$;function nJ(V,v){return Q.getContext(V,v)}try{let V={alpha:!0,depth:Z,stencil:W,antialias:K,premultipliedAlpha:Y,preserveDrawingBuffer:X,powerPreference:U,failIfMajorPerformanceCaveat:G};if("setAttribute"in Q)Q.setAttribute("data-engine",`three.js r${qW}`);if(Q.addEventListener("webglcontextlost",S0,!1),Q.addEventListener("webglcontextrestored",GJ,!1),Q.addEventListener("webglcontextcreationerror",HJ,!1),j===null){if(j=nJ("webgl2",V),j===null)if(nJ("webgl2"))throw Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.");else throw Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(V){throw A0("WebGLRenderer: "+V.message),V}let i0,UJ,M,R,T,l,e,J0,Y0,d,s,N0,B0,X0,Q0,C0,P0,n0,S,$0,c,H0,F0;function t(){if(i0=new vG(j),i0.init(),c=new DE(j,i0),UJ=new CG(j,i0,J,c),M=new kE(j,i0),UJ.reversedDepthBuffer&&q)M.buffers.depth.setReversed(!0);m=j.createFramebuffer(),a=j.createFramebuffer(),p=j.createFramebuffer(),R=new fG(j),T=new ZE,l=new LE(j,i0,M,T,UJ,c,R),e=new jG(z),J0=new pY(j),H0=new zG(j,J0),Y0=new yG(j,J0,R,H0),d=new xG(j,Y0,J0,H0,R),n0=new bG(j,UJ,l),Q0=new PG(T),s=new $E(z,e,i0,UJ,H0,Q0),N0=new zE(z,T),B0=new HE,X0=new EE(i0),P0=new BG(z,e,M,d,F,Y),C0=new RE(z,d,UJ),F0=new _E(j,R,UJ,M),S=new _G(j,i0,R),$0=new hG(j,i0,R),R.programs=s.programs,z.capabilities=UJ,z.extensions=i0,z.properties=T,z.renderLists=B0,z.shadowMap=C0,z.state=M,z.info=R}if(t(),k!==X9)L=new pG(k,Q.width,Q.height,K,Z,W);let K0=new tH(z,j);this.xr=K0,this.getContext=function(){return j},this.getContextAttributes=function(){return j.getContextAttributes()},this.forceContextLoss=function(){let V=i0.get("WEBGL_lose_context");if(V)V.loseContext()},this.forceContextRestore=function(){let V=i0.get("WEBGL_lose_context");if(V)V.restoreContext()},this.getPixelRatio=function(){return O0},this.setPixelRatio=function(V){if(V===void 0)return;O0=V,this.setSize(i,Z0,!1)},this.getSize=function(V){return V.set(i,Z0)},this.setSize=function(V,v,x=!0){if(K0.isPresenting){M0("WebGLRenderer: Can't change size while VR device is presenting.");return}if(i=V,Z0=v,Q.width=Math.floor(V*O0),Q.height=Math.floor(v*O0),x===!0)Q.style.width=V+"px",Q.style.height=v+"px";if(L!==null)L.setSize(Q.width,Q.height);this.setViewport(0,0,V,v)},this.getDrawingBufferSize=function(V){return V.set(i*O0,Z0*O0).floor()},this.setDrawingBufferSize=function(V,v,x){i=V,Z0=v,O0=x,Q.width=Math.floor(V*x),Q.height=Math.floor(v*x),this.setViewport(0,0,V,v)},this.setEffects=function(V){if(k===X9){A0("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(V){for(let v=0;v<V.length;v++)if(V[v].isOutputPass===!0){M0("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}L.setEffects(V||[])},this.getCurrentViewport=function(V){return V.copy(W0)},this.getViewport=function(V){return V.copy(d0)},this.setViewport=function(V,v,x,f){if(V.isVector4)d0.set(V.x,V.y,V.z,V.w);else d0.set(V,v,x,f);M.viewport(W0.copy(d0).multiplyScalar(O0).round())},this.getScissor=function(V){return V.copy(g0)},this.setScissor=function(V,v,x,f){if(V.isVector4)g0.set(V.x,V.y,V.z,V.w);else g0.set(V,v,x,f);M.scissor(L0.copy(g0).multiplyScalar(O0).round())},this.getScissorTest=function(){return l0},this.setScissorTest=function(V){M.setScissorTest(l0=V)},this.setOpaqueSort=function(V){R0=V},this.setTransparentSort=function(V){w0=V},this.getClearColor=function(V){return V.copy(P0.getClearColor())},this.setClearColor=function(){P0.setClearColor(...arguments)},this.getClearAlpha=function(){return P0.getClearAlpha()},this.setClearAlpha=function(){P0.setClearAlpha(...arguments)},this.clear=function(V=!0,v=!0,x=!0){let f=0;if(V){let b=!1;if(h!==null){let q0=h.texture.format;b=B.has(q0)}if(b){let q0=h.texture.type,D0=O.has(q0),G0=P0.getClearColor(),V0=P0.getClearAlpha(),z0=G0.r,v0=G0.g,f0=G0.b;if(D0)N[0]=z0,N[1]=v0,N[2]=f0,N[3]=V0,j.clearBufferuiv(j.COLOR,0,N);else _[0]=z0,_[1]=v0,_[2]=f0,_[3]=V0,j.clearBufferiv(j.COLOR,0,_)}else f|=j.COLOR_BUFFER_BIT}if(v)f|=j.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0);if(x)f|=j.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295);if(f!==0)j.clear(f)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(V){V.setRenderer(this),A=V},this.dispose=function(){Q.removeEventListener("webglcontextlost",S0,!1),Q.removeEventListener("webglcontextrestored",GJ,!1),Q.removeEventListener("webglcontextcreationerror",HJ,!1),P0.dispose(),B0.dispose(),X0.dispose(),T.dispose(),e.dispose(),d.dispose(),H0.dispose(),F0.dispose(),s.dispose(),K0.dispose(),K0.removeEventListener("sessionstart",BZ),K0.removeEventListener("sessionend",zZ),Z8.stop()};function S0(V){V.preventDefault(),D7("WebGLRenderer: Context Lost."),g=!0}function GJ(){D7("WebGLRenderer: Context Restored."),g=!1;let V=R.autoReset,v=C0.enabled,x=C0.autoUpdate,f=C0.needsUpdate,b=C0.type;t(),R.autoReset=V,C0.enabled=v,C0.autoUpdate=x,C0.needsUpdate=f,C0.type=b}function HJ(V){A0("WebGLRenderer: A WebGL context could not be created. Reason: ",V.statusMessage)}function U9(V){let v=V.target;v.removeEventListener("dispose",U9),z9(v)}function z9(V){jK(V),T.remove(V)}function jK(V){let v=T.get(V).programs;if(v!==void 0){if(v.forEach(function(x){s.releaseProgram(x)}),V.isShaderMaterial)s.releaseShaderCache(V)}}this.renderBufferDirect=function(V,v,x,f,b,q0){if(v===null)v=PJ;let D0=b.isMesh&&b.matrixWorld.determinantAffine()<0,G0=hK(V,v,x,f,b);M.setMaterial(f,D0);let V0=x.index,z0=1;if(f.wireframe===!0){if(V0=Y0.getWireframeAttribute(x),V0===void 0)return;z0=2}let v0=x.drawRange,f0=x.attributes.position,_0=v0.start*z0,r0=(v0.start+v0.count)*z0;if(q0!==null)_0=Math.max(_0,q0.start*z0),r0=Math.min(r0,(q0.start+q0.count)*z0);if(V0!==null)_0=Math.max(_0,0),r0=Math.min(r0,V0.count);else if(f0!==void 0&&f0!==null)_0=Math.max(_0,0),r0=Math.min(r0,f0.count);let qJ=r0-_0;if(qJ<0||qJ===1/0)return;H0.setup(b,f,G0,x,V0);let EJ,JJ=S;if(V0!==null)EJ=J0.get(V0),JJ=$0,JJ.setIndex(EJ);if(b.isMesh)if(f.wireframe===!0)M.setLineWidth(f.wireframeLinewidth*kJ()),JJ.setMode(j.LINES);else JJ.setMode(j.TRIANGLES);else if(b.isLine){let IJ=f.linewidth;if(IJ===void 0)IJ=1;if(M.setLineWidth(IJ*kJ()),b.isLineSegments)JJ.setMode(j.LINES);else if(b.isLineLoop)JJ.setMode(j.LINE_LOOP);else JJ.setMode(j.LINE_STRIP)}else if(b.isPoints)JJ.setMode(j.POINTS);else if(b.isSprite)JJ.setMode(j.TRIANGLES);if(b.isBatchedMesh)if(!i0.get("WEBGL_multi_draw")){let{_multiDrawStarts:IJ,_multiDrawCounts:k0,_multiDrawCount:bJ}=b,c0=V0?J0.get(V0).bytesPerElement:1,sJ=T.get(f).currentProgram.getUniforms();for(let G9=0;G9<bJ;G9++)sJ.setValue(j,"_gl_DrawID",G9),JJ.render(IJ[G9]/c0,k0[G9])}else JJ.renderMultiDraw(b._multiDrawStarts,b._multiDrawCounts,b._multiDrawCount);else if(b.isInstancedMesh)JJ.renderInstances(_0,qJ,b.count);else if(x.isInstancedBufferGeometry){let IJ=x._maxInstanceCount!==void 0?x._maxInstanceCount:1/0,k0=Math.min(x.instanceCount,IJ);JJ.renderInstances(_0,qJ,k0)}else JJ.render(_0,qJ)};function MZ(V,v,x){if(V.transparent===!0&&V.side===aJ&&V.forceSinglePass===!1)V.side=TJ,V.needsUpdate=!0,d7(V,v,x),V.side=n9,V.needsUpdate=!0,d7(V,v,x),V.side=aJ;else d7(V,v,x)}this.compile=function(V,v,x=null){if(x===null)x=V;if(P=X0.get(x),P.init(v),w.push(P),x.traverseVisible(function(b){if(b.isLight&&b.layers.test(v.layers)){if(P.pushLight(b),b.castShadow)P.pushShadow(b)}}),V!==x)V.traverseVisible(function(b){if(b.isLight&&b.layers.test(v.layers)){if(P.pushLight(b),b.castShadow)P.pushShadow(b)}});P.setupLights();let f=new Set;return V.traverse(function(b){if(!(b.isMesh||b.isPoints||b.isLine||b.isSprite))return;let q0=b.material;if(q0)if(Array.isArray(q0))for(let D0=0;D0<q0.length;D0++){let G0=q0[D0];MZ(G0,x,b),f.add(G0)}else MZ(q0,x,b),f.add(q0)}),P=w.pop(),f},this.compileAsync=function(V,v,x=null){let f=this.compile(V,v,x);return new Promise((b)=>{function q0(){if(f.forEach(function(D0){if(T.get(D0).currentProgram.isReady())f.delete(D0)}),f.size===0){b(V);return}setTimeout(q0,10)}if(i0.get("KHR_parallel_shader_compile")!==null)q0();else setTimeout(q0,10)})};let $Q=null;function vK(V){if($Q)$Q(V)}function BZ(){Z8.stop()}function zZ(){Z8.start()}let Z8=new pH;if(Z8.setAnimationLoop(vK),typeof self<"u")Z8.setContext(self);this.setAnimationLoop=function(V){$Q=V,K0.setAnimationLoop(V),V===null?Z8.stop():Z8.start()},K0.addEventListener("sessionstart",BZ),K0.addEventListener("sessionend",zZ),this.render=function(V,v){if(v!==void 0&&v.isCamera!==!0){A0("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(g===!0)return;if(A!==null)A.renderStart(V,v);let x=K0.enabled===!0&&K0.isPresenting===!0,f=L!==null&&(h===null||x)&&L.begin(z,h);if(V.matrixWorldAutoUpdate===!0)V.updateMatrixWorld();if(v.parent===null&&v.matrixWorldAutoUpdate===!0)v.updateMatrixWorld();if(K0.enabled===!0&&K0.isPresenting===!0&&(L===null||L.isCompositing()===!1)){if(K0.cameraAutoUpdate===!0)K0.updateCamera(v);v=K0.getCamera()}if(V.isScene===!0)V.onBeforeRender(z,V,v,h);if(P=X0.get(V,w.length),P.init(v),P.state.textureUnits=l.getTextureUnits(),w.push(P),BJ.multiplyMatrices(v.projectionMatrix,v.matrixWorldInverse),WJ.setFromProjectionMatrix(BJ,T$,v.reversedDepth),m0=this.localClippingEnabled,u0=Q0.init(this.clippingPlanes,m0),D=B0.get(V,I.length),D.init(),I.push(D),K0.enabled===!0&&K0.isPresenting===!0){let D0=z.xr.getDepthSensingMesh();if(D0!==null)ZQ(D0,v,-1/0,z.sortObjects)}if(ZQ(V,v,0,z.sortObjects),D.finish(),z.sortObjects===!0)D.sort(R0,w0,v.reversedDepth);if(zJ=K0.enabled===!1||K0.isPresenting===!1||K0.hasDepthSensing()===!1,zJ)P0.addToRenderList(D,V);if(this.info.render.frame++,this.info.autoReset===!0)this.info.reset();if(u0===!0)Q0.beginShadows();let b=P.state.shadowsArray;if(C0.render(b,V,v),u0===!0)Q0.endShadows();if((f&&L.hasRenderPass())===!1){let{opaque:D0,transmissive:G0}=D;if(P.setupLights(),v.isArrayCamera){let V0=v.cameras;if(G0.length>0)for(let z0=0,v0=V0.length;z0<v0;z0++){let f0=V0[z0];CZ(D0,G0,V,f0)}if(zJ)P0.render(V);for(let z0=0,v0=V0.length;z0<v0;z0++){let f0=V0[z0];_Z(D,V,f0,f0.viewport)}}else{if(G0.length>0)CZ(D0,G0,V,v);if(zJ)P0.render(V);_Z(D,V,v)}}if(h!==null&&u===0)l.updateMultisampleRenderTarget(h),l.updateRenderTargetMipmap(h);if(f)L.end(z);if(V.isScene===!0)V.onAfterRender(z,V,v);if(H0.resetDefaultState(),o=-1,r=null,w.pop(),w.length>0){if(P=w[w.length-1],l.setTextureUnits(P.state.textureUnits),u0===!0)Q0.setGlobalState(z.clippingPlanes,P.state.camera)}else P=null;if(I.pop(),I.length>0)D=I[I.length-1];else D=null;if(A!==null)A.renderEnd()};function ZQ(V,v,x,f){if(V.visible===!1)return;if(V.layers.test(v.layers)){if(V.isGroup)x=V.renderOrder;else if(V.isLOD){if(V.autoUpdate===!0)V.update(v)}else if(V.isLightProbeGrid)P.pushLightProbeGrid(V);else if(V.isLight){if(P.pushLight(V),V.castShadow)P.pushShadow(V)}else if(V.isSprite){if(!V.frustumCulled||WJ.intersectsSprite(V)){if(f)XJ.setFromMatrixPosition(V.matrixWorld).applyMatrix4(BJ);let D0=d.update(V),G0=V.material;if(G0.visible)D.push(V,D0,G0,x,XJ.z,null)}}else if(V.isMesh||V.isLine||V.isPoints){if(!V.frustumCulled||WJ.intersectsObject(V)){let D0=d.update(V),G0=V.material;if(f){if(V.boundingSphere!==void 0){if(V.boundingSphere===null)V.computeBoundingSphere();XJ.copy(V.boundingSphere.center)}else{if(D0.boundingSphere===null)D0.computeBoundingSphere();XJ.copy(D0.boundingSphere.center)}XJ.applyMatrix4(V.matrixWorld).applyMatrix4(BJ)}if(Array.isArray(G0)){let V0=D0.groups;for(let z0=0,v0=V0.length;z0<v0;z0++){let f0=V0[z0],_0=G0[f0.materialIndex];if(_0&&_0.visible)D.push(V,D0,_0,x,XJ.z,f0)}}else if(G0.visible)D.push(V,D0,G0,x,XJ.z,null)}}}let q0=V.children;for(let D0=0,G0=q0.length;D0<G0;D0++)ZQ(q0[D0],v,x,f)}function _Z(V,v,x,f){let{opaque:b,transmissive:q0,transparent:D0}=V;if(P.setupLightsView(x),u0===!0)Q0.setGlobalState(z.clippingPlanes,x);if(f)M.viewport(W0.copy(f));if(b.length>0)m7(b,v,x);if(q0.length>0)m7(q0,v,x);if(D0.length>0)m7(D0,v,x);M.buffers.depth.setTest(!0),M.buffers.depth.setMask(!0),M.buffers.color.setMask(!0),M.setPolygonOffset(!1)}function CZ(V,v,x,f){if((x.isScene===!0?x.overrideMaterial:null)!==null)return;if(P.state.transmissionRenderTarget[f.id]===void 0){let _0=i0.has("EXT_color_buffer_half_float")||i0.has("EXT_color_buffer_float");P.state.transmissionRenderTarget[f.id]=new rJ(1,1,{generateMipmaps:!0,type:_0?v9:X9,minFilter:R9,samples:Math.max(4,UJ.samples),stencilBuffer:W,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:b0.workingColorSpace})}let q0=P.state.transmissionRenderTarget[f.id],D0=f.viewport||W0;q0.setSize(D0.z*z.transmissionResolutionScale,D0.w*z.transmissionResolutionScale);let G0=z.getRenderTarget(),V0=z.getActiveCubeFace(),z0=z.getActiveMipmapLevel();if(z.setRenderTarget(q0),z.getClearColor(ZJ),e0=z.getClearAlpha(),e0<1)z.setClearColor(16777215,0.5);if(z.clear(),zJ)P0.render(x);let v0=z.toneMapping;z.toneMapping=K9;let f0=f.viewport;if(f.viewport!==void 0)f.viewport=void 0;if(P.setupLightsView(f),u0===!0)Q0.setGlobalState(z.clippingPlanes,f);if(m7(V,x,f),l.updateMultisampleRenderTarget(q0),l.updateRenderTargetMipmap(q0),i0.has("WEBGL_multisampled_render_to_texture")===!1){let _0=!1;for(let r0=0,qJ=v.length;r0<qJ;r0++){let EJ=v[r0],{object:JJ,geometry:IJ,material:k0,group:bJ}=EJ;if(k0.side===aJ&&JJ.layers.test(f.layers)){let c0=k0.side;k0.side=TJ,k0.needsUpdate=!0,PZ(JJ,x,f,IJ,k0,bJ),k0.side=c0,k0.needsUpdate=!0,_0=!0}}if(_0===!0)l.updateMultisampleRenderTarget(q0),l.updateRenderTargetMipmap(q0)}if(z.setRenderTarget(G0,V0,z0),z.setClearColor(ZJ,e0),f0!==void 0)f.viewport=f0;z.toneMapping=v0}function m7(V,v,x){let f=v.isScene===!0?v.overrideMaterial:null;for(let b=0,q0=V.length;b<q0;b++){let D0=V[b],{object:G0,geometry:V0,group:z0}=D0,v0=D0.material;if(v0.allowOverride===!0&&f!==null)v0=f;if(G0.layers.test(x.layers))PZ(G0,v,x,V0,v0,z0)}}function PZ(V,v,x,f,b,q0){if(V.onBeforeRender(z,v,x,f,b,q0),V.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,V.matrixWorld),V.normalMatrix.getNormalMatrix(V.modelViewMatrix),b.onBeforeRender(z,v,x,f,V,q0),b.transparent===!0&&b.side===aJ&&b.forceSinglePass===!1)b.side=TJ,b.needsUpdate=!0,z.renderBufferDirect(x,v,f,b,V,q0),b.side=n9,b.needsUpdate=!0,z.renderBufferDirect(x,v,f,b,V,q0),b.side=aJ;else z.renderBufferDirect(x,v,f,b,V,q0);V.onAfterRender(z,v,x,f,b,q0)}function d7(V,v,x){if(v.isScene!==!0)v=PJ;let f=T.get(V),b=P.state.lights,q0=P.state.shadowsArray,D0=b.state.version,G0=s.getParameters(V,b.state,q0,v,x,P.state.lightProbeGridArray),V0=s.getProgramCacheKey(G0),z0=f.programs;f.environment=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?v.environment:null,f.fog=v.fog;let v0=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap;if(f.envMap=e.get(V.envMap||f.environment,v0),f.envMapRotation=f.environment!==null&&V.envMap===null?v.environmentRotation:V.envMapRotation,z0===void 0)V.addEventListener("dispose",U9),z0=new Map,f.programs=z0;let f0=z0.get(V0);if(f0!==void 0){if(f.currentProgram===f0&&f.lightsStateVersion===D0)return wZ(V,G0),f0}else{if(G0.uniforms=s.getUniforms(V),A!==null&&V.isNodeMaterial)A.build(V,x,G0);V.onBeforeCompile(G0,z),f0=s.acquireProgram(G0,V0),z0.set(V0,f0),f.uniforms=G0.uniforms}let _0=f.uniforms;if(!V.isShaderMaterial&&!V.isRawShaderMaterial||V.clipping===!0)_0.clippingPlanes=Q0.uniform;if(wZ(V,G0),f.needsLights=bK(V),f.lightsStateVersion=D0,f.needsLights)_0.ambientLightColor.value=b.state.ambient,_0.lightProbe.value=b.state.probe,_0.directionalLights.value=b.state.directional,_0.directionalLightShadows.value=b.state.directionalShadow,_0.spotLights.value=b.state.spot,_0.spotLightShadows.value=b.state.spotShadow,_0.rectAreaLights.value=b.state.rectArea,_0.ltc_1.value=b.state.rectAreaLTC1,_0.ltc_2.value=b.state.rectAreaLTC2,_0.pointLights.value=b.state.point,_0.pointLightShadows.value=b.state.pointShadow,_0.hemisphereLights.value=b.state.hemi,_0.directionalShadowMatrix.value=b.state.directionalShadowMatrix,_0.spotLightMatrix.value=b.state.spotLightMatrix,_0.spotLightMap.value=b.state.spotLightMap,_0.pointShadowMatrix.value=b.state.pointShadowMatrix;return f.lightProbeGrid=P.state.lightProbeGridArray.length>0,f.currentProgram=f0,f.uniformsList=null,f0}function IZ(V){if(V.uniformsList===null){let v=V.currentProgram.getUniforms();V.uniformsList=g7.seqWithValue(v.seq,V.uniforms)}return V.uniformsList}function wZ(V,v){let x=T.get(V);x.outputColorSpace=v.outputColorSpace,x.batching=v.batching,x.batchingColor=v.batchingColor,x.instancing=v.instancing,x.instancingColor=v.instancingColor,x.instancingMorph=v.instancingMorph,x.skinning=v.skinning,x.morphTargets=v.morphTargets,x.morphNormals=v.morphNormals,x.morphColors=v.morphColors,x.morphTargetsCount=v.morphTargetsCount,x.numClippingPlanes=v.numClippingPlanes,x.numIntersection=v.numClipIntersection,x.vertexAlphas=v.vertexAlphas,x.vertexTangents=v.vertexTangents,x.toneMapping=v.toneMapping}function yK(V,v){if(V.length===0)return null;if(V.length===1)return V[0].texture!==null?V[0]:null;C.setFromMatrixPosition(v.matrixWorld);for(let x=0,f=V.length;x<f;x++){let b=V[x];if(b.texture!==null&&b.boundingBox.containsPoint(C))return b}return null}function hK(V,v,x,f,b){if(v.isScene!==!0)v=PJ;l.resetTextureUnits();let q0=v.fog,D0=f.isMeshStandardMaterial||f.isMeshLambertMaterial||f.isMeshPhongMaterial?v.environment:null,G0=h===null?z.outputColorSpace:h.isXRRenderTarget===!0?h.texture.colorSpace:b0.workingColorSpace,V0=f.isMeshStandardMaterial||f.isMeshLambertMaterial&&!f.envMap||f.isMeshPhongMaterial&&!f.envMap,z0=e.get(f.envMap||D0,V0),v0=f.vertexColors===!0&&!!x.attributes.color&&x.attributes.color.itemSize===4,f0=!!x.attributes.tangent&&(!!f.normalMap||f.anisotropy>0),_0=!!x.morphAttributes.position,r0=!!x.morphAttributes.normal,qJ=!!x.morphAttributes.color,EJ=K9;if(f.toneMapped){if(h===null||h.isXRRenderTarget===!0)EJ=z.toneMapping}let JJ=x.morphAttributes.position||x.morphAttributes.normal||x.morphAttributes.color,IJ=JJ!==void 0?JJ.length:0,k0=T.get(f),bJ=P.state.lights;if(u0===!0){if(m0===!0||V!==r){let KJ=V===r&&f.id===o;Q0.setState(f,V,KJ)}}let c0=!1;if(f.version===k0.__version){if(k0.needsLights&&k0.lightsStateVersion!==bJ.state.version)c0=!0;else if(k0.outputColorSpace!==G0)c0=!0;else if(b.isBatchedMesh&&k0.batching===!1)c0=!0;else if(!b.isBatchedMesh&&k0.batching===!0)c0=!0;else if(b.isBatchedMesh&&k0.batchingColor===!0&&b.colorTexture===null)c0=!0;else if(b.isBatchedMesh&&k0.batchingColor===!1&&b.colorTexture!==null)c0=!0;else if(b.isInstancedMesh&&k0.instancing===!1)c0=!0;else if(!b.isInstancedMesh&&k0.instancing===!0)c0=!0;else if(b.isSkinnedMesh&&k0.skinning===!1)c0=!0;else if(!b.isSkinnedMesh&&k0.skinning===!0)c0=!0;else if(b.isInstancedMesh&&k0.instancingColor===!0&&b.instanceColor===null)c0=!0;else if(b.isInstancedMesh&&k0.instancingColor===!1&&b.instanceColor!==null)c0=!0;else if(b.isInstancedMesh&&k0.instancingMorph===!0&&b.morphTexture===null)c0=!0;else if(b.isInstancedMesh&&k0.instancingMorph===!1&&b.morphTexture!==null)c0=!0;else if(k0.envMap!==z0)c0=!0;else if(f.fog===!0&&k0.fog!==q0)c0=!0;else if(k0.numClippingPlanes!==void 0&&(k0.numClippingPlanes!==Q0.numPlanes||k0.numIntersection!==Q0.numIntersection))c0=!0;else if(k0.vertexAlphas!==v0)c0=!0;else if(k0.vertexTangents!==f0)c0=!0;else if(k0.morphTargets!==_0)c0=!0;else if(k0.morphNormals!==r0)c0=!0;else if(k0.morphColors!==qJ)c0=!0;else if(k0.toneMapping!==EJ)c0=!0;else if(k0.morphTargetsCount!==IJ)c0=!0;else if(!!k0.lightProbeGrid!==P.state.lightProbeGridArray.length>0)c0=!0}else c0=!0,k0.__version=f.version;let sJ=k0.currentProgram;if(c0===!0){if(sJ=d7(f,v,b),A&&f.isNodeMaterial)A.onUpdateProgram(f,sJ,k0)}let G9=!1,b9=!1,_8=!1,QJ=sJ.getUniforms(),NJ=k0.uniforms;if(M.useProgram(sJ.program))G9=!0,b9=!0,_8=!0;if(f.id!==o)o=f.id,b9=!0;if(k0.needsLights){let KJ=yK(P.state.lightProbeGridArray,b);if(k0.lightProbeGrid!==KJ)k0.lightProbeGrid=KJ,b9=!0}if(G9||r!==V){if(M.buffers.depth.getReversed()&&V.reversedDepth!==!0)V._reversedDepth=!0,V.updateProjectionMatrix();QJ.setValue(j,"projectionMatrix",V.projectionMatrix),QJ.setValue(j,"viewMatrix",V.matrixWorldInverse);let g9=QJ.map.cameraPosition;if(g9!==void 0)g9.setValue(j,cJ.setFromMatrixPosition(V.matrixWorld));if(UJ.logarithmicDepthBuffer)QJ.setValue(j,"logDepthBufFC",2/(Math.log(V.far+1)/Math.LN2));if(f.isMeshPhongMaterial||f.isMeshToonMaterial||f.isMeshLambertMaterial||f.isMeshBasicMaterial||f.isMeshStandardMaterial||f.isShaderMaterial)QJ.setValue(j,"isOrthographic",V.isOrthographicCamera===!0);if(r!==V)r=V,b9=!0,_8=!0}if(k0.needsLights){if(bJ.state.directionalShadowMap.length>0)QJ.setValue(j,"directionalShadowMap",bJ.state.directionalShadowMap,l);if(bJ.state.spotShadowMap.length>0)QJ.setValue(j,"spotShadowMap",bJ.state.spotShadowMap,l);if(bJ.state.pointShadowMap.length>0)QJ.setValue(j,"pointShadowMap",bJ.state.pointShadowMap,l)}if(b.isSkinnedMesh){QJ.setOptional(j,b,"bindMatrix"),QJ.setOptional(j,b,"bindMatrixInverse");let KJ=b.skeleton;if(KJ){if(KJ.boneTexture===null)KJ.computeBoneTexture();QJ.setValue(j,"boneTexture",KJ.boneTexture,l)}}if(b.isBatchedMesh){if(QJ.setOptional(j,b,"batchingTexture"),QJ.setValue(j,"batchingTexture",b._matricesTexture,l),QJ.setOptional(j,b,"batchingIdTexture"),QJ.setValue(j,"batchingIdTexture",b._indirectTexture,l),QJ.setOptional(j,b,"batchingColorTexture"),b._colorsTexture!==null)QJ.setValue(j,"batchingColorTexture",b._colorsTexture,l)}let x9=x.morphAttributes;if(x9.position!==void 0||x9.normal!==void 0||x9.color!==void 0)n0.update(b,x,sJ);if(b9||k0.receiveShadow!==b.receiveShadow)k0.receiveShadow=b.receiveShadow,QJ.setValue(j,"receiveShadow",b.receiveShadow);if((f.isMeshStandardMaterial||f.isMeshLambertMaterial||f.isMeshPhongMaterial)&&f.envMap===null&&v.environment!==null)NJ.envMapIntensity.value=v.environmentIntensity;if(NJ.dfgLUT!==void 0)NJ.dfgLUT.value=PE();if(b9){if(QJ.setValue(j,"toneMappingExposure",z.toneMappingExposure),k0.needsLights)fK(NJ,_8);if(q0&&f.fog===!0)N0.refreshFogUniforms(NJ,q0);if(N0.refreshMaterialUniforms(NJ,f,O0,Z0,P.state.transmissionRenderTarget[V.id]),k0.needsLights&&k0.lightProbeGrid){let KJ=k0.lightProbeGrid;NJ.probesSH.value=KJ.texture,NJ.probesMin.value.copy(KJ.boundingBox.min),NJ.probesMax.value.copy(KJ.boundingBox.max),NJ.probesResolution.value.copy(KJ.resolution)}g7.upload(j,IZ(k0),NJ,l)}if(f.isShaderMaterial&&f.uniformsNeedUpdate===!0)g7.upload(j,IZ(k0),NJ,l),f.uniformsNeedUpdate=!1;if(f.isSpriteMaterial)QJ.setValue(j,"center",b.center);if(QJ.setValue(j,"modelViewMatrix",b.modelViewMatrix),QJ.setValue(j,"normalMatrix",b.normalMatrix),QJ.setValue(j,"modelMatrix",b.matrixWorld),f.uniformsGroups!==void 0){let KJ=f.uniformsGroups;for(let g9=0,C8=KJ.length;g9<C8;g9++){let AZ=KJ[g9];F0.update(AZ,sJ),F0.bind(AZ,sJ)}}return sJ}function fK(V,v){V.ambientLightColor.needsUpdate=v,V.lightProbe.needsUpdate=v,V.directionalLights.needsUpdate=v,V.directionalLightShadows.needsUpdate=v,V.pointLights.needsUpdate=v,V.pointLightShadows.needsUpdate=v,V.spotLights.needsUpdate=v,V.spotLightShadows.needsUpdate=v,V.rectAreaLights.needsUpdate=v,V.hemisphereLights.needsUpdate=v}function bK(V){return V.isMeshLambertMaterial||V.isMeshToonMaterial||V.isMeshPhongMaterial||V.isMeshStandardMaterial||V.isShadowMaterial||V.isShaderMaterial&&V.lights===!0}if(this.getActiveCubeFace=function(){return n},this.getActiveMipmapLevel=function(){return u},this.getRenderTarget=function(){return h},this.setRenderTargetTextures=function(V,v,x){let f=T.get(V);if(f.__autoAllocateDepthBuffer=V.resolveDepthBuffer===!1,f.__autoAllocateDepthBuffer===!1)f.__useRenderToTexture=!1;T.get(V.texture).__webglTexture=v,T.get(V.depthTexture).__webglTexture=f.__autoAllocateDepthBuffer?void 0:x,f.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(V,v){let x=T.get(V);x.__webglFramebuffer=v,x.__useDefaultFramebuffer=v===void 0},this.setRenderTarget=function(V,v=0,x=0){h=V,n=v,u=x;let f=null,b=!1,q0=!1;if(V){let G0=T.get(V);if(G0.__useDefaultFramebuffer!==void 0){M.bindFramebuffer(j.FRAMEBUFFER,G0.__webglFramebuffer),W0.copy(V.viewport),L0.copy(V.scissor),E0=V.scissorTest,M.viewport(W0),M.scissor(L0),M.setScissorTest(E0),o=-1;return}else if(G0.__webglFramebuffer===void 0)l.setupRenderTarget(V);else if(G0.__hasExternalTextures)l.rebindTextures(V,T.get(V.texture).__webglTexture,T.get(V.depthTexture).__webglTexture);else if(V.depthBuffer){let v0=V.depthTexture;if(G0.__boundDepthTexture!==v0){if(v0!==null&&T.has(v0)&&(V.width!==v0.image.width||V.height!==v0.image.height))throw Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");l.setupDepthRenderbuffer(V)}}let V0=V.texture;if(V0.isData3DTexture||V0.isDataArrayTexture||V0.isCompressedArrayTexture)q0=!0;let z0=T.get(V).__webglFramebuffer;if(V.isWebGLCubeRenderTarget){if(Array.isArray(z0[v]))f=z0[v][x];else f=z0[v];b=!0}else if(V.samples>0&&l.useMultisampledRTT(V)===!1)f=T.get(V).__webglMultisampledFramebuffer;else if(Array.isArray(z0))f=z0[x];else f=z0;W0.copy(V.viewport),L0.copy(V.scissor),E0=V.scissorTest}else W0.copy(d0).multiplyScalar(O0).floor(),L0.copy(g0).multiplyScalar(O0).floor(),E0=l0;if(x!==0)f=m;if(M.bindFramebuffer(j.FRAMEBUFFER,f))M.drawBuffers(V,f);if(M.viewport(W0),M.scissor(L0),M.setScissorTest(E0),b){let G0=T.get(V.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_CUBE_MAP_POSITIVE_X+v,G0.__webglTexture,x)}else if(q0){let G0=v;for(let V0=0;V0<V.textures.length;V0++){let z0=T.get(V.textures[V0]);j.framebufferTextureLayer(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0+V0,z0.__webglTexture,x,G0)}}else if(V!==null&&x!==0){let G0=T.get(V.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,G0.__webglTexture,x)}o=-1},this.readRenderTargetPixels=function(V,v,x,f,b,q0,D0,G0=0){if(!(V&&V.isWebGLRenderTarget)){A0("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let V0=T.get(V).__webglFramebuffer;if(V.isWebGLCubeRenderTarget&&D0!==void 0)V0=V0[D0];if(V0){M.bindFramebuffer(j.FRAMEBUFFER,V0);try{let z0=V.textures[G0],v0=z0.format,f0=z0.type;if(V.textures.length>1)j.readBuffer(j.COLOR_ATTACHMENT0+G0);if(!UJ.textureFormatReadable(v0)){A0("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!UJ.textureTypeReadable(f0)){A0("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}if(v>=0&&v<=V.width-f&&(x>=0&&x<=V.height-b))j.readPixels(v,x,f,b,c.convert(v0),c.convert(f0),q0)}finally{let z0=h!==null?T.get(h).__webglFramebuffer:null;M.bindFramebuffer(j.FRAMEBUFFER,z0)}}},this.readRenderTargetPixelsAsync=async function(V,v,x,f,b,q0,D0,G0=0){if(!(V&&V.isWebGLRenderTarget))throw Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let V0=T.get(V).__webglFramebuffer;if(V.isWebGLCubeRenderTarget&&D0!==void 0)V0=V0[D0];if(V0)if(v>=0&&v<=V.width-f&&(x>=0&&x<=V.height-b)){M.bindFramebuffer(j.FRAMEBUFFER,V0);let z0=V.textures[G0],v0=z0.format,f0=z0.type;if(V.textures.length>1)j.readBuffer(j.COLOR_ATTACHMENT0+G0);if(!UJ.textureFormatReadable(v0))throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!UJ.textureTypeReadable(f0))throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let _0=j.createBuffer();j.bindBuffer(j.PIXEL_PACK_BUFFER,_0),j.bufferData(j.PIXEL_PACK_BUFFER,q0.byteLength,j.STREAM_READ),j.readPixels(v,x,f,b,c.convert(v0),c.convert(f0),0);let r0=h!==null?T.get(h).__webglFramebuffer:null;M.bindFramebuffer(j.FRAMEBUFFER,r0);let qJ=j.fenceSync(j.SYNC_GPU_COMMANDS_COMPLETE,0);return j.flush(),await XH(j,qJ,4),j.bindBuffer(j.PIXEL_PACK_BUFFER,_0),j.getBufferSubData(j.PIXEL_PACK_BUFFER,0,q0),j.deleteBuffer(_0),j.deleteSync(qJ),q0}else throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(V,v=null,x=0){let f=Math.pow(2,-x),b=Math.floor(V.image.width*f),q0=Math.floor(V.image.height*f),D0=v!==null?v.x:0,G0=v!==null?v.y:0;l.setTexture2D(V,0),j.copyTexSubImage2D(j.TEXTURE_2D,x,0,0,D0,G0,b,q0),M.unbindTexture()},this.copyTextureToTexture=function(V,v,x=null,f=null,b=0,q0=0){let D0,G0,V0,z0,v0,f0,_0,r0,qJ,EJ=V.isCompressedTexture?V.mipmaps[q0]:V.image;if(x!==null)D0=x.max.x-x.min.x,G0=x.max.y-x.min.y,V0=x.isBox3?x.max.z-x.min.z:1,z0=x.min.x,v0=x.min.y,f0=x.isBox3?x.min.z:0;else{let NJ=Math.pow(2,-b);if(D0=Math.floor(EJ.width*NJ),G0=Math.floor(EJ.height*NJ),V.isDataArrayTexture)V0=EJ.depth;else if(V.isData3DTexture)V0=Math.floor(EJ.depth*NJ);else V0=1;z0=0,v0=0,f0=0}if(f!==null)_0=f.x,r0=f.y,qJ=f.z;else _0=0,r0=0,qJ=0;let JJ=c.convert(v.format),IJ=c.convert(v.type),k0;if(v.isData3DTexture)l.setTexture3D(v,0),k0=j.TEXTURE_3D;else if(v.isDataArrayTexture||v.isCompressedArrayTexture)l.setTexture2DArray(v,0),k0=j.TEXTURE_2D_ARRAY;else l.setTexture2D(v,0),k0=j.TEXTURE_2D;M.activeTexture(j.TEXTURE0),M.pixelStorei(j.UNPACK_FLIP_Y_WEBGL,v.flipY),M.pixelStorei(j.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),M.pixelStorei(j.UNPACK_ALIGNMENT,v.unpackAlignment);let bJ=M.getParameter(j.UNPACK_ROW_LENGTH),c0=M.getParameter(j.UNPACK_IMAGE_HEIGHT),sJ=M.getParameter(j.UNPACK_SKIP_PIXELS),G9=M.getParameter(j.UNPACK_SKIP_ROWS),b9=M.getParameter(j.UNPACK_SKIP_IMAGES);M.pixelStorei(j.UNPACK_ROW_LENGTH,EJ.width),M.pixelStorei(j.UNPACK_IMAGE_HEIGHT,EJ.height),M.pixelStorei(j.UNPACK_SKIP_PIXELS,z0),M.pixelStorei(j.UNPACK_SKIP_ROWS,v0),M.pixelStorei(j.UNPACK_SKIP_IMAGES,f0);let _8=V.isDataArrayTexture||V.isData3DTexture,QJ=v.isDataArrayTexture||v.isData3DTexture;if(V.isDepthTexture){let NJ=T.get(V),x9=T.get(v),KJ=T.get(NJ.__renderTarget),g9=T.get(x9.__renderTarget);M.bindFramebuffer(j.READ_FRAMEBUFFER,KJ.__webglFramebuffer),M.bindFramebuffer(j.DRAW_FRAMEBUFFER,g9.__webglFramebuffer);for(let C8=0;C8<V0;C8++){if(_8)j.framebufferTextureLayer(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,T.get(V).__webglTexture,b,f0+C8),j.framebufferTextureLayer(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,T.get(v).__webglTexture,q0,qJ+C8);j.blitFramebuffer(z0,v0,D0,G0,_0,r0,D0,G0,j.DEPTH_BUFFER_BIT,j.NEAREST)}M.bindFramebuffer(j.READ_FRAMEBUFFER,null),M.bindFramebuffer(j.DRAW_FRAMEBUFFER,null)}else if(b!==0||V.isRenderTargetTexture||T.has(V)){let NJ=T.get(V),x9=T.get(v);M.bindFramebuffer(j.READ_FRAMEBUFFER,a),M.bindFramebuffer(j.DRAW_FRAMEBUFFER,p);for(let KJ=0;KJ<V0;KJ++){if(_8)j.framebufferTextureLayer(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,NJ.__webglTexture,b,f0+KJ);else j.framebufferTexture2D(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,NJ.__webglTexture,b);if(QJ)j.framebufferTextureLayer(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,x9.__webglTexture,q0,qJ+KJ);else j.framebufferTexture2D(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,x9.__webglTexture,q0);if(b!==0)j.blitFramebuffer(z0,v0,D0,G0,_0,r0,D0,G0,j.COLOR_BUFFER_BIT,j.NEAREST);else if(QJ)j.copyTexSubImage3D(k0,q0,_0,r0,qJ+KJ,z0,v0,D0,G0);else j.copyTexSubImage2D(k0,q0,_0,r0,z0,v0,D0,G0)}M.bindFramebuffer(j.READ_FRAMEBUFFER,null),M.bindFramebuffer(j.DRAW_FRAMEBUFFER,null)}else if(QJ)if(V.isDataTexture||V.isData3DTexture)j.texSubImage3D(k0,q0,_0,r0,qJ,D0,G0,V0,JJ,IJ,EJ.data);else if(v.isCompressedArrayTexture)j.compressedTexSubImage3D(k0,q0,_0,r0,qJ,D0,G0,V0,JJ,EJ.data);else j.texSubImage3D(k0,q0,_0,r0,qJ,D0,G0,V0,JJ,IJ,EJ);else if(V.isDataTexture)j.texSubImage2D(j.TEXTURE_2D,q0,_0,r0,D0,G0,JJ,IJ,EJ.data);else if(V.isCompressedTexture)j.compressedTexSubImage2D(j.TEXTURE_2D,q0,_0,r0,EJ.width,EJ.height,JJ,EJ.data);else j.texSubImage2D(j.TEXTURE_2D,q0,_0,r0,D0,G0,JJ,IJ,EJ);if(M.pixelStorei(j.UNPACK_ROW_LENGTH,bJ),M.pixelStorei(j.UNPACK_IMAGE_HEIGHT,c0),M.pixelStorei(j.UNPACK_SKIP_PIXELS,sJ),M.pixelStorei(j.UNPACK_SKIP_ROWS,G9),M.pixelStorei(j.UNPACK_SKIP_IMAGES,b9),q0===0&&v.generateMipmaps)j.generateMipmap(k0);M.unbindTexture()},this.initRenderTarget=function(V){if(T.get(V).__webglFramebuffer===void 0)l.setupRenderTarget(V)},this.initTexture=function(V){if(V.isCubeTexture)l.setTextureCube(V,0);else if(V.isData3DTexture)l.setTexture3D(V,0);else if(V.isDataArrayTexture||V.isCompressedArrayTexture)l.setTexture2DArray(V,0);else l.setTexture2D(V,0);M.unbindTexture()},this.resetState=function(){n=0,u=0,h=null,M.reset(),H0.reset()},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return T$}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(J){this._outputColorSpace=J;let Q=this.getContext();Q.drawingBufferColorSpace=b0._getDrawingBufferColorSpace(J),Q.unpackColorSpace=b0._getUnpackColorSpace()}}function EZ(J,Q){if(Q===P$)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),J;if(Q===r8||Q===C7){let $=J.getIndex();if($===null){let K=[],Y=J.getAttribute("position");if(Y!==void 0){for(let X=0;X<Y.count;X++)K.push(X);J.setIndex(K),$=J.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),J}let Z=$.count-2,W=[];if(Q===r8)for(let K=1;K<=Z;K++)W.push($.getX(0)),W.push($.getX(K)),W.push($.getX(K+1));else for(let K=0;K<Z;K++)if(K%2===0)W.push($.getX(K)),W.push($.getX(K+1)),W.push($.getX(K+2));else W.push($.getX(K+2)),W.push($.getX(K+1)),W.push($.getX(K));if(W.length/3!==Z)console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let H=J.clone();return H.setIndex(W),H.clearGroups(),H}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",Q),J}function JK(J){let Q=new Map,$=new Map,Z=J.clone();return QK(J,Z,function(W,H){Q.set(H,W),$.set(W,H)}),Z.traverse(function(W){if(!W.isSkinnedMesh)return;let H=W,K=Q.get(W),Y=K.skeleton.bones;H.skeleton=K.skeleton.clone(),H.bindMatrix.copy(K.bindMatrix),H.skeleton.bones=Y.map(function(X){return $.get(X)}),H.bind(H.skeleton,H.bindMatrix)}),Z}function QK(J,Q,$){$(J,Q);for(let Z=0;Z<J.children.length;Z++)QK(J.children[Z],Q.children[Z],$)}class LZ extends f9{constructor(J){super(J);this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(Q){return new UK(Q)}),this.register(function(Q){return new GK(Q)}),this.register(function(Q){return new DK(Q)}),this.register(function(Q){return new VK(Q)}),this.register(function(Q){return new MK(Q)}),this.register(function(Q){return new qK(Q)}),this.register(function(Q){return new NK(Q)}),this.register(function(Q){return new FK(Q)}),this.register(function(Q){return new OK(Q)}),this.register(function(Q){return new XK(Q)}),this.register(function(Q){return new RK(Q)}),this.register(function(Q){return new EK(Q)}),this.register(function(Q){return new LK(Q)}),this.register(function(Q){return new kK(Q)}),this.register(function(Q){return new KK(Q)}),this.register(function(Q){return new OZ(Q,x0.EXT_MESHOPT_COMPRESSION)}),this.register(function(Q){return new OZ(Q,x0.KHR_MESHOPT_COMPRESSION)}),this.register(function(Q){return new BK(Q)})}load(J,Q,$,Z){let W=this,H;if(this.resourcePath!=="")H=this.resourcePath;else if(this.path!==""){let X=J8.extractUrlBase(J);H=J8.resolveURL(X,this.path)}else H=J8.extractUrlBase(J);this.manager.itemStart(J);let K=function(X){if(Z)Z(X);else console.error(X);W.manager.itemError(J),W.manager.itemEnd(J)},Y=new h7(this.manager);Y.setPath(this.path),Y.setResponseType("arraybuffer"),Y.setRequestHeader(this.requestHeader),Y.setWithCredentials(this.withCredentials),Y.load(J,function(X){try{W.parse(X,H,function(U){Q(U),W.manager.itemEnd(J)},K)}catch(U){K(U)}},$,K)}setDRACOLoader(J){return this.dracoLoader=J,this}setKTX2Loader(J){return this.ktx2Loader=J,this}setMeshoptDecoder(J){return this.meshoptDecoder=J,this}register(J){if(this.pluginCallbacks.indexOf(J)===-1)this.pluginCallbacks.push(J);return this}unregister(J){if(this.pluginCallbacks.indexOf(J)!==-1)this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(J),1);return this}parse(J,Q,$,Z){let W,H={},K={},Y=new TextDecoder;if(typeof J==="string")W=JSON.parse(J);else if(J instanceof ArrayBuffer)if(Y.decode(new Uint8Array(J,0,4))===zK){try{H[x0.KHR_BINARY_GLTF]=new _K(J)}catch(G){if(Z)Z(G);return}W=JSON.parse(H[x0.KHR_BINARY_GLTF].content)}else W=JSON.parse(Y.decode(J));else W=J;if(W.asset===void 0||W.asset.version[0]<2){if(Z)Z(Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let X=new AK(W,{path:Q||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});X.fileLoader.setRequestHeader(this.requestHeader);for(let U=0;U<this.pluginCallbacks.length;U++){let G=this.pluginCallbacks[U](X);if(!G.name)console.error("THREE.GLTFLoader: Invalid plugin found: missing name");K[G.name]=G,H[G.name]=!0}if(W.extensionsUsed)for(let U=0;U<W.extensionsUsed.length;++U){let G=W.extensionsUsed[U],q=W.extensionsRequired||[];switch(G){case x0.KHR_MATERIALS_UNLIT:H[G]=new YK;break;case x0.KHR_DRACO_MESH_COMPRESSION:H[G]=new CK(W,this.dracoLoader);break;case x0.KHR_TEXTURE_TRANSFORM:H[G]=new PK;break;case x0.KHR_MESH_QUANTIZATION:H[G]=new IK;break;default:if(q.indexOf(G)>=0&&K[G]===void 0)console.warn('THREE.GLTFLoader: Unknown extension "'+G+'".')}}X.setExtensions(H),X.setPlugins(K),X.parse($,Z)}parseAsync(J,Q){let $=this;return new Promise(function(Z,W){$.parse(J,Q,Z,W)})}}function IE(){let J={};return{get:function(Q){return J[Q]},add:function(Q,$){J[Q]=$},remove:function(Q){delete J[Q]},removeAll:function(){J={}}}}function OJ(J,Q,$){let Z=J.json.materials[Q];if(Z.extensions&&Z.extensions[$])return Z.extensions[$];return null}var x0={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class KK{constructor(J){this.parser=J,this.name=x0.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let J=this.parser,Q=this.parser.json.nodes||[];for(let $=0,Z=Q.length;$<Z;$++){let W=Q[$];if(W.extensions&&W.extensions[this.name]&&W.extensions[this.name].light!==void 0)J._addNodeRef(this.cache,W.extensions[this.name].light)}}_loadLight(J){let Q=this.parser,$="light:"+J,Z=Q.cache.get($);if(Z)return Z;let W=Q.json,Y=((W.extensions&&W.extensions[this.name]||{}).lights||[])[J],X,U=new I0(16777215);if(Y.color!==void 0)U.setRGB(Y.color[0],Y.color[1],Y.color[2],pJ);let G=Y.range!==void 0?Y.range:0;switch(Y.type){case"directional":X=new M8(U),X.target.position.set(0,0,-1),X.add(X.target);break;case"point":X=new W7(U),X.distance=G;break;case"spot":X=new o6(U),X.distance=G,Y.spot=Y.spot||{},Y.spot.innerConeAngle=Y.spot.innerConeAngle!==void 0?Y.spot.innerConeAngle:0,Y.spot.outerConeAngle=Y.spot.outerConeAngle!==void 0?Y.spot.outerConeAngle:Math.PI/4,X.angle=Y.spot.outerConeAngle,X.penumbra=1-Y.spot.innerConeAngle/Y.spot.outerConeAngle,X.target.position.set(0,0,-1),X.add(X.target);break;default:throw Error("THREE.GLTFLoader: Unexpected light type: "+Y.type)}if(X.position.set(0,0,0),B9(X,Y),Y.intensity!==void 0)X.intensity=Y.intensity;return X.name=Q.createUniqueName(Y.name||"light_"+J),Z=Promise.resolve(X),Q.cache.add($,Z),Z}getDependency(J,Q){if(J!=="light")return;return this._loadLight(Q)}createNodeAttachment(J){let Q=this,$=this.parser,W=$.json.nodes[J],K=(W.extensions&&W.extensions[this.name]||{}).light;if(K===void 0)return null;return this._loadLight(K).then(function(Y){return $._getNodeRef(Q.cache,K,Y)})}}class YK{constructor(){this.name=x0.KHR_MATERIALS_UNLIT}getMaterialType(){return mJ}extendParams(J,Q,$){let Z=[];J.color=new I0(1,1,1),J.opacity=1;let W=Q.pbrMetallicRoughness;if(W){if(Array.isArray(W.baseColorFactor)){let H=W.baseColorFactor;J.color.setRGB(H[0],H[1],H[2],pJ),J.opacity=H[3]}if(W.baseColorTexture!==void 0)Z.push($.assignTexture(J,"map",W.baseColorTexture,L9))}return Promise.all(Z)}}class XK{constructor(J){this.parser=J,this.name=x0.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(J,Q){let $=OJ(this.parser,J,this.name);if($===null)return Promise.resolve();if($.emissiveStrength!==void 0)Q.emissiveIntensity=$.emissiveStrength;return Promise.resolve()}}class UK{constructor(J){this.parser=J,this.name=x0.KHR_MATERIALS_CLEARCOAT}getMaterialType(J){return OJ(this.parser,J,this.name)!==null?dJ:null}extendMaterialParams(J,Q){let $=OJ(this.parser,J,this.name);if($===null)return Promise.resolve();let Z=[];if($.clearcoatFactor!==void 0)Q.clearcoat=$.clearcoatFactor;if($.clearcoatTexture!==void 0)Z.push(this.parser.assignTexture(Q,"clearcoatMap",$.clearcoatTexture));if($.clearcoatRoughnessFactor!==void 0)Q.clearcoatRoughness=$.clearcoatRoughnessFactor;if($.clearcoatRoughnessTexture!==void 0)Z.push(this.parser.assignTexture(Q,"clearcoatRoughnessMap",$.clearcoatRoughnessTexture));if($.clearcoatNormalTexture!==void 0){if(Z.push(this.parser.assignTexture(Q,"clearcoatNormalMap",$.clearcoatNormalTexture)),$.clearcoatNormalTexture.scale!==void 0){let W=$.clearcoatNormalTexture.scale;Q.clearcoatNormalScale=new y0(W,W)}}return Promise.all(Z)}}class GK{constructor(J){this.parser=J,this.name=x0.KHR_MATERIALS_DISPERSION}getMaterialType(J){return OJ(this.parser,J,this.name)!==null?dJ:null}extendMaterialParams(J,Q){let $=OJ(this.parser,J,this.name);if($===null)return Promise.resolve();return Q.dispersion=$.dispersion!==void 0?$.dispersion:0,Promise.resolve()}}class EK{constructor(J){this.parser=J,this.name=x0.KHR_MATERIALS_IRIDESCENCE}getMaterialType(J){return OJ(this.parser,J,this.name)!==null?dJ:null}extendMaterialParams(J,Q){let $=OJ(this.parser,J,this.name);if($===null)return Promise.resolve();let Z=[];if($.iridescenceFactor!==void 0)Q.iridescence=$.iridescenceFactor;if($.iridescenceTexture!==void 0)Z.push(this.parser.assignTexture(Q,"iridescenceMap",$.iridescenceTexture));if($.iridescenceIor!==void 0)Q.iridescenceIOR=$.iridescenceIor;if(Q.iridescenceThicknessRange===void 0)Q.iridescenceThicknessRange=[100,400];if($.iridescenceThicknessMinimum!==void 0)Q.iridescenceThicknessRange[0]=$.iridescenceThicknessMinimum;if($.iridescenceThicknessMaximum!==void 0)Q.iridescenceThicknessRange[1]=$.iridescenceThicknessMaximum;if($.iridescenceThicknessTexture!==void 0)Z.push(this.parser.assignTexture(Q,"iridescenceThicknessMap",$.iridescenceThicknessTexture));return Promise.all(Z)}}class qK{constructor(J){this.parser=J,this.name=x0.KHR_MATERIALS_SHEEN}getMaterialType(J){return OJ(this.parser,J,this.name)!==null?dJ:null}extendMaterialParams(J,Q){let $=OJ(this.parser,J,this.name);if($===null)return Promise.resolve();let Z=[];if(Q.sheenColor=new I0(0,0,0),Q.sheenRoughness=0,Q.sheen=1,$.sheenColorFactor!==void 0){let W=$.sheenColorFactor;Q.sheenColor.setRGB(W[0],W[1],W[2],pJ)}if($.sheenRoughnessFactor!==void 0)Q.sheenRoughness=$.sheenRoughnessFactor;if($.sheenColorTexture!==void 0)Z.push(this.parser.assignTexture(Q,"sheenColorMap",$.sheenColorTexture,L9));if($.sheenRoughnessTexture!==void 0)Z.push(this.parser.assignTexture(Q,"sheenRoughnessMap",$.sheenRoughnessTexture));return Promise.all(Z)}}class NK{constructor(J){this.parser=J,this.name=x0.KHR_MATERIALS_TRANSMISSION}getMaterialType(J){return OJ(this.parser,J,this.name)!==null?dJ:null}extendMaterialParams(J,Q){let $=OJ(this.parser,J,this.name);if($===null)return Promise.resolve();let Z=[];if($.transmissionFactor!==void 0)Q.transmission=$.transmissionFactor;if($.transmissionTexture!==void 0)Z.push(this.parser.assignTexture(Q,"transmissionMap",$.transmissionTexture));return Promise.all(Z)}}class FK{constructor(J){this.parser=J,this.name=x0.KHR_MATERIALS_VOLUME}getMaterialType(J){return OJ(this.parser,J,this.name)!==null?dJ:null}extendMaterialParams(J,Q){let $=OJ(this.parser,J,this.name);if($===null)return Promise.resolve();let Z=[];if(Q.thickness=$.thicknessFactor!==void 0?$.thicknessFactor:0,$.thicknessTexture!==void 0)Z.push(this.parser.assignTexture(Q,"thicknessMap",$.thicknessTexture));Q.attenuationDistance=$.attenuationDistance||1/0;let W=$.attenuationColor||[1,1,1];return Q.attenuationColor=new I0().setRGB(W[0],W[1],W[2],pJ),Promise.all(Z)}}class OK{constructor(J){this.parser=J,this.name=x0.KHR_MATERIALS_IOR}getMaterialType(J){return OJ(this.parser,J,this.name)!==null?dJ:null}extendMaterialParams(J,Q){let $=OJ(this.parser,J,this.name);if($===null)return Promise.resolve();if(Q.ior=$.ior!==void 0?$.ior:1.5,Q.ior===0)Q.ior=1000;return Promise.resolve()}}class RK{constructor(J){this.parser=J,this.name=x0.KHR_MATERIALS_SPECULAR}getMaterialType(J){return OJ(this.parser,J,this.name)!==null?dJ:null}extendMaterialParams(J,Q){let $=OJ(this.parser,J,this.name);if($===null)return Promise.resolve();let Z=[];if(Q.specularIntensity=$.specularFactor!==void 0?$.specularFactor:1,$.specularTexture!==void 0)Z.push(this.parser.assignTexture(Q,"specularIntensityMap",$.specularTexture));let W=$.specularColorFactor||[1,1,1];if(Q.specularColor=new I0().setRGB(W[0],W[1],W[2],pJ),$.specularColorTexture!==void 0)Z.push(this.parser.assignTexture(Q,"specularColorMap",$.specularColorTexture,L9));return Promise.all(Z)}}class kK{constructor(J){this.parser=J,this.name=x0.EXT_MATERIALS_BUMP}getMaterialType(J){return OJ(this.parser,J,this.name)!==null?dJ:null}extendMaterialParams(J,Q){let $=OJ(this.parser,J,this.name);if($===null)return Promise.resolve();let Z=[];if(Q.bumpScale=$.bumpFactor!==void 0?$.bumpFactor:1,$.bumpTexture!==void 0)Z.push(this.parser.assignTexture(Q,"bumpMap",$.bumpTexture));return Promise.all(Z)}}class LK{constructor(J){this.parser=J,this.name=x0.KHR_MATERIALS_ANISOTROPY}getMaterialType(J){return OJ(this.parser,J,this.name)!==null?dJ:null}extendMaterialParams(J,Q){let $=OJ(this.parser,J,this.name);if($===null)return Promise.resolve();let Z=[];if($.anisotropyStrength!==void 0)Q.anisotropy=$.anisotropyStrength;if($.anisotropyRotation!==void 0)Q.anisotropyRotation=$.anisotropyRotation;if($.anisotropyTexture!==void 0)Z.push(this.parser.assignTexture(Q,"anisotropyMap",$.anisotropyTexture));return Promise.all(Z)}}class DK{constructor(J){this.parser=J,this.name=x0.KHR_TEXTURE_BASISU}loadTexture(J){let Q=this.parser,$=Q.json,Z=$.textures[J];if(!Z.extensions||!Z.extensions[this.name])return null;let W=Z.extensions[this.name],H=Q.options.ktx2Loader;if(!H)if($.extensionsRequired&&$.extensionsRequired.indexOf(this.name)>=0)throw Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");else return null;return Q.loadTextureImage(J,W.source,H)}}class VK{constructor(J){this.parser=J,this.name=x0.EXT_TEXTURE_WEBP}loadTexture(J){let Q=this.name,$=this.parser,Z=$.json,W=Z.textures[J];if(!W.extensions||!W.extensions[Q])return null;let H=W.extensions[Q],K=Z.images[H.source],Y=$.textureLoader;if(K.uri){let X=$.options.manager.getHandler(K.uri);if(X!==null)Y=X}return $.loadTextureImage(J,H.source,Y)}}class MK{constructor(J){this.parser=J,this.name=x0.EXT_TEXTURE_AVIF}loadTexture(J){let Q=this.name,$=this.parser,Z=$.json,W=Z.textures[J];if(!W.extensions||!W.extensions[Q])return null;let H=W.extensions[Q],K=Z.images[H.source],Y=$.textureLoader;if(K.uri){let X=$.options.manager.getHandler(K.uri);if(X!==null)Y=X}return $.loadTextureImage(J,H.source,Y)}}class OZ{constructor(J,Q){this.name=Q,this.parser=J}loadBufferView(J){let Q=this.parser.json,$=Q.bufferViews[J];if($.extensions&&$.extensions[this.name]){let Z=$.extensions[this.name],W=this.parser.getDependency("buffer",Z.buffer),H=this.parser.options.meshoptDecoder;if(!H||!H.supported)if(Q.extensionsRequired&&Q.extensionsRequired.indexOf(this.name)>=0)throw Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");else return null;return W.then(function(K){let Y=Z.byteOffset||0,X=Z.byteLength||0,U=Z.count,G=Z.byteStride,q=new Uint8Array(K,Y,X);if(H.decodeGltfBufferAsync)return H.decodeGltfBufferAsync(U,G,q,Z.mode,Z.filter).then(function(E){return E.buffer});else return H.ready.then(function(){let E=new ArrayBuffer(U*G);return H.decodeGltfBuffer(new Uint8Array(E),U,G,q,Z.mode,Z.filter),E})})}else return null}}class BK{constructor(J){this.name=x0.EXT_MESH_GPU_INSTANCING,this.parser=J}createNodeMesh(J){let Q=this.parser.json,$=Q.nodes[J];if(!$.extensions||!$.extensions[this.name]||$.mesh===void 0)return null;let Z=Q.meshes[$.mesh];for(let X of Z.primitives)if(X.mode!==J9.TRIANGLES&&X.mode!==J9.TRIANGLE_STRIP&&X.mode!==J9.TRIANGLE_FAN&&X.mode!==void 0)return null;let H=$.extensions[this.name].attributes,K=[],Y={};for(let X in H)K.push(this.parser.getDependency("accessor",H[X]).then((U)=>{return Y[X]=U,Y[X]}));if(K.length<1)return null;return K.push(this.parser.createNodeMesh(J)),Promise.all(K).then((X)=>{let U=X.pop(),G=U.isGroup?U.children:[U],q=X[0].count,E=[];for(let F of G){let k=new j0,B=new y,O=new vJ,N=new y(1,1,1),_=new Q7(F.geometry,F.material,q);for(let C=0;C<q;C++){if(Y.TRANSLATION)B.fromBufferAttribute(Y.TRANSLATION,C);if(Y.ROTATION)O.fromBufferAttribute(Y.ROTATION,C);if(Y.SCALE)N.fromBufferAttribute(Y.SCALE,C);_.setMatrixAt(C,k.compose(B,O,N))}for(let C in Y)if(C==="_COLOR_0"){let D=Y[C];_.instanceColor=new G8(D.array,D.itemSize,D.normalized)}else if(C!=="TRANSLATION"&&C!=="ROTATION"&&C!=="SCALE")F.geometry.setAttribute(C,Y[C]);t0.prototype.copy.call(_,F),this.parser.assignFinalMaterial(_),E.push(_)}if(U.isGroup)return U.clear(),U.add(...E),U;return E[0]})}}var zK="glTF",l7=12,$K={JSON:1313821514,BIN:5130562};class _K{constructor(J){this.name=x0.KHR_BINARY_GLTF,this.content=null,this.body=null;let Q=new DataView(J,0,l7),$=new TextDecoder;if(this.header={magic:$.decode(new Uint8Array(J.slice(0,4))),version:Q.getUint32(4,!0),length:Q.getUint32(8,!0)},this.header.magic!==zK)throw Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");else if(this.header.version<2)throw Error("THREE.GLTFLoader: Legacy binary file detected.");let Z=this.header.length-l7,W=new DataView(J,l7),H=0;while(H<Z){let K=W.getUint32(H,!0);H+=4;let Y=W.getUint32(H,!0);if(H+=4,Y===$K.JSON){let X=new Uint8Array(J,l7+H,K);this.content=$.decode(X)}else if(Y===$K.BIN){let X=l7+H;this.body=J.slice(X,X+K)}H+=K}if(this.content===null)throw Error("THREE.GLTFLoader: JSON content not found.")}}class CK{constructor(J,Q){if(!Q)throw Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=x0.KHR_DRACO_MESH_COMPRESSION,this.json=J,this.dracoLoader=Q,this.dracoLoader.preload()}decodePrimitive(J,Q){let $=this.json,Z=this.dracoLoader,W=J.extensions[this.name].bufferView,H=J.extensions[this.name].attributes,K={},Y={},X={};for(let U in H){let G=RZ[U]||U.toLowerCase();K[G]=H[U]}for(let U in J.attributes){let G=RZ[U]||U.toLowerCase();if(H[U]!==void 0){let q=$.accessors[J.attributes[U]],E=Y7[q.componentType];X[G]=E.name,Y[G]=q.normalized===!0}}return Q.getDependency("bufferView",W).then(function(U){return new Promise(function(G,q){Z.decodeDracoFile(U,function(E){for(let F in E.attributes){let k=E.attributes[F],B=Y[F];if(B!==void 0)k.normalized=B}G(E)},K,X,pJ,q)})})}}class PK{constructor(){this.name=x0.KHR_TEXTURE_TRANSFORM}extendTexture(J,Q){if((Q.texCoord===void 0||Q.texCoord===J.channel)&&Q.offset===void 0&&Q.rotation===void 0&&Q.scale===void 0)return J;if(J=J.clone(),Q.texCoord!==void 0)J.channel=Q.texCoord;if(Q.offset!==void 0)J.offset.fromArray(Q.offset);if(Q.rotation!==void 0)J.rotation=Q.rotation;if(Q.scale!==void 0)J.repeat.fromArray(Q.scale);return J.needsUpdate=!0,J}}class IK{constructor(){this.name=x0.KHR_MESH_QUANTIZATION}}class DZ extends h9{constructor(J,Q,$,Z){super(J,Q,$,Z)}copySampleValue_(J){let Q=this.resultBuffer,$=this.sampleValues,Z=this.valueSize,W=J*Z*3+Z;for(let H=0;H!==Z;H++)Q[H]=$[W+H];return Q}interpolate_(J,Q,$,Z){let W=this.resultBuffer,H=this.sampleValues,K=this.valueSize,Y=K*2,X=K*3,U=Z-Q,G=($-Q)/U,q=G*G,E=q*G,F=J*X,k=F-X,B=-2*E+3*q,O=E-q,N=1-B,_=O-q+G;for(let C=0;C!==K;C++){let D=H[k+C+K],P=H[k+C+Y]*U,I=H[F+C+K],w=H[F+C]*U;W[C]=N*D+_*P+B*I+O*w}return W}}var wE=new vJ;class wK extends DZ{interpolate_(J,Q,$,Z){let W=super.interpolate_(J,Q,$,Z);return wE.fromArray(W).normalize().toArray(W),W}}var J9={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Y7={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},ZK={9728:Y9,9729:CJ,9984:M6,9985:o8,9986:q8,9987:R9},WK={33071:i8,33648:V6,10497:s8},qZ={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},RZ={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},$8={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},AE={CUBICSPLINE:void 0,LINEAR:w6,STEP:C$},NZ={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function TE(J){if(J.DefaultMaterial===void 0)J.DefaultMaterial=new y9({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:n9});return J.DefaultMaterial}function z8(J,Q,$){for(let Z in $.extensions)if(J[Z]===void 0)Q.userData.gltfExtensions=Q.userData.gltfExtensions||{},Q.userData.gltfExtensions[Z]=$.extensions[Z]}function B9(J,Q){if(Q.extras!==void 0)if(typeof Q.extras==="object")Object.assign(J.userData,Q.extras);else console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+Q.extras)}function SE(J,Q,$){let Z=!1,W=!1,H=!1;for(let U=0,G=Q.length;U<G;U++){let q=Q[U];if(q.POSITION!==void 0)Z=!0;if(q.NORMAL!==void 0)W=!0;if(q.COLOR_0!==void 0)H=!0;if(Z&&W&&H)break}if(!Z&&!W&&!H)return Promise.resolve(J);let K=[],Y=[],X=[];for(let U=0,G=Q.length;U<G;U++){let q=Q[U];if(Z){let E=q.POSITION!==void 0?$.getDependency("accessor",q.POSITION):J.attributes.position;K.push(E)}if(W){let E=q.NORMAL!==void 0?$.getDependency("accessor",q.NORMAL):J.attributes.normal;Y.push(E)}if(H){let E=q.COLOR_0!==void 0?$.getDependency("accessor",q.COLOR_0):J.attributes.color;X.push(E)}}return Promise.all([Promise.all(K),Promise.all(Y),Promise.all(X)]).then(function(U){let G=U[0],q=U[1],E=U[2];if(Z)J.morphAttributes.position=G;if(W)J.morphAttributes.normal=q;if(H)J.morphAttributes.color=E;return J.morphTargetsRelative=!0,J})}function jE(J,Q){if(J.updateMorphTargets(),Q.weights!==void 0)for(let $=0,Z=Q.weights.length;$<Z;$++)J.morphTargetInfluences[$]=Q.weights[$];if(Q.extras&&Array.isArray(Q.extras.targetNames)){let $=Q.extras.targetNames;if(J.morphTargetInfluences.length===$.length){J.morphTargetDictionary={};for(let Z=0,W=$.length;Z<W;Z++)J.morphTargetDictionary[$[Z]]=Z}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function vE(J){let Q,$=J.extensions&&J.extensions[x0.KHR_DRACO_MESH_COMPRESSION];if($)Q="draco:"+$.bufferView+":"+$.indices+":"+FZ($.attributes);else Q=J.indices+":"+FZ(J.attributes)+":"+J.mode;if(J.targets!==void 0)for(let Z=0,W=J.targets.length;Z<W;Z++)Q+=":"+FZ(J.targets[Z]);return Q}function FZ(J){let Q="",$=Object.keys(J).sort();for(let Z=0,W=$.length;Z<W;Z++)Q+=$[Z]+":"+J[$[Z]]+";";return Q}function kZ(J){switch(J){case Int8Array:return 0.007874015748031496;case Uint8Array:return 0.00392156862745098;case Int16Array:return 0.00003051850947599719;case Uint16Array:return 0.000015259021896696422;default:throw Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function yE(J){if(J.search(/\.jpe?g($|\?)/i)>0||J.search(/^data\:image\/jpeg/)===0)return"image/jpeg";if(J.search(/\.webp($|\?)/i)>0||J.search(/^data\:image\/webp/)===0)return"image/webp";if(J.search(/\.ktx2($|\?)/i)>0||J.search(/^data\:image\/ktx2/)===0)return"image/ktx2";return"image/png"}var hE=new j0;class AK{constructor(J={},Q={}){this.json=J,this.extensions={},this.plugins={},this.options=Q,this.cache=new IE,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let $=!1,Z=-1,W=!1,H=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let K=navigator.userAgent;$=/^((?!chrome|android).)*safari/i.test(K)===!0;let Y=K.match(/Version\/(\d+)/);Z=$&&Y?parseInt(Y[1],10):-1,W=K.indexOf("Firefox")>-1,H=W?K.match(/Firefox\/([0-9]+)\./)[1]:-1}if(typeof createImageBitmap>"u"||$&&Z<17||W&&H<98)this.textureLoader=new c6(this.options.manager);else this.textureLoader=new a6(this.options.manager);if(this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new h7(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials")this.fileLoader.setWithCredentials(!0)}setExtensions(J){this.extensions=J}setPlugins(J){this.plugins=J}parse(J,Q){let $=this,Z=this.json,W=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(H){return H._markDefs&&H._markDefs()}),Promise.all(this._invokeAll(function(H){return H.beforeRoot&&H.beforeRoot()})).then(function(){return Promise.all([$.getDependencies("scene"),$.getDependencies("animation"),$.getDependencies("camera")])}).then(function(H){let K={scene:H[0][Z.scene||0],scenes:H[0],animations:H[1],cameras:H[2],asset:Z.asset,parser:$,userData:{}};return z8(W,K,Z),B9(K,Z),Promise.all($._invokeAll(function(Y){return Y.afterRoot&&Y.afterRoot(K)})).then(function(){for(let Y of K.scenes)Y.updateMatrixWorld();J(K)})}).catch(Q)}_markDefs(){let J=this.json.nodes||[],Q=this.json.skins||[],$=this.json.meshes||[];for(let Z=0,W=Q.length;Z<W;Z++){let H=Q[Z].joints;for(let K=0,Y=H.length;K<Y;K++)J[H[K]].isBone=!0}for(let Z=0,W=J.length;Z<W;Z++){let H=J[Z];if(H.mesh!==void 0){if(this._addNodeRef(this.meshCache,H.mesh),H.skin!==void 0)$[H.mesh].isSkinnedMesh=!0}if(H.camera!==void 0)this._addNodeRef(this.cameraCache,H.camera)}}_addNodeRef(J,Q){if(Q===void 0)return;if(J.refs[Q]===void 0)J.refs[Q]=J.uses[Q]=0;J.refs[Q]++}_getNodeRef(J,Q,$){if(J.refs[Q]<=1)return $;let Z=$.clone(),W=(H,K)=>{let Y=this.associations.get(H);if(Y!=null)this.associations.set(K,Y);for(let[X,U]of H.children.entries())W(U,K.children[X])};return W($,Z),Z.name+="_instance_"+J.uses[Q]++,Z}_invokeOne(J){let Q=Object.values(this.plugins);Q.push(this);for(let $=0;$<Q.length;$++){let Z=J(Q[$]);if(Z)return Z}return null}_invokeAll(J){let Q=Object.values(this.plugins);Q.unshift(this);let $=[];for(let Z=0;Z<Q.length;Z++){let W=J(Q[Z]);if(W)$.push(W)}return $}getDependency(J,Q){let $=J+":"+Q,Z=this.cache.get($);if(!Z){switch(J){case"scene":Z=this.loadScene(Q);break;case"node":Z=this._invokeOne(function(W){return W.loadNode&&W.loadNode(Q)});break;case"mesh":Z=this._invokeOne(function(W){return W.loadMesh&&W.loadMesh(Q)});break;case"accessor":Z=this.loadAccessor(Q);break;case"bufferView":Z=this._invokeOne(function(W){return W.loadBufferView&&W.loadBufferView(Q)});break;case"buffer":Z=this.loadBuffer(Q);break;case"material":Z=this._invokeOne(function(W){return W.loadMaterial&&W.loadMaterial(Q)});break;case"texture":Z=this._invokeOne(function(W){return W.loadTexture&&W.loadTexture(Q)});break;case"skin":Z=this.loadSkin(Q);break;case"animation":Z=this._invokeOne(function(W){return W.loadAnimation&&W.loadAnimation(Q)});break;case"camera":Z=this.loadCamera(Q);break;default:if(Z=this._invokeOne(function(W){return W!=this&&W.getDependency&&W.getDependency(J,Q)}),!Z)throw Error("Unknown type: "+J);break}this.cache.add($,Z)}return Z}getDependencies(J){let Q=this.cache.get(J);if(!Q){let $=this,Z=this.json[J+(J==="mesh"?"es":"s")]||[];Q=Promise.all(Z.map(function(W,H){return $.getDependency(J,H)})),this.cache.add(J,Q)}return Q}loadBuffer(J){let Q=this.json.buffers[J],$=this.fileLoader;if(Q.type&&Q.type!=="arraybuffer")throw Error("THREE.GLTFLoader: "+Q.type+" buffer type is not supported.");if(Q.uri===void 0&&J===0)return Promise.resolve(this.extensions[x0.KHR_BINARY_GLTF].body);let Z=this.options;return new Promise(function(W,H){$.load(J8.resolveURL(Q.uri,Z.path),W,void 0,function(){H(Error('THREE.GLTFLoader: Failed to load buffer "'+Q.uri+'".'))})})}loadBufferView(J){let Q=this.json.bufferViews[J];return this.getDependency("buffer",Q.buffer).then(function($){let Z=Q.byteLength||0,W=Q.byteOffset||0;return $.slice(W,W+Z)})}loadAccessor(J){let Q=this,$=this.json,Z=this.json.accessors[J];if(Z.bufferView===void 0&&Z.sparse===void 0){let H=qZ[Z.type],K=Y7[Z.componentType],Y=Z.normalized===!0,X=new K(Z.count*H);return Promise.resolve(new DJ(X,H,Y))}let W=[];if(Z.bufferView!==void 0)W.push(this.getDependency("bufferView",Z.bufferView));else W.push(null);if(Z.sparse!==void 0)W.push(this.getDependency("bufferView",Z.sparse.indices.bufferView)),W.push(this.getDependency("bufferView",Z.sparse.values.bufferView));return Promise.all(W).then(function(H){let K=H[0],Y=qZ[Z.type],X=Y7[Z.componentType],U=X.BYTES_PER_ELEMENT,G=U*Y,q=Z.byteOffset||0,E=Z.bufferView!==void 0?$.bufferViews[Z.bufferView].byteStride:void 0,F=Z.normalized===!0,k,B;if(E&&E!==G){let O=Math.floor(q/E),N="InterleavedBuffer:"+Z.bufferView+":"+Z.componentType+":"+O+":"+Z.count,_=Q.cache.get(N);if(!_)k=new X(K,O*E,Z.count*E/U),_=new w7(k,E/U),Q.cache.add(N,_);B=new e8(_,Y,q%E/U,F)}else{if(K===null)k=new X(Z.count*Y);else k=new X(K,q,Z.count*Y);B=new DJ(k,Y,F)}if(Z.sparse!==void 0){let O=qZ.SCALAR,N=Y7[Z.sparse.indices.componentType],_=Z.sparse.indices.byteOffset||0,C=Z.sparse.values.byteOffset||0,D=new N(H[1],_,Z.sparse.count*O),P=new X(H[2],C,Z.sparse.count*Y);if(K!==null)B=new DJ(B.array.slice(),B.itemSize,B.normalized);B.normalized=!1;for(let I=0,w=D.length;I<w;I++){let L=D[I];if(B.setX(L,P[I*Y]),Y>=2)B.setY(L,P[I*Y+1]);if(Y>=3)B.setZ(L,P[I*Y+2]);if(Y>=4)B.setW(L,P[I*Y+3]);if(Y>=5)throw Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}B.normalized=F}return B})}loadTexture(J){let Q=this.json,$=this.options,W=Q.textures[J].source,H=Q.images[W],K=this.textureLoader;if(H.uri){let Y=$.manager.getHandler(H.uri);if(Y!==null)K=Y}return this.loadTextureImage(J,W,K)}loadTextureImage(J,Q,$){let Z=this,W=this.json,H=W.textures[J],K=W.images[Q],Y=(K.uri||K.bufferView)+":"+H.sampler;if(this.textureCache[Y])return this.textureCache[Y];let X=this.loadImageSource(Q,$).then(function(U){if(U.flipY=!1,U.name=H.name||K.name||"",U.name===""&&typeof K.uri==="string"&&K.uri.startsWith("data:image/")===!1)U.name=K.uri;let q=(W.samplers||{})[H.sampler]||{};return U.magFilter=ZK[q.magFilter]||CJ,U.minFilter=ZK[q.minFilter]||R9,U.wrapS=WK[q.wrapS]||s8,U.wrapT=WK[q.wrapT]||s8,U.generateMipmaps=!U.isCompressedTexture&&U.minFilter!==Y9&&U.minFilter!==CJ,Z.associations.set(U,{textures:J}),U}).catch(function(){return null});return this.textureCache[Y]=X,X}loadImageSource(J,Q){let $=this,Z=this.json,W=this.options;if(this.sourceCache[J]!==void 0)return this.sourceCache[J].then((G)=>G.clone());let H=Z.images[J],K=self.URL||self.webkitURL,Y=H.uri||"",X=!1;if(H.bufferView!==void 0)Y=$.getDependency("bufferView",H.bufferView).then(function(G){X=!0;let q=new Blob([G],{type:H.mimeType});return Y=K.createObjectURL(q),Y});else if(H.uri===void 0)throw Error("THREE.GLTFLoader: Image "+J+" is missing URI and bufferView");let U=Promise.resolve(Y).then(function(G){return new Promise(function(q,E){let F=q;if(Q.isImageBitmapLoader===!0)F=function(k){let B=new FJ(k);B.needsUpdate=!0,q(B)};Q.load(J8.resolveURL(G,W.path),F,void 0,E)})}).then(function(G){if(X===!0)K.revokeObjectURL(Y);return B9(G,H),G.userData.mimeType=H.mimeType||yE(H.uri),G}).catch(function(G){throw console.error("THREE.GLTFLoader: Couldn't load texture",Y),G});return this.sourceCache[J]=U,U}assignTexture(J,Q,$,Z){let W=this;return this.getDependency("texture",$.index).then(function(H){if(!H)return null;if($.texCoord!==void 0&&$.texCoord>0)H=H.clone(),H.channel=$.texCoord;if(W.extensions[x0.KHR_TEXTURE_TRANSFORM]){let K=$.extensions!==void 0?$.extensions[x0.KHR_TEXTURE_TRANSFORM]:void 0;if(K){let Y=W.associations.get(H);H=W.extensions[x0.KHR_TEXTURE_TRANSFORM].extendTexture(H,K),W.associations.set(H,Y)}}if(Z!==void 0)H.colorSpace=Z;return J[Q]=H,H})}assignFinalMaterial(J){let{geometry:Q,material:$}=J,Z=Q.attributes.tangent===void 0,W=Q.attributes.color!==void 0,H=Q.attributes.normal===void 0;if(J.isPoints){let K="PointsMaterial:"+$.uuid,Y=this.cache.get(K);if(!Y)Y=new y7,fJ.prototype.copy.call(Y,$),Y.color.copy($.color),Y.map=$.map,Y.sizeAttenuation=!1,this.cache.add(K,Y);$=Y}else if(J.isLine){let K="LineBasicMaterial:"+$.uuid,Y=this.cache.get(K);if(!Y)Y=new v7,fJ.prototype.copy.call(Y,$),Y.color.copy($.color),Y.map=$.map,this.cache.add(K,Y);$=Y}if(Z||W||H){let K="ClonedMaterial:"+$.uuid+":";if(Z)K+="derivative-tangents:";if(W)K+="vertex-colors:";if(H)K+="flat-shading:";let Y=this.cache.get(K);if(!Y){if(Y=$.clone(),W)Y.vertexColors=!0;if(H)Y.flatShading=!0;if(Z){if(Y.normalScale)Y.normalScale.y*=-1;if(Y.clearcoatNormalScale)Y.clearcoatNormalScale.y*=-1}this.cache.add(K,Y),this.associations.set(Y,this.associations.get($))}$=Y}J.material=$}getMaterialType(){return y9}loadMaterial(J){let Q=this,$=this.json,Z=this.extensions,W=$.materials[J],H,K={},Y=W.extensions||{},X=[];if(Y[x0.KHR_MATERIALS_UNLIT]){let G=Z[x0.KHR_MATERIALS_UNLIT];H=G.getMaterialType(),X.push(G.extendParams(K,W,Q))}else{let G=W.pbrMetallicRoughness||{};if(K.color=new I0(1,1,1),K.opacity=1,Array.isArray(G.baseColorFactor)){let q=G.baseColorFactor;K.color.setRGB(q[0],q[1],q[2],pJ),K.opacity=q[3]}if(G.baseColorTexture!==void 0)X.push(Q.assignTexture(K,"map",G.baseColorTexture,L9));if(K.metalness=G.metallicFactor!==void 0?G.metallicFactor:1,K.roughness=G.roughnessFactor!==void 0?G.roughnessFactor:1,G.metallicRoughnessTexture!==void 0)X.push(Q.assignTexture(K,"metalnessMap",G.metallicRoughnessTexture)),X.push(Q.assignTexture(K,"roughnessMap",G.metallicRoughnessTexture));H=this._invokeOne(function(q){return q.getMaterialType&&q.getMaterialType(J)}),X.push(Promise.all(this._invokeAll(function(q){return q.extendMaterialParams&&q.extendMaterialParams(J,K)})))}if(W.doubleSided===!0)K.side=aJ;let U=W.alphaMode||NZ.OPAQUE;if(U===NZ.BLEND)K.transparent=!0,K.depthWrite=!1;else if(K.transparent=!1,U===NZ.MASK)K.alphaTest=W.alphaCutoff!==void 0?W.alphaCutoff:0.5;if(W.normalTexture!==void 0&&H!==mJ){if(X.push(Q.assignTexture(K,"normalMap",W.normalTexture)),K.normalScale=new y0(1,1),W.normalTexture.scale!==void 0){let G=W.normalTexture.scale;K.normalScale.set(G,G)}}if(W.occlusionTexture!==void 0&&H!==mJ){if(X.push(Q.assignTexture(K,"aoMap",W.occlusionTexture)),W.occlusionTexture.strength!==void 0)K.aoMapIntensity=W.occlusionTexture.strength}if(W.emissiveFactor!==void 0&&H!==mJ){let G=W.emissiveFactor;K.emissive=new I0().setRGB(G[0],G[1],G[2],pJ)}if(W.emissiveTexture!==void 0&&H!==mJ)X.push(Q.assignTexture(K,"emissiveMap",W.emissiveTexture,L9));return Promise.all(X).then(function(){let G=new H(K);if(W.name)G.name=W.name;if(B9(G,W),Q.associations.set(G,{materials:J}),W.extensions)z8(Z,G,W);return G})}createUniqueName(J){let Q=s0.sanitizeNodeName(J||"");if(Q in this.nodeNamesUsed)return Q+"_"+ ++this.nodeNamesUsed[Q];else return this.nodeNamesUsed[Q]=0,Q}loadGeometries(J){let Q=this,$=this.extensions,Z=this.primitiveCache;function W(K){return $[x0.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(K,Q).then(function(Y){return HK(Y,K,Q)})}let H=[];for(let K=0,Y=J.length;K<Y;K++){let X=J[K],U=vE(X),G=Z[U];if(G)H.push(G.promise);else{let q;if(X.extensions&&X.extensions[x0.KHR_DRACO_MESH_COMPRESSION])q=W(X);else q=HK(new yJ,X,Q);Z[U]={primitive:X,promise:q},H.push(q)}}return Promise.all(H)}loadMesh(J){let Q=this,$=this.json,Z=this.extensions,W=$.meshes[J],H=W.primitives,K=[];for(let Y=0,X=H.length;Y<X;Y++){let U=H[Y].material===void 0?TE(this.cache):this.getDependency("material",H[Y].material);K.push(U)}return K.push(Q.loadGeometries(H)),Promise.all(K).then(function(Y){let X=Y.slice(0,Y.length-1),U=Y[Y.length-1],G=[];for(let E=0,F=U.length;E<F;E++){let k=U[E],B=H[E],O,N=X[E];if(B.mode===J9.TRIANGLES||B.mode===J9.TRIANGLE_STRIP||B.mode===J9.TRIANGLE_FAN||B.mode===void 0){if(O=W.isSkinnedMesh===!0?new h6(k,N):new YJ(k,N),O.isSkinnedMesh===!0)O.normalizeSkinWeights();if(B.mode===J9.TRIANGLE_STRIP)O.geometry=EZ(O.geometry,C7);else if(B.mode===J9.TRIANGLE_FAN)O.geometry=EZ(O.geometry,r8)}else if(B.mode===J9.LINES)O=new f6(k,N);else if(B.mode===J9.LINE_STRIP)O=new $7(k,N);else if(B.mode===J9.LINE_LOOP)O=new b6(k,N);else if(B.mode===J9.POINTS)O=new x6(k,N);else throw Error("THREE.GLTFLoader: Primitive mode unsupported: "+B.mode);if(Object.keys(O.geometry.morphAttributes).length>0)jE(O,W);if(O.name=Q.createUniqueName(W.name||"mesh_"+J),B9(O,W),B.extensions)z8(Z,O,B);Q.assignFinalMaterial(O),G.push(O)}for(let E=0,F=G.length;E<F;E++)Q.associations.set(G[E],{meshes:J,primitives:E});if(G.length===1){if(W.extensions)z8(Z,G[0],W);return G[0]}let q=new q9;if(W.extensions)z8(Z,q,W);Q.associations.set(q,{meshes:J});for(let E=0,F=G.length;E<F;E++)q.add(G[E]);return q})}loadCamera(J){let Q,$=this.json.cameras[J],Z=$[$.type];if(!Z){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}if($.type==="perspective")Q=new LJ(j$.radToDeg(Z.yfov),Z.aspectRatio||1,Z.znear||1,Z.zfar||2000000);else if($.type==="orthographic")Q=new V8(-Z.xmag,Z.xmag,Z.ymag,-Z.ymag,Z.znear,Z.zfar);if($.name)Q.name=this.createUniqueName($.name);return B9(Q,$),Promise.resolve(Q)}loadSkin(J){let Q=this.json.skins[J],$=[];for(let Z=0,W=Q.joints.length;Z<W;Z++)$.push(this._loadNodeShallow(Q.joints[Z]));if(Q.inverseBindMatrices!==void 0)$.push(this.getDependency("accessor",Q.inverseBindMatrices));else $.push(null);return Promise.all($).then(function(Z){let W=Z.pop(),H=Z,K=[],Y=[];for(let X=0,U=H.length;X<U;X++){let G=H[X];if(G){K.push(G);let q=new j0;if(W!==null)q.fromArray(W.array,X*16);Y.push(q)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',Q.joints[X])}return new S7(K,Y)})}loadAnimation(J){let Q=this.json,$=this,Z=Q.animations[J],W=Z.name?Z.name:"animation_"+J,H=[],K=[],Y=[],X=[],U=[];for(let G=0,q=Z.channels.length;G<q;G++){let E=Z.channels[G],F=Z.samplers[E.sampler],k=E.target,B=k.node,O=Z.parameters!==void 0?Z.parameters[F.input]:F.input,N=Z.parameters!==void 0?Z.parameters[F.output]:F.output;if(k.node===void 0)continue;H.push(this.getDependency("node",B)),K.push(this.getDependency("accessor",O)),Y.push(this.getDependency("accessor",N)),X.push(F),U.push(k)}return Promise.all([Promise.all(H),Promise.all(K),Promise.all(Y),Promise.all(X),Promise.all(U)]).then(function(G){let q=G[0],E=G[1],F=G[2],k=G[3],B=G[4],O=[];for(let _=0,C=q.length;_<C;_++){let D=q[_],P=E[_],I=F[_],w=k[_],L=B[_];if(D===void 0)continue;if(D.updateMatrix)D.updateMatrix();let z=$._createAnimationTracks(D,P,I,w,L);if(z)for(let g=0;g<z.length;g++)O.push(z[g])}let N=new d8(W,void 0,O);return B9(N,Z),N})}createNodeMesh(J){let Q=this.json,$=this,Z=Q.nodes[J];if(Z.mesh===void 0)return null;return $.getDependency("mesh",Z.mesh).then(function(W){let H=$._getNodeRef($.meshCache,Z.mesh,W);if(Z.weights!==void 0)H.traverse(function(K){if(!K.isMesh)return;for(let Y=0,X=Z.weights.length;Y<X;Y++)K.morphTargetInfluences[Y]=Z.weights[Y]});return H})}loadNode(J){let Q=this.json,$=this,Z=Q.nodes[J],W=$._loadNodeShallow(J),H=[],K=Z.children||[];for(let X=0,U=K.length;X<U;X++)H.push($.getDependency("node",K[X]));let Y=Z.skin===void 0?Promise.resolve(null):$.getDependency("skin",Z.skin);return Promise.all([W,Promise.all(H),Y]).then(function(X){let U=X[0],G=X[1],q=X[2];if(q!==null)U.traverse(function(E){if(!E.isSkinnedMesh)return;E.bind(q,hE)});for(let E=0,F=G.length;E<F;E++)U.add(G[E]);if(U.userData.pivot!==void 0&&G.length>0){let E=U.userData.pivot,F=G[0];U.pivot=new y().fromArray(E),U.position.x-=E[0],U.position.y-=E[1],U.position.z-=E[2],F.position.set(0,0,0),delete U.userData.pivot}return U})}_loadNodeShallow(J){let Q=this.json,$=this.extensions,Z=this;if(this.nodeCache[J]!==void 0)return this.nodeCache[J];let W=Q.nodes[J],H=W.name?Z.createUniqueName(W.name):"",K=[],Y=Z._invokeOne(function(X){return X.createNodeMesh&&X.createNodeMesh(J)});if(Y)K.push(Y);if(W.camera!==void 0)K.push(Z.getDependency("camera",W.camera).then(function(X){return Z._getNodeRef(Z.cameraCache,W.camera,X)}));return Z._invokeAll(function(X){return X.createNodeAttachment&&X.createNodeAttachment(J)}).forEach(function(X){K.push(X)}),this.nodeCache[J]=Promise.all(K).then(function(X){let U;if(W.isBone===!0)U=new A7;else if(X.length>1)U=new q9;else if(X.length===1)U=X[0];else U=new t0;if(U!==X[0])for(let G=0,q=X.length;G<q;G++)U.add(X[G]);if(W.name)U.userData.name=W.name,U.name=H;if(B9(U,W),W.extensions)z8($,U,W);if(W.matrix!==void 0){let G=new j0;G.fromArray(W.matrix),U.applyMatrix4(G)}else{if(W.translation!==void 0)U.position.fromArray(W.translation);if(W.rotation!==void 0)U.quaternion.fromArray(W.rotation);if(W.scale!==void 0)U.scale.fromArray(W.scale)}if(!Z.associations.has(U))Z.associations.set(U,{});else if(W.mesh!==void 0&&Z.meshCache.refs[W.mesh]>1){let G=Z.associations.get(U);Z.associations.set(U,{...G})}return Z.associations.get(U).nodes=J,U}),this.nodeCache[J]}loadScene(J){let Q=this.extensions,$=this.json.scenes[J],Z=this,W=new q9;if($.name)W.name=Z.createUniqueName($.name);if(B9(W,$),$.extensions)z8(Q,W,$);let H=$.nodes||[],K=[];for(let Y=0,X=H.length;Y<X;Y++)K.push(Z.getDependency("node",H[Y]));return Promise.all(K).then(function(Y){for(let U=0,G=Y.length;U<G;U++){let q=Y[U];if(q.parent!==null)W.add(JK(q));else W.add(q)}let X=(U)=>{let G=new Map;for(let[q,E]of Z.associations)if(q instanceof fJ||q instanceof FJ)G.set(q,E);return U.traverse((q)=>{let E=Z.associations.get(q);if(E!=null)G.set(q,E)}),G};return Z.associations=X(W),W})}_createAnimationTracks(J,Q,$,Z,W){let H=[],K=J.name?J.name:J.uuid,Y=[];function X(E){if(E.morphTargetInfluences)Y.push(E.name?E.name:E.uuid)}if($8[W.path]===$8.weights){if(X(J),J.isGroup)J.children.forEach(X)}else Y.push(K);let U;switch($8[W.path]){case $8.weights:U=r9;break;case $8.rotation:U=t9;break;case $8.translation:case $8.scale:U=D8;break;default:switch($.itemSize){case 1:U=r9;break;case 2:case 3:default:U=D8;break}break}let G=Z.interpolation!==void 0?AE[Z.interpolation]:w6,q=this._getArrayFromAccessor($);for(let E=0,F=Y.length;E<F;E++){let k=new U(Y[E]+"."+$8[W.path],Q.array,q,G);if(Z.interpolation==="CUBICSPLINE")this._createCubicSplineTrackInterpolant(k);H.push(k)}return H}_getArrayFromAccessor(J){let Q=J.array;if(J.normalized){let $=kZ(Q.constructor),Z=new Float32Array(Q.length);for(let W=0,H=Q.length;W<H;W++)Z[W]=Q[W]*$;Q=Z}return Q}_createCubicSplineTrackInterpolant(J){J.createInterpolant=function($){return new(this instanceof t9?wK:DZ)(this.times,this.values,this.getValueSize()/3,$)},J.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function fE(J,Q,$){let Z=Q.attributes,W=new tJ;if(Z.POSITION!==void 0){let Y=$.json.accessors[Z.POSITION],X=Y.min,U=Y.max;if(X!==void 0&&U!==void 0){if(W.set(new y(X[0],X[1],X[2]),new y(U[0],U[1],U[2])),Y.normalized){let G=kZ(Y7[Y.componentType]);W.min.multiplyScalar(G),W.max.multiplyScalar(G)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let H=Q.targets;if(H!==void 0){let Y=new y,X=new y;for(let U=0,G=H.length;U<G;U++){let q=H[U];if(q.POSITION!==void 0){let E=$.json.accessors[q.POSITION],F=E.min,k=E.max;if(F!==void 0&&k!==void 0){if(X.setX(Math.max(Math.abs(F[0]),Math.abs(k[0]))),X.setY(Math.max(Math.abs(F[1]),Math.abs(k[1]))),X.setZ(Math.max(Math.abs(F[2]),Math.abs(k[2]))),E.normalized){let B=kZ(Y7[E.componentType]);X.multiplyScalar(B)}Y.max(X)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}W.expandByVector(Y)}J.boundingBox=W;let K=new lJ;W.getCenter(K.center),K.radius=W.min.distanceTo(W.max)/2,J.boundingSphere=K}function HK(J,Q,$){let Z=Q.attributes,W=[];function H(K,Y){return $.getDependency("accessor",K).then(function(X){J.setAttribute(Y,X)})}for(let K in Z){let Y=RZ[K]||K.toLowerCase();if(Y in J.attributes)continue;W.push(H(Z[K],Y))}if(Q.indices!==void 0&&!J.index){let K=$.getDependency("accessor",Q.indices).then(function(Y){J.setIndex(Y)});W.push(K)}if(b0.workingColorSpace!==pJ&&"COLOR_0"in Z)console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${b0.workingColorSpace}" not supported.`);return B9(J,Q),fE(J,Q,$),Promise.all(W).then(function(){return Q.targets!==void 0?SE(J,Q.targets,$):J})}var TK=function(){var J="b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuixkbeeeddddillviebeoweuecj:Gdkr;Neqo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949WboY9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVJ9V29VVbrl79IV9Rbwq:VZkdbk:XYi5ud9:du8Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaicefhxcj;abad9Uc;WFbGcjdadca0EhmaialfgPar9Rgoadfhsavaoadz:jjjjbgzceVhHcbhOdndninaeaO9nmeaPax9RaD6mdamaeaO9RaOamfgoae6EgAcsfglc9WGhCabaOad2fhXaAcethQaxaDfhiaOaeaoaeao6E9RhLalcl4cifcd4hKazcj;cbfaAfhYcbh8AazcjdfhEaHh3incbh5dnawTmbaxa8Acd4fRbbh5kcbh8Eazcj;cbfhqinaih8Fdndndndna5a8Ecet4ciGgoc9:fPdebdkaPa8F9RaA6mrazcj;cbfa8EaA2fa8FaAz:jjjjb8Aa8FaAfhixdkazcj;cbfa8EaA2fcbaAz:kjjjb8Aa8FhixekaPa8F9RaK6mva8FaKfhidnaCTmbaPai9RcK6mbaocdtc:q:G:cjbfcj:G:cjbawEhaczhrcbhlinargoc9Wfghaqfhrdndndndndndnaaa8Fahco4fRbbalcoG4ciGcdtfydbPDbedvivvvlvkar9cb83bwar9cb83bbxlkarcbaiRbdai8Xbb9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbaqaofgrcGfcbaicdfa8J9c8N1:NfghRbbag9cjjjjjw:dg8J9qE86bbarcVfcbaha8J9c8M1:NfghRbbag9cjjjjjl:dg8J9qE86bbarc7fcbaha8J9c8L1:NfghRbbag9cjjjjjd:dg8J9qE86bbarctfcbaha8J9c8K1:NfghRbbag9cjjjjje:dg8J9qE86bbarc91fcbaha8J9c8J1:NfghRbbag9cjjjj;ab:dg8J9qE86bbarc4fcbaha8J9cg1:NfghRbbag9cjjjja:dg8J9qE86bbarc93fcbaha8J9ch1:NfghRbbag9cjjjjz:dgg9qE86bbarc94fcbahag9ca1:NfghRbbai8Xbe9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbarc95fcbaha8J9c8N1:NfgiRbbag9cjjjjjw:dg8J9qE86bbarc96fcbaia8J9c8M1:NfgiRbbag9cjjjjjl:dg8J9qE86bbarc97fcbaia8J9c8L1:NfgiRbbag9cjjjjjd:dg8J9qE86bbarc98fcbaia8J9c8K1:NfgiRbbag9cjjjjje:dg8J9qE86bbarc99fcbaia8J9c8J1:NfgiRbbag9cjjjj;ab:dg8J9qE86bbarc9:fcbaia8J9cg1:NfgiRbbag9cjjjja:dg8J9qE86bbarcufcbaia8J9ch1:NfgiRbbag9cjjjjz:dgg9qE86bbaiag9ca1:NfhixikaraiRblaiRbbghco4g8Ka8KciSg8KE86bbaqaofgrcGfaiclfa8Kfg8KRbbahcl4ciGg8La8LciSg8LE86bbarcVfa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc7fa8Ka8Lfg8KRbbahciGghahciSghE86bbarctfa8Kahfg8KRbbaiRbeghco4g8La8LciSg8LE86bbarc91fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc4fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc93fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc94fa8Kahfg8KRbbaiRbdghco4g8La8LciSg8LE86bbarc95fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc96fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc97fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc98fa8KahfghRbbaiRbigico4g8Ka8KciSg8KE86bbarc99faha8KfghRbbaicl4ciGg8Ka8KciSg8KE86bbarc9:faha8KfghRbbaicd4ciGg8Ka8KciSg8KE86bbarcufaha8KfgrRbbaiciGgiaiciSgiE86bbaraifhixdkaraiRbwaiRbbghcl4g8Ka8KcsSg8KE86bbaqaofgrcGfaicwfa8Kfg8KRbbahcsGghahcsSghE86bbarcVfa8KahfghRbbaiRbeg8Kcl4g8La8LcsSg8LE86bbarc7faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarctfaha8KfghRbbaiRbdg8Kcl4g8La8LcsSg8LE86bbarc91faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc4faha8KfghRbbaiRbig8Kcl4g8La8LcsSg8LE86bbarc93faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc94faha8KfghRbbaiRblg8Kcl4g8La8LcsSg8LE86bbarc95faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc96faha8KfghRbbaiRbvg8Kcl4g8La8LcsSg8LE86bbarc97faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc98faha8KfghRbbaiRbog8Kcl4g8La8LcsSg8LE86bbarc99faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc9:faha8KfghRbbaiRbrgicl4g8Ka8KcsSg8KE86bbarcufaha8KfgrRbbaicsGgiaicsSgiE86bbaraifhixekarai8Pbw83bwarai8Pbb83bbaiczfhikdnaoaC9pmbalcdfhlaoczfhraPai9RcL0mekkaoaC6moaimexokaCmva8FTmvkaqaAfhqa8Ecefg8Ecl9hmbkdndndndnawTmbasa8Acd4fRbbgociGPlbedrbkaATmdaza8Afh8Fazcj;cbfhhcbh8EaEhaina8FRbbhraahocbhlinaoahalfRbbgqce4cbaqceG9R7arfgr86bbaoadfhoaAalcefgl9hmbkaacefhaa8Fcefh8FahaAfhha8Ecefg8Ecl9hmbxikkaATmeaza8Afhaazcj;cbfhhcbhoceh8EaYh8FinaEaofhlaa8Vbbhrcbhoinala8FaofRbbcwtahaofRbbgqVc;:FiGce4cbaqceG9R7arfgr87bbaladfhlaLaocefgofmbka8FaQfh8FcdhoaacdfhaahaQfhha8EceGhlcbh8EalmbxdkkaATmbaocl4h8Eaza8AfRbbhqcwhoa3hlinalRbbaotaqVhqalcefhlaocwfgoca9hmbkcbhhaEh8FaYhainazcj;cbfahfRbbhrcwhoaahlinalRbbaotarVhralaAfhlaocwfgoca9hmbkara8E94aq7hqcbhoa8Fhlinalaqao486bbalcefhlaocwfgoca9hmbka8Fadfh8FaacefhaahcefghaA9hmbkkaEclfhEa3clfh3a8Aclfg8Aad6mbkaXazcjdfaAad2z:jjjjb8AazazcjdfaAcufad2fadz:jjjjb8AaAaOfhOaihxaimbkc9:hoxdkcbc99aPax9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaok:ysezu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnalaeci9UgrcHf6mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecjez:kjjjb8Aav9cu83iUav9cu83i8Wav9cu83iyav9cu83iaav9cu83iKav9cu83izav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhldnaeTmbcmcsaDceSEhkcbhxcbhmcbhrcbhicbhoindnalaq9nmbc9:hoxikdndnawRbbgDc;Ve0mbavc;abfaoaDcu7gPcl4fcsGcitfgsydlhzasydbhHdndnaDcsGgsak9pmbavaiaPfcsGcdtfydbaxasEhDaxasTgOfhxxekdndnascsSmbcehOasc987asamffcefhDxekalcefhDal8SbbgscFeGhPdndnascu9mmbaDhlxekalcvfhlaPcFbGhPcrhsdninaD8SbbgOcFbGastaPVhPaOcu9kmeaDcefhDascrfgsc8J9hmbxdkkaDcefhlkcehOaPce4cbaPceG9R7amfhDkaDhmkavc;abfaocitfgsaDBdbasazBdlavaicdtfaDBdbavc;abfaocefcsGcitfgsaHBdbasaDBdlaocdfhoaOaifhidnadcd9hmbabarcetfgsaH87ebasclfaD87ebascdfaz87ebxdkabarcdtfgsaHBdbascwfaDBdbasclfazBdbxekdnaDcpe0mbavaiaqaDcsGfRbbgscl4gP9RcsGcdtfydbaxcefgOaPEhDavaias9RcsGcdtfydbaOaPTgzfgOascsGgPEhsaPThPdndnadcd9hmbabarcetfgHax87ebaHclfas87ebaHcdfaD87ebxekabarcdtfgHaxBdbaHcwfasBdbaHclfaDBdbkavaicdtfaxBdbavc;abfaocitfgHaDBdbaHaxBdlavaicefgicsGcdtfaDBdbavc;abfaocefcsGcitfgHasBdbaHaDBdlavaiazfgicsGcdtfasBdbavc;abfaocdfcsGcitfgDaxBdbaDasBdlaocifhoaiaPfhiaOaPfhxxekaxcbalRbbgsEgHaDc;:eSgDfhOascsGhAdndnascl4gCmbaOcefhzxekaOhzavaiaC9RcsGcdtfydbhOkdndnaAmbazcefhxxekazhxavaias9RcsGcdtfydbhzkdndnaDTmbalcefhDxekalcdfhDal8SbegPcFeGhsdnaPcu9kmbalcofhHascFbGhscrhldninaD8SbbgPcFbGaltasVhsaPcu9kmeaDcefhDalcrfglc8J9hmbkaHhDxekaDcefhDkasce4cbasceG9R7amfgmhHkdndnaCcsSmbaDhsxekaDcefhsaD8SbbglcFeGhPdnalcu9kmbaDcvfhOaPcFbGhPcrhldninas8SbbgDcFbGaltaPVhPaDcu9kmeascefhsalcrfglc8J9hmbkaOhsxekascefhskaPce4cbaPceG9R7amfgmhOkdndnaAcsSmbashlxekascefhlas8SbbgDcFeGhPdnaDcu9kmbascvfhzaPcFbGhPcrhDdninal8SbbgscFbGaDtaPVhPascu9kmealcefhlaDcrfgDc8J9hmbkazhlxekalcefhlkaPce4cbaPceG9R7amfgmhzkdndnadcd9hmbabarcetfgDaH87ebaDclfaz87ebaDcdfaO87ebxekabarcdtfgDaHBdbaDcwfazBdbaDclfaOBdbkavc;abfaocitfgDaOBdbaDaHBdlavaicdtfaHBdbavc;abfaocefcsGcitfgDazBdbaDaOBdlavaicefgicsGcdtfaOBdbavc;abfaocdfcsGcitfgDaHBdbaDazBdlavaiaCTaCcsSVfgicsGcdtfazBdbaiaATaAcsSVfhiaocifhokawcefhwaocsGhoaicsGhiarcifgrae6mbkkcbc99alaqSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnalaecvf9pmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk:4ioiue99dud99dud99dnaeTmbcbhiabhlindndnal8Uebgv:YgoJ:ji:1Salcof8UebgrciVgw:Y:vgDNJbbbZJbbb:;avcu9kEMgq:lJbbb9p9DTmbaq:Ohkxekcjjjj94hkkalclf8Uebhvalcdf8UebhxalarcefciGcetfak87ebdndnax:YgqaDNJbbbZJbbb:;axcu9kEMgm:lJbbb9p9DTmbam:Ohxxekcjjjj94hxkabaiarciGgkfcd7cetfax87ebdndnav:YgmaDNJbbbZJbbb:;avcu9kEMgP:lJbbb9p9DTmbaP:Ohvxekcjjjj94hvkalarcufciGcetfav87ebdndnawaw2:ZgPaPMaoaoN:taqaqN:tamamN:tgoJbbbbaoJbbbb9GE:raDNJbbbZMgD:lJbbb9p9DTmbaD:Ohrxekcjjjj94hrkalakcetfar87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2gdTmbinababydbgecwtcw91:Yaece91cjjj98Gcjjj;8if::NUdbabclfhbadcufgdmbkkk:Tvirud99eudndnadcl9hmbaeTmeindndnabRbbgiabcefgl8Sbbgvabcdfgo8Sbbgrf9R:YJbbuJabcifgwRbbgdce4adVgDcd4aDVgDcl4aDVgD:Z:vgqNJbbbZMgk:lJbbb9p9DTmbak:Ohxxekcjjjj94hxkaoax86bbdndnaraif:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohoxekcjjjj94hokalao86bbdndnavaifar9R:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabai86bbdndnaDadcetGadceGV:ZaqNJbbbZMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkawad86bbabclfhbaecufgembxdkkaeTmbindndnab8Vebgiabcdfgl8Uebgvabclfgo8Uebgrf9R:YJbFu9habcofgw8Vebgdce4adVgDcd4aDVgDcl4aDVgDcw4aDVgD:Z:vgqNJbbbZMgk:lJbbb9p9DTmbak:Ohxxekcjjjj94hxkaoax87ebdndnaraif:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohoxekcjjjj94hokalao87ebdndnavaifar9R:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabai87ebdndnaDadcetGadceGV:ZaqNJbbbZMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkawad87ebabcwfhbaecufgembkkk9teiucbcbyd:K:G:cjbgeabcifc98GfgbBd:K:G:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkk83dbcj:Gdk8Kbbbbdbbblbbbwbbbbbbbebbbdbbblbbbwbbbbc:K:Gdkl8W:qbb",Q="b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuixkbbebeeddddilve9Weeeviebeoweuecj:Gdkr;Neqo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949WbwY9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVJ9V29VVbDl79IV9Rbqq:W9Dklbzik94evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaeai86b:q:W:cjbaecitab8Piw83i:q:G:cjbaecefgecjd9hmbkk:JBl8Aud97dur978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaialfgxar9RhodnadTgmmbavaoad;8qbbkaicefhPcj;abad9Uc;WFbGcjdadca0EhsdndndnadTmbaoadfhzcbhHinaeaH9nmdaxaP9RaD6miabaHad2fhOaPaDfhAasaeaH9RaHasfae6EgCcsfgocl4cifcd4hXavcj;cbfaoc9WGgQcetfhLavcj;cbfaQci2fhKavcj;cbfaQfhYcbh8Aaoc;ab6hEincbh3dnawTmbaPa8Acd4fRbbh3kcbh5avcj;cbfh8Eindndndndna3a5cet4ciGgoc9:fPdebdkaxaA9RaQ6mwdnaQTmbavcj;cbfa5aQ2faAaQ;8qbbkaAaCfhAxdkaQTmeavcj;cbfa5aQ2fcbaQ;8kbxekaxaA9RaX6moaoclVcbawEhraAaXfhocbhidnaEmbaxao9Rc;Gb6mbcbhlina8EalfhidndndndndndnaAalco4fRbbgqciGarfPDbedibledibkaipxbbbbbbbbbbbbbbbbpklbxlkaiaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaoclffagRb:q:W:cjbfhoxikaiaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaocwffagRb:q:W:cjbfhoxdkaiaopbbbpklbaoczfhoxekaiaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbahaocdffagRb:q:W:cjbfhokdndndndndndnaqcd4ciGarfPDbedibledibkaiczfpxbbbbbbbbbbbbbbbbpklbxlkaiczfaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaoclffagRb:q:W:cjbfhoxikaiczfaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaocwffagRb:q:W:cjbfhoxdkaiczfaopbbbpklbaoczfhoxekaiczfaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbahaocdffagRb:q:W:cjbfhokdndndndndndnaqcl4ciGarfPDbedibledibkaicafpxbbbbbbbbbbbbbbbbpklbxlkaicafaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaoclffagRb:q:W:cjbfhoxikaicafaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaocwffagRb:q:W:cjbfhoxdkaicafaopbbbpklbaoczfhoxekaicafaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbahaocdffagRb:q:W:cjbfhokdndndndndndnaqco4arfPDbedibledibkaic8Wfpxbbbbbbbbbbbbbbbbpklbxlkaic8Wfaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Ngicitpbi:q:G:cjbaiRb:q:W:cjbgipsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbaiaoclffaqRb:q:W:cjbfhoxikaic8Wfaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Ngicitpbi:q:G:cjbaiRb:q:W:cjbgipsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbaiaocwffaqRb:q:W:cjbfhoxdkaic8Wfaopbbbpklbaoczfhoxekaic8WfaopbbdaoRbbgicitpbi:q:G:cjbaiRb:q:W:cjbgipsaoRbegqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbaiaocdffaqRb:q:W:cjbfhokalc;abfhialcjefaQ0meaihlaxao9Rc;Fb0mbkkdnaiaQ9pmbaici4hlinaxao9RcK6mwa8EaifhqdndndndndndnaAaico4fRbbalcoG4ciGarfPDbedibledibkaqpxbbbbbbbbbbbbbbbbpkbbxlkaqaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spkbbahaoclffagRb:q:W:cjbfhoxikaqaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spkbbahaocwffagRb:q:W:cjbfhoxdkaqaopbbbpkbbaoczfhoxekaqaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpkbbahaocdffagRb:q:W:cjbfhokalcdfhlaiczfgiaQ6mbkkaohAaoTmoka8EaQfh8Ea5cefg5cl9hmbkdndndndnawTmbaza8Acd4fRbbglciGPlbedwbkaQTmdavcjdfa8Afhlava8Afpbdbh8Jcbhoinalavcj;cbfaofpblbg8KaYaofpblbg8LpmbzeHdOiAlCvXoQrLg8MaLaofpblbg8NaKaofpblbgypmbzeHdOiAlCvXoQrLg8PpmbezHdiOAlvCXorQLg8Fcep9Ta8Fpxeeeeeeeeeeeeeeeegap9op9Hp9rg8Fa8Jp9Ug8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9Abbbaladfgla8Ja8Ma8PpmwDKYqk8AExm35Ps8E8Fg8Fcep9Ta8Faap9op9Hp9rg8Fp9Ug8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9Abbbaladfgla8Ja8Ka8LpmwKDYq8AkEx3m5P8Es8Fg8Ka8NaypmwKDYq8AkEx3m5P8Es8Fg8LpmbezHdiOAlvCXorQLg8Fcep9Ta8Faap9op9Hp9rg8Fp9Ug8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9Abbbaladfgla8Ja8Ka8LpmwDKYqk8AExm35Ps8E8Fg8Fcep9Ta8Faap9op9Hp9rg8Fp9Ugap9Abbbaladfglaaa8Fa8Fpmlvorlvorlvorlvorp9Ugap9Abbbaladfglaaa8Fa8FpmwDqkwDqkwDqkwDqkp9Ugap9Abbbaladfglaaa8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9AbbbaladfhlaoczfgoaQ6mbxikkaQTmeavcjdfa8Afhlava8Afpbdbh8Jcbhoinalavcj;cbfaofpblbg8KaYaofpblbg8LpmbzeHdOiAlCvXoQrLg8MaLaofpblbg8NaKaofpblbgypmbzeHdOiAlCvXoQrLg8PpmbezHdiOAlvCXorQLg8Fcep:nea8Fpxebebebebebebebebgap9op:bep9rg8Fa8Jp:oeg8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9Abbbaladfgla8Ja8Ma8PpmwDKYqk8AExm35Ps8E8Fg8Fcep:nea8Faap9op:bep9rg8Fp:oeg8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9Abbbaladfgla8Ja8Ka8LpmwKDYq8AkEx3m5P8Es8Fg8Ka8NaypmwKDYq8AkEx3m5P8Es8Fg8LpmbezHdiOAlvCXorQLg8Fcep:nea8Faap9op:bep9rg8Fp:oeg8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9Abbbaladfgla8Ja8Ka8LpmwDKYqk8AExm35Ps8E8Fg8Fcep:nea8Faap9op:bep9rg8Fp:oegap9Abbbaladfglaaa8Fa8Fpmlvorlvorlvorlvorp:oegap9Abbbaladfglaaa8Fa8FpmwDqkwDqkwDqkwDqkp:oegap9Abbbaladfglaaa8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9AbbbaladfhlaoczfgoaQ6mbxdkkaQTmbcbhocbalcl4gl9Rc8FGhiavcjdfa8Afhrava8Afpbdbhainaravcj;cbfaofpblbg8JaYaofpblbg8KpmbzeHdOiAlCvXoQrLg8LaLaofpblbg8MaKaofpblbg8NpmbzeHdOiAlCvXoQrLgypmbezHdiOAlvCXorQLg8Faip:Rea8Falp:Tep9qg8Faap9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9Abbbaradfgraaa8LaypmwDKYqk8AExm35Ps8E8Fg8Faip:Rea8Falp:Tep9qg8Fp9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9Abbbaradfgraaa8Ja8KpmwKDYq8AkEx3m5P8Es8Fg8Ja8Ma8NpmwKDYq8AkEx3m5P8Es8Fg8KpmbezHdiOAlvCXorQLg8Faip:Rea8Falp:Tep9qg8Fp9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9Abbbaradfgraaa8Ja8KpmwDKYqk8AExm35Ps8E8Fg8Faip:Rea8Falp:Tep9qg8Fp9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9AbbbaradfhraoczfgoaQ6mbkka8Aclfg8Aad6mbkdnaCad2goTmbaOavcjdfao;8qbbkdnammbavavcjdfaCcufad2fad;8qbbkaCaHfhHc9:hoaAhPaAmbxlkkaeTmbaDalfhrcbhocuhlinaralaD9RglfaD6mdasaeao9Raoasfae6Eaofgoae6mbkaial9RhPkcbc99axaP9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaokwbz:bjjjbkNsezu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnalaeci9UgrcHf6mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecje;8kbav9cu83iUav9cu83i8Wav9cu83iyav9cu83iaav9cu83iKav9cu83izav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhldnaeTmbcmcsaDceSEhkcbhxcbhmcbhrcbhicbhoindnalaq9nmbc9:hoxikdndnawRbbgDc;Ve0mbavc;abfaoaDcu7gPcl4fcsGcitfgsydlhzasydbhHdndnaDcsGgsak9pmbavaiaPfcsGcdtfydbaxasEhDaxasTgOfhxxekdndnascsSmbcehOasc987asamffcefhDxekalcefhDal8SbbgscFeGhPdndnascu9mmbaDhlxekalcvfhlaPcFbGhPcrhsdninaD8SbbgOcFbGastaPVhPaOcu9kmeaDcefhDascrfgsc8J9hmbxdkkaDcefhlkcehOaPce4cbaPceG9R7amfhDkaDhmkavc;abfaocitfgsaDBdbasazBdlavaicdtfaDBdbavc;abfaocefcsGcitfgsaHBdbasaDBdlaocdfhoaOaifhidnadcd9hmbabarcetfgsaH87ebasclfaD87ebascdfaz87ebxdkabarcdtfgsaHBdbascwfaDBdbasclfazBdbxekdnaDcpe0mbavaiaqaDcsGfRbbgscl4gP9RcsGcdtfydbaxcefgOaPEhDavaias9RcsGcdtfydbaOaPTgzfgOascsGgPEhsaPThPdndnadcd9hmbabarcetfgHax87ebaHclfas87ebaHcdfaD87ebxekabarcdtfgHaxBdbaHcwfasBdbaHclfaDBdbkavaicdtfaxBdbavc;abfaocitfgHaDBdbaHaxBdlavaicefgicsGcdtfaDBdbavc;abfaocefcsGcitfgHasBdbaHaDBdlavaiazfgicsGcdtfasBdbavc;abfaocdfcsGcitfgDaxBdbaDasBdlaocifhoaiaPfhiaOaPfhxxekaxcbalRbbgsEgHaDc;:eSgDfhOascsGhAdndnascl4gCmbaOcefhzxekaOhzavaiaC9RcsGcdtfydbhOkdndnaAmbazcefhxxekazhxavaias9RcsGcdtfydbhzkdndnaDTmbalcefhDxekalcdfhDal8SbegPcFeGhsdnaPcu9kmbalcofhHascFbGhscrhldninaD8SbbgPcFbGaltasVhsaPcu9kmeaDcefhDalcrfglc8J9hmbkaHhDxekaDcefhDkasce4cbasceG9R7amfgmhHkdndnaCcsSmbaDhsxekaDcefhsaD8SbbglcFeGhPdnalcu9kmbaDcvfhOaPcFbGhPcrhldninas8SbbgDcFbGaltaPVhPaDcu9kmeascefhsalcrfglc8J9hmbkaOhsxekascefhskaPce4cbaPceG9R7amfgmhOkdndnaAcsSmbashlxekascefhlas8SbbgDcFeGhPdnaDcu9kmbascvfhzaPcFbGhPcrhDdninal8SbbgscFbGaDtaPVhPascu9kmealcefhlaDcrfgDc8J9hmbkazhlxekalcefhlkaPce4cbaPceG9R7amfgmhzkdndnadcd9hmbabarcetfgDaH87ebaDclfaz87ebaDcdfaO87ebxekabarcdtfgDaHBdbaDcwfazBdbaDclfaOBdbkavc;abfaocitfgDaOBdbaDaHBdlavaicdtfaHBdbavc;abfaocefcsGcitfgDazBdbaDaOBdlavaicefgicsGcdtfaOBdbavc;abfaocdfcsGcitfgDaHBdbaDazBdlavaiaCTaCcsSVfgicsGcdtfazBdbaiaATaAcsSVfhiaocifhokawcefhwaocsGhoaicsGhiarcifgrae6mbkkcbc99alaqSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnalaecvf9pmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk;Toio97eue97aec98Ghedndnadcl9hmbaeTmecbhdinababpbbbgicKp:RecKp:Sep;6eglaicwp:RecKp:Sep;6ealp;Geaiczp:RecKp:Sep;6egvp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egralpxbbbjbbbjbbbjbbbjgwp9op9rp;Keglpxbb;:9cbb;:9cbb;:9cbb;:9calalp;Meaoaop;Meavaravawp9op9rp;Keglalp;Mep;Kep;Kep;Jep;Negvp;Mepxbbn0bbn0bbn0bbn0grp;KepxFbbbFbbbFbbbFbbbp9oaipxbbbFbbbFbbbFbbbFp9op9qalavp;Mearp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaoavp;Mearp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbabczfhbadclfgdae6mbxdkkaeTmbcbhdinabczfgDaDpbbbgipxbbbbbbFFbbbbbbFFgwp9oabpbbbgoaipmbediwDqkzHOAKY8AEgvczp:Reczp:Sep;6eglaoaipmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eavczp:Sep;6egvp;Gealp;Gep;Kep;Legipxbbbbbbbbbbbbbbbbp:2egralpxbbbjbbbjbbbjbbbjgqp9op9rp;Keglpxb;:FSb;:FSb;:FSb;:FSalalp;Meaiaip;Meavaravaqp9op9rp;Keglalp;Mep;Kep;Kep;Jep;Negvp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbp9oaiavp;Mearp;Keczp:Rep9qgialavp;Mearp;KepxFFbbFFbbFFbbFFbbp9oglpmwDKYqk8AExm35Ps8E8Fp9qpkbbabaoawp9oaialpmbezHdiOAlvCXorQLp9qpkbbabcafhbadclfgdae6mbkkk;2ileue97euo97dnaec98GgiTmbcbheinabcKfpx:ji:1S:ji:1S:ji:1S:ji:1SabpbbbglabczfgvpbbbgopmlvorxmPsCXQL358E8Fgrczp:Segwpxibbbibbbibbbibbbp9qp;6egDp;NegqaDaDp;MegDaDp;KealaopmbediwDqkzHOAKY8AEgDczp:Reczp:Sep;6eglalp;MeaDczp:Sep;6egoaop;Mearczp:Reczp:Sep;6egrarp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jep;Mepxbbn0bbn0bbn0bbn0gDp;KepxFFbbFFbbFFbbFFbbgkp9oaqaop;MeaDp;Keczp:Rep9qgoaqalp;MeaDp;Keakp9oaqarp;MeaDp;Keczp:Rep9qgDpmwDKYqk8AExm35Ps8E8Fglp5eawclp:RegqpEi:T:j83ibavalp5baqpEd:T:j83ibabcwfaoaDpmbezHdiOAlvCXorQLgDp5eaqpEe:T:j83ibabaDp5baqpEb:T:j83ibabcafhbaeclfgeai6mbkkkuee97dnadcd4ae2c98GgeTmbcbhdinababpbbbgicwp:Recwp:Sep;6eaicep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepkbbabczfhbadclfgdae6mbkkk:Sodw97euaec98Ghedndnadcl9hmbaeTmecbhdinabpxbbuJbbuJbbuJbbuJabpbbbgicKp:TeglaicYp:Tep9qgvcdp:Teavp9qgvclp:Teavp9qgop;6ep;Negvaicwp:RecKp:SegraipxFbbbFbbbFbbbFbbbgwp9ogDp:Uep;6ep;Mepxbbn0bbn0bbn0bbn0gqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9oavaDarp:Xeaiczp:RecKp:Segip:Uep;6ep;Meaqp;Keawp9op9qavaDaraip:Uep:Xep;6ep;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qavaoalcep:Rep9oalpxebbbebbbebbbebbbp9op9qp;6ep;Meaqp;KecKp:Rep9qpkbbabczfhbadclfgdae6mbxdkkaeTmbcbhdinabczfgkpxbFu9hbFu9hbFu9hbFu9habpbbbglakpbbbgrpmlvorxmPsCXQL358E8Fgvczp:TegqavcHp:Tep9qgicdp:Teaip9qgiclp:Teaip9qgicwp:Teaip9qgop;6ep;NegialarpmbediwDqkzHOAKY8AEgDpxFFbbFFbbFFbbFFbbglp9ograDczp:Segwp:Ueavczp:Reczp:SegDp:Xep;6ep;Mepxbbn0bbn0bbn0bbn0gvp;Kealp9oaiarawaDp:Uep:Xep;6ep;Meavp;Keczp:Rep9qgwaiaoaqcep:Rep9oaqpxebbbebbbebbbebbbp9op9qp;6ep;Meavp;Keczp:ReaiaDarp:Uep;6ep;Meavp;Kealp9op9qgipmwDKYqk8AExm35Ps8E8FpkbbabawaipmbezHdiOAlvCXorQLpkbbabcafhbadclfgdae6mbkkk9teiucbcbydj:G:cjbgeabcifc98GfgbBdj:G:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkxebcj:Gdklz:zbb",$=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),Z=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!=="object")return{supported:!1};var W=WebAssembly.validate($)?Y(Q):Y(J),H,K=WebAssembly.instantiate(W,{}).then(function(N){H=N.instance,H.exports.__wasm_call_ctors()});function Y(N){var _=new Uint8Array(N.length);for(var C=0;C<N.length;++C){var D=N.charCodeAt(C);_[C]=D>96?D-97:D>64?D-39:D+4}var P=0;for(var C=0;C<N.length;++C)_[P++]=_[C]<60?Z[_[C]]:(_[C]-60)*64+_[++C];return _.buffer.slice(0,P)}function X(N,_,C,D,P,I,w){var L=N.exports.sbrk,z=D+3&-4,g=L(z*P),A=L(I.length),m=new Uint8Array(N.exports.memory.buffer);m.set(I,A);var a=_(g,D,P,A,I.length);if(a==0&&w)w(g,z,P);if(C.set(m.subarray(g,g+D*P)),L(g-L(0)),a!=0)throw Error("Malformed buffer data: "+a)}var U={NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp",COLOR:"meshopt_decodeFilterColor"},G={ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"},q=[],E=0;function F(N){var _={object:new Worker(N),pending:0,requests:{}};return _.object.onmessage=function(C){var D=C.data;_.pending-=D.count,_.requests[D.id][D.action](D.value),delete _.requests[D.id]},_}function k(N){var _="self.ready = WebAssembly.instantiate(new Uint8Array(["+new Uint8Array(W)+"]), {}).then(function(result) { result.instance.exports.__wasm_call_ctors(); return result.instance; });self.onmessage = "+O.name+";"+X.toString()+O.toString(),C=new Blob([_],{type:"text/javascript"}),D=URL.createObjectURL(C);for(var P=q.length;P<N;++P)q[P]=F(D);for(var P=N;P<q.length;++P)q[P].object.postMessage({});q.length=N,URL.revokeObjectURL(D)}function B(N,_,C,D,P){var I=q[0];for(var w=1;w<q.length;++w)if(q[w].pending<I.pending)I=q[w];return new Promise(function(L,z){var g=new Uint8Array(C),A=++E;I.pending+=N,I.requests[A]={resolve:L,reject:z},I.object.postMessage({id:A,count:N,size:_,source:g,mode:D,filter:P},[g.buffer])})}function O(N){var _=N.data;self.ready.then(function(C){if(!_.id)return self.close();try{var D=new Uint8Array(_.count*_.size);X(C,C.exports[_.mode],D,_.count,_.size,_.source,C.exports[_.filter]),self.postMessage({id:_.id,count:_.count,action:"resolve",value:D},[D.buffer])}catch(P){self.postMessage({id:_.id,count:_.count,action:"reject",value:P})}})}return{ready:K,supported:!0,useWorkers:function(N){k(N)},decodeVertexBuffer:function(N,_,C,D,P){X(H,H.exports.meshopt_decodeVertexBuffer,N,_,C,D,H.exports[U[P]])},decodeIndexBuffer:function(N,_,C,D){X(H,H.exports.meshopt_decodeIndexBuffer,N,_,C,D)},decodeIndexSequence:function(N,_,C,D){X(H,H.exports.meshopt_decodeIndexSequence,N,_,C,D)},decodeGltfBuffer:function(N,_,C,D,P,I){X(H,H.exports[G[P]],N,_,C,D,H.exports[U[I]])},decodeGltfBufferAsync:function(N,_,C,D,P){if(q.length>0)return B(N,_,C,G[D],U[P]);return K.then(function(){var I=new Uint8Array(N*_);return X(H,H.exports[G[D]],I,N,_,C,H.exports[U[P]]),I})}}}();class VZ extends t8{constructor(){super();this.name="RoomEnvironment",this.position.y=-3.5;let J=new o9;J.deleteAttribute("uv");let Q=new y9({side:TJ}),$=new y9,Z=new W7(16777215,900,28,2);Z.position.set(0.418,16.199,0.3),this.add(Z);let W=new YJ(J,Q);W.position.set(-0.757,13.219,0.717),W.scale.set(31.713,28.305,28.591),this.add(W);let H=new Q7(J,$,6),K=new t0;K.position.set(-10.906,2.009,1.846),K.rotation.set(0,-0.195,0),K.scale.set(2.328,7.905,4.651),K.updateMatrix(),H.setMatrixAt(0,K.matrix),K.position.set(-5.607,-0.754,-0.758),K.rotation.set(0,0.994,0),K.scale.set(1.97,1.534,3.955),K.updateMatrix(),H.setMatrixAt(1,K.matrix),K.position.set(6.167,0.857,7.803),K.rotation.set(0,0.561,0),K.scale.set(3.927,6.285,3.687),K.updateMatrix(),H.setMatrixAt(2,K.matrix),K.position.set(-2.017,0.018,6.124),K.rotation.set(0,0.333,0),K.scale.set(2.002,4.566,2.064),K.updateMatrix(),H.setMatrixAt(3,K.matrix),K.position.set(2.291,-0.756,-2.621),K.rotation.set(0,-0.286,0),K.scale.set(1.546,1.552,1.496),K.updateMatrix(),H.setMatrixAt(4,K.matrix),K.position.set(-2.193,-0.369,-5.547),K.rotation.set(0,0.516,0),K.scale.set(3.875,3.487,2.986),K.updateMatrix(),H.setMatrixAt(5,K.matrix),this.add(H);let Y=new YJ(J,X7(50));Y.position.set(-16.116,14.37,8.208),Y.scale.set(0.1,2.428,2.739),this.add(Y);let X=new YJ(J,X7(50));X.position.set(-16.109,18.021,-8.207),X.scale.set(0.1,2.425,2.751),this.add(X);let U=new YJ(J,X7(17));U.position.set(14.904,12.198,-1.832),U.scale.set(0.15,4.265,6.331),this.add(U);let G=new YJ(J,X7(43));G.position.set(-0.462,8.89,14.52),G.scale.set(4.38,5.441,0.088),this.add(G);let q=new YJ(J,X7(20));q.position.set(3.235,11.486,-12.541),q.scale.set(2.5,2,0.1),this.add(q);let E=new YJ(J,X7(100));E.position.set(0,20,0),E.scale.set(1,0.1,1),this.add(E)}dispose(){let J=new Set;this.traverse((Q)=>{if(Q.isMesh)J.add(Q.geometry),J.add(Q.material)});for(let Q of J)Q.dispose()}}function X7(J){return new m6({color:0,emissive:16777215,emissiveIntensity:J})}var bE="BoasVindas",xE=0.4,gE=new y(-0.18,2.05,9.2),pE=new y(-0.18,1.95,0),lE=4860422;async function mE(J){let Q=await J.glb,$=await new LZ().setMeshoptDecoder(TK).parseAsync(Q,"/"),Z=J.stage,W=new GZ({antialias:!0,alpha:!0,powerPreference:"high-performance"});W.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),W.outputColorSpace=L9,W.toneMapping=B7,W.toneMappingExposure=0.8,W.setClearColor(0,0);let H=W.domElement;H.className="splash-canvas";let K=new t8,Y=new p7(W),X=new VZ,U=Y.fromScene(X,0.04).texture;X.dispose(),Y.dispose(),K.environment=U,K.environmentIntensity=0.45,K.add(new n6(16773584,1845837,0.7));let G=new M8(16771010,2.4);G.position.set(-3.5,6,6),K.add(G);let q=new M8(13623551,2.2);q.position.set(4,4,-5),K.add(q);let E=new LJ(30,1,0.1,50);E.position.copy(gE),E.lookAt(pE);let F=new mJ({color:lE,toneMapped:!1}),k=$.scene;k.traverse((o)=>{let r=o;if(!r.isMesh)return;r.frustumCulled=!1;let L0=(Array.isArray(r.material)?r.material:[r.material]).map((E0)=>{if(E0.name==="Contorno")return F;if(E0.name==="Face_Moeda"||E0.name==="Verso_Moeda"){let ZJ=E0;ZJ.metalness=0.05,ZJ.roughness=0.6}return E0});r.material=Array.isArray(r.material)?L0:L0[0]}),K.add(k);let B=document.createElement("canvas");B.width=B.height=128;let O=B.getContext("2d"),N=O.createRadialGradient(64,64,0,64,64,64);N.addColorStop(0,"rgba(0,0,0,0.55)"),N.addColorStop(1,"rgba(0,0,0,0)"),O.fillStyle=N,O.fillRect(0,0,128,128);let _=new p6(B),C=new mJ({map:_,transparent:!0,depthWrite:!1,toneMapped:!1}),D=new YJ(new k8(2.6,1.3),C);D.rotation.x=-Math.PI/2,D.position.y=0.005,K.add(D);let P=k.getObjectByName("root"),I=new y,w=new r6(k),L=$.animations.find((o)=>o.name===bE)??$.animations[0],z=w.clipAction(L);z.setLoop(_$,1),z.clampWhenFinished=!0,z.play(),w.update(0);let g=()=>{let o=Math.max(1,Math.round(Z.clientWidth));W.setSize(o,o,!1)};g();let A=typeof ResizeObserver<"u"?new ResizeObserver(g):null;A?.observe(Z);let m=()=>{if(P){P.getWorldPosition(I);let o=Math.max(0,I.y),r=Math.max(0.35,1-o*1.4);D.scale.setScalar(r),C.opacity=r}W.render(K,E)},a=!1,p=()=>{if(a)return;a=!0,W.setAnimationLoop(null),A?.disconnect(),w.stopAllAction(),K.traverse((o)=>{let r=o;if(!r.isMesh)return;r.geometry.dispose(),(Array.isArray(r.material)?r.material:[r.material]).forEach((L0)=>{for(let E0 of Object.values(L0))if(E0&&typeof E0==="object"&&"isTexture"in E0)E0.dispose();L0.dispose()})}),U.dispose(),W.dispose(),W.forceContextLoss(),H.remove()};if(J.cleanup=p,Z.appendChild(H),W.compile(K,E),m(),!J.ready()){p();return}let n=Math.max(0.5,L.duration-xE),u=-1,h=!1;W.setAnimationLoop((o)=>{let r=u<0?0:(o-u)/1000;if(u=o,w.update(Math.min(Math.max(r,0),0.1)),m(),!h&&z.time>=n)h=!0,J.end()})}var SK=window.__achSplash3d;if(SK)mE(SK).catch(()=>{});
