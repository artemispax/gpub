goog.provide('gpub.book.frontmatter');
goog.provide('gpub.book.ProcessedMarkdown');


/**
 * Processed markdown.
 * @typedef {{
 *   preamble: string,
 *   text: string
 * }}
 */
gpub.book.ProcessedMarkdown;


/**
 * @namespace
 */
gpub.book.frontmatter = {
  /**
   * @param {gpub.book.MarkdownFormat} format
   * @param {!gpub.opts.Frontmatter} opts frontmatter options
   * @return {!gpub.opts.Frontmatter} formatted frontmatter.
   */
  format: function(format, opts) {
    var fmt = function(str) {
      return /** @type {!gpub.book.ProcessedMarkdown} */ ({
        preamble: '',
        text: str,
      });
    };
    var htmlfmt = function(str) {
      return {
        preamble: '',
        text: glift.marked(str, {
          silent: true,
        })
      };
    };
    switch(format) {
      case 'LATEX':
      case 'XELATEX':
        // This is really a memoir-class renderer.
        fmt = gpub.book.latex.renderMarkdown;
        break;
      case 'EPUB':
      case 'AZW3':
        fmt = htmlfmt;
        break;
      default:
        // formatter stays the same
    }
    var construct = function(section) {
      if (!section) {
        // Return empty string as default case.
        return '';
      }
      var proc = fmt(section);
      var out = '';
      if (proc.preamble) {
        out = proc.preamble + '\n' + proc.text;
      } else {
        out = proc.text;
      }
      return out;
    }
    var foreword = construct(opts.foreword);
    var preface = construct(opts.preface);
    var acknowledgements = construct(opts.acknowledgements);
    var introduction = construct(opts.introduction);
    return new gpub.opts.Frontmatter({
      foreword: foreword,
      preface: preface,
      acknowledgements: acknowledgements,
      introduction: introduction,
      generateToc: opts.generateToc,
    });
  }
};
