gpub.book.page = {
  /** Various conversion helpers. */
  ptToIn: function(ptSize) { return ptSize * (1 / 72); },
  ptToMm: function(ptSize) { return ptSize * 0.3528; },

  mmToPt: function(mmSize) { return mmSize * 1 / 0.3528; },
  inToPt: function(inSize) { return inSize * 72 ; },

  inToMm: function(inSize) { return inSize * 25.4; },
  mmToIn: function(mmSize) { return mmSize * (1 / 25.4); }
};

/**
 * Enum-like type enumerating the supported page sizes
 */
gpub.book.page.type = {
  A4: 'A4',
  LETTER: 'LETTER',
  OCTAVO: 'OCTAVO',
  NOTECARD: 'NOTECARD'
};

/**
 * Mapping from page-size to col-maping.
 *
 * Note: height and width in mm.
 */
gpub.book.page.size = {
  A4: {
    heightMm: 297,
    widthMm: 210,
    widthIn: 8.268,
    heightIn: 11.693
  },
  /** Standard printer paper. */
  LETTER: {
    heightMm: 280,
    widthMm: 210,
    heightIn: 11,
    widthIn: 8.5
  },
  /**
   * 6x9. Octavo is probably the most common size for professionally printed go
   * books.
   */
  OCTAVO: {
    heightMm: 229,
    widthMm: 152,
    heightIn: 9,
    widthIn: 6
  },
  /**
   * 5x7 paper. Doesn't have an official name, as far as I know, so we'll call
   * it Notecard.
   */
  NOTECARD: {
    heightMm: 178,
    widthMm: 127,
    heightIn: 7,
    widthIn: 5
  }
};