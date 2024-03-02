// ? sorry for the naming, I wanted to name this in different way that the editor won't import the wrong module
import hilite from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import shell from 'highlight.js/lib/languages/shell';
import typescript from 'highlight.js/lib/languages/typescript';

hilite.registerLanguage('javascript', javascript)
hilite.registerLanguage('js', javascript)
hilite.registerLanguage('jsx', javascript)
hilite.registerLanguage('typescript', typescript)
hilite.registerLanguage('ts', typescript)
hilite.registerLanguage('tsx', typescript)
hilite.registerLanguage('shell', shell)
hilite.registerLanguage('sh', shell)

export default hilite