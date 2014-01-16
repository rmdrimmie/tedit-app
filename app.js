/*global ace, domBuilder*/

var $ = {};
document.body.textContent = "";
document.body.setAttribute("class", "splitview horizontal");
document.body.appendChild(domBuilder([
  [".tree$tree"],
  [".slider$slider"],
  [".titlebar$titlebar"],
  [".main$main",
    [".editor$editor"]
  ]
], $));

// Listen to resize keybindings
(function () {
  var zooms = [
    25, 33, 50, 67, 75, 90, 100, 110, 120, 125, 150, 175, 200, 250, 300, 400, 500
  ];
  var original = 16;
  var index = zooms.indexOf(100);
  zoom();

  window.addEventListener("keydown", function (evt) {
    if (!evt.ctrlKey) return;
    if (evt.keyCode === 48) { // "+"
      index = zooms.indexOf(100);
    }
    else if (evt.keyCode === 187) { // "+"
      if (index < zooms.length - 1) index++;
    }
    else if (evt.keyCode === 189) { // "-"
      if (index > 0) index--;
    }
    else {
      return;
    }
    evt.preventDefault();
    evt.stopPropagation();
    zoom();
  }, true);

  function zoom() {
    var size = original * zooms[index] / 100;
    document.body.style.fontSize = size + "px";
  }
})();

// Enliven the slider to resize the panes.
(function () {
  var position = null;
  var isTouch = false;
  var size = 200;
  var width = 8;
  var innerWidth;

  onResize();
  slide(size);

  window.addEventListener("resize", onResize);
  $.slider.addEventListener("mousedown", onStart, true);
  $.slider.addEventListener("touchstart", onStart, true);

  function onResize() {
    innerWidth = window.innerWidth;
  }

  function onStart(evt) {
    if (position !== null) return;
    evt.preventDefault();
    evt.stopPropagation();
    if (evt.touches) {
      evt = evt.touches[0];
      isTouch = true;
    }
    else {
      isTouch = false;
    }
    position = evt.clientX;
    if (isTouch) {
      window.addEventListener("touchmove", onMove, true);
      window.addEventListener('touchend', onEnd, true);
    }
    else {
      window.addEventListener("mousemove", onMove, true);
      window.addEventListener('mouseup', onEnd, true);
    }
  }

  function onMove(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    if (evt.touches) evt = evt.touches[0];
    var delta = evt.clientX - position;
    position = evt.clientX;
    size += delta;
    if (size < 0) size = 0;
    if (size > innerWidth - width) size = innerWidth - width;
    slide(size);
  }

  function onEnd() {
    if (isTouch) {
      window.removeEventListener("touchmove", onMove, true);
      window.removeEventListener('touchend', onEnd, true);
    }
    else {
      window.removeEventListener("mousemove", onMove, true);
      window.removeEventListener('mouseup', onEnd, true);
    }
    position = null;
    isTouch = null;
  }

  function slide(x, w) {
    if (w === undefined) w = 8;
    $.slider.style.left = x + "px";
    $.slider.style.width = w + "px";
    $.tree.style.width = x + "px";
    $.titlebar.style.left = (x + w) + "px";
    $.main.style.left = (x + w) + "px";
  }

})();


