/* global hexo */
hexo.extend.renderer.rigister('edge', 'html', require('./lib/renderer'), true)