// Put fake content in the tree
$.tree.innerHTML = '<ul><li><div class="row staged"><i class="icon-book-open" title="2ea165d87803f2dc521669333a3d4b9d48a0b2fa"></i><span class="icon-github" title="github://creationix/tedit (staged)">creationix/tedit</span></div><ul><li><div class="row"><i class="icon-folder-open" title="bd81e604a76cde7e96ddca552758930e89d222e2"></i><span class="" title="/amd">amd</span></div><ul><li><div class="row"><i class="icon-link" title="8af9d5a8c298290a2590be4ab9f38f02115bc7c4"></i><span class="" title="/amd/{name}.js">{name}.js<span class="target">../src/{name}.js|amd</span></span></div></li></ul></li><li><div class="row"><i class="icon-folder" title="0fc01fdbabc0ff1818bf7a276ead8c8dad12381d"></i><span class="" title="/filters">filters</span></div><ul></ul></li><li><div class="row"><i class="icon-folder" title="2d985ab6d089a431500de401c9bc3325882119a5"></i><span class="" title="/modules">modules</span></div><ul></ul></li><li><div class="row staged"><i class="icon-folder-open" title="a07c67f979b858b641dcdf5471ab9bdc0215d5b5"></i><span class="" title="/src (staged)">src</span></div><ul><li><div class="row"><i class="icon-doc-text" title="681b9cc4f55e97a3c35a0e6245f45c82a94d1d5f"></i><span class="" title="/src/Cell.js">Cell.js</span></div></li><li><div class="row"><i class="icon-doc-text" title="392ccb0769396ae6fe4c64f1620d4da512e33dd7"></i><span class="" title="/src/Editor.js">Editor.js</span></div></li><li><div class="row"><i class="icon-doc-text" title="b71a941b47fbb5cf1749a137164c79d3334b6b57"></i><span class="" title="/src/LogView.js">LogView.js</span></div></li><li><div class="row"><i class="icon-doc-text" title="2267aa0956580320a560357e5c9ea9f9f3fd420e"></i><span class="" title="/src/SplitView.js">SplitView.js</span></div></li><li><div class="row"><i class="icon-doc-text" title="c81b55e54bfbefbaf512a14d5b6049bb2c971b1a"></i><span class="" title="/src/TreeView.js">TreeView.js</span></div></li><li><div class="row"><i class="icon-doc-text" title="01691daa38ece7813ca620b26b73363f770a212b"></i><span class="" title="/src/ambiance.less">ambiance.less</span></div></li><li><div class="row"><i class="icon-doc-text" title="d6139bbae30d55ccdb4c4cc7481989fdbd67ef66"></i><span class="" title="/src/app.js">app.js</span></div></li><li><div class="row"><i class="icon-doc-text" title="7ba59a3d12e419d3bd1d2396d225619e5a79a306"></i><span class="" title="/src/background.js">background.js</span></div></li><li><div class="row"><i class="icon-doc-text" title="17e0e55351687e0dff7e6eaaad6434b145f24a9d"></i><span class="" title="/src/chrome-prefs.js">chrome-prefs.js</span></div></li><li><div class="row"><i class="icon-doc-text" title="06a3c927d40f7d3a456ba7fd747b80a62de7d2f8"></i><span class="" title="/src/chrome-tcp.js">chrome-tcp.js</span></div></li><li><div class="row"><i class="icon-doc-text" title="3076c534697f8c4b4e83e08ddcd8795e088933ed"></i><span class="" title="/src/chrome.js">chrome.js</span></div></li><li><div class="row"><i class="icon-doc-text" title="0ed4b9effe17233b0006fbc94323764f26f5aa4c"></i><span class="" title="/src/codemirror.js">codemirror.js</span></div></li><li><div class="row"><i class="icon-doc-text" title="d42ea9f2b304d7c02c34f2c9ce7e82e434866ce7"></i><span class="" title="/src/codemirror.less">codemirror.less</span></div></li><li><div class="row"><i class="icon-doc-text" title="7de8d68c62aa3a622cb613b000da16186fa3e529"></i><span class="" title="/src/fs.js">fs.js</span></div></li><li><div class="row"><i class="icon-doc-text" title="8873d2227a3c9608394445ef01c32f2fff44d8cd"></i><span class="" title="/src/gitfs.js">gitfs.js</span></div></li><li><div class="row"><i class="icon-doc-text" title="f8e2fa8cb061b8b6680d42bc2d452097efca865c"></i><span class="" title="/src/github-config.js">github-config.js</span></div></li><li><div class="row"><i class="icon-picture" title="9ec06667baa5406b27f494d16d6f499918416215"></i><span class="" title="/src/icon-128.png">icon-128.png</span></div></li><li><div class="row"><i class="icon-picture" title="5c3b214272a12cf5bee56f476f5a8d348864e744"></i><span class="" title="/src/icon-196.png">icon-196.png</span></div></li><li><div class="row"><i class="icon-doc-text" title="14e69cad3d5da6133cf870d58468d0491d76a568"></i><span class="" title="/src/icons.less">icons.less</span></div></li><li><div class="row staged"><i class="icon-doc-text" title="e90cd0f99e0a89d5aa02b178787a0384ea94ecc7"></i><span class="" title="/src/index.html (staged)">index.html</span></div></li><li><div class="row"><i class="icon-doc-text" title="de6f540cd5095f31972dddb0bed410ef150e56ab"></i><span class="" title="/src/manifest.json">manifest.json</span></div></li><li><div class="row"><i class="icon-doc-text" title="98954b3f0dcb42a67c41b6da0dfbee6d4a86ccea"></i><span class="" title="/src/mime.js">mime.js</span></div></li><li><div class="row"><i class="icon-doc-text" title="2b471846e6dbfb788c2e5e94f4e1b92f0d7ab742"></i><span class="" title="/src/prefs.js">prefs.js</span></div></li><li><div class="row"><i class="icon-doc-text" title="8149e59470ae40c68f25eb60df6665c6a7e18db4"></i><span class="" title="/src/progress-parser.js">progress-parser.js</span></div></li><li><div class="row"><i class="icon-doc-text" title="e8b83bb248a4303588b3efb7a4f7ae828827bccd"></i><span class="" title="/src/run.js">run.js</span></div></li><li><div class="row"><i class="icon-doc-text" title="c0453addded00a3d681b4d0abae5825a80cd3566"></i><span class="" title="/src/runtime.js">runtime.js</span></div></li><li><div class="row"><i class="icon-doc-text" title="b21df3541e6f8267d03e639977c5e8e9386c6803"></i><span class="" title="/src/sample.js">sample.js</span></div></li><li><div class="row"><i class="icon-doc-text" title="1065719fc6601bc67c9a30332067374c9e795b0e"></i><span class="" title="/src/serial.js">serial.js</span></div></li><li><div class="row"><i class="icon-doc-text" title="bb0a9d77e68c220285f276d87fbe52afb89a0eb0"></i><span class="" title="/src/server.js">server.js</span></div></li><li><div class="row"><i class="icon-doc-text" title="80e4076e75bc6e3395f0aa99ff3e7f417dea4725"></i><span class="" title="/src/splitview.less">splitview.less</span></div></li><li><div class="row"><i class="icon-doc-text" title="98db96b278b6718161876b8150ed6d1139599b55"></i><span class="" title="/src/style.less">style.less</span></div></li><li><div class="row"><i class="icon-doc-text" title="7e838f2fd50924e8b7c598573b8a3aa090ded879"></i><span class="" title="/src/template.js">template.js</span></div></li><li><div class="row"><i class="icon-doc-text" title="59098ab58cf9438571d9a3543128ef64c3610a36"></i><span class="" title="/src/walk.js">walk.js</span></div></li><li><div class="row"><i class="icon-doc-text" title="8960579de1f805eb4e090884b45c0a13ad282d1e"></i><span class="" title="/src/web.js">web.js</span></div></li><li><div class="row"><i class="icon-doc-text" title="377be65844a0428ff5d47023194fa23347bc5386"></i><span class="" title="/src/welcome.js">welcome.js</span></div></li></ul></li><li><div class="row"><i class="icon-doc-text" title="09977212be2f52035e3da9a1dc9f3f4fd1fd189d"></i><span class="" title="/manifest.txt">manifest.txt</span></div></li><li><div class="row staged"><i class="icon-doc-text" title="e69de29bb2d1d6434b8b29ae775ad8c2e48c5391"></i><span class="" title="/require.js (staged)">require.js</span></div></li><li><div class="row"><i class="icon-doc-text" title="41ee67169834deeb326b2225dcdf5b840f935f9c"></i><span class="" title="/style.css">style.css</span></div></li><li><div class="row"><i class="icon-link" title="3bf61af7b494200044d9b935085554b0a47f04ab"></i><span class="" title="/app.js">app.js<span class="target">src/web.js|cjs</span></span></div></li><li><div class="row"><i class="icon-link" title="a0f3d6f3308b0fe8c177092430aa442b339a8f1a"></i><span class="" title="/github-callback">github-callback<span class="target">|github-callback</span></span></div></li><li><div class="row"><i class="icon-link" title="e321c2aab074d9aa3c927a05c62dd73907a2b4c8"></i><span class="" title="/index.html">index.html<span class="target">src/index.html</span></span></div></li><li><div class="row"><i class="icon-link" title="84ed66d17a3eb4e9a320818b5a4a5b6c38712791"></i><span class="" title="/manifest.appcache">manifest.appcache<span class="target">manifest.txt|appcache</span></span></div></li></ul></li></ul>';

// Put sample content and liven the editor
$.editor.textContent = 'vars foo\nfoo = {items|\n  vars x\n  x = "All this is syntax highlighted";\n}\n';
var editor = ace.edit($.editor);
editor.setTheme("ace/theme/ambiance");
editor.getSession().setMode("ace/mode/jack");

