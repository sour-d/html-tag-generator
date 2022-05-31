const assert = require('assert');
const fs = require('fs');

class Tag {
  constructor(tag, closingTag = true) {
    this.tag = tag;
    this.attrs = [];
    this.content = [];
    this.closingTag = closingTag;
  }

  equals(otherTag) {
    try {
      assert.deepStrictEqual(this, otherTag);
      return true;
    } catch (error) {
      return false;
    }
  }

  addAttr(attr, value) {
    this.attrs.push({ attr, value });
  }

  addContent(content) {
    this.content.push(content);
  }

  attrToString() {
    return this.attrs.map(({ attr, value }) => {
      return `${attr}="${value}"`;
    }).join(' ');
  }

  toString() {
    const contents = this.content.map(content => content).join(' ');

    if (!this.closingTag) {
      return `<${this.tag} ${this.attrToString()} />`;
    }

    return `<${this.tag} ${this.attrToString()}>${contents}</${this.tag}>`;
  }
}

const generateHead = () => {
  const head = new Tag('head');

  const title = new Tag('title');
  title.addContent('Word Animation');
  head.addContent(title.toString());

  const meta = new Tag('meta', false);
  meta.addAttr('http-equiv', 'refresh');
  meta.addAttr('content', '1');
  head.addContent(meta.toString());

  const link = new Tag('link ', false);
  link.addAttr('rel', 'stylesheet');
  link.addAttr('href', 'style.css');
  head.addContent(link.toString());

  return head.toString();
}

const getCursor = () => {
  const cursor = new Tag('span');
  if (displayCursor) {
    cursor.addAttr('class', 'displayCursor');
  }
  cursor.addContent('|');
  return cursor.toString();
}

const generateBody = (letters, displayCursor = true) => {
  const nameParagraph = new Tag('p');
  nameParagraph.addAttr('class', 'name');
  nameParagraph.addContent(letters);
  // nameParagraph.addContent(cursour.toString());

  const containerDiv = new Tag('div');
  containerDiv.addAttr('class', 'container');
  containerDiv.addContent(nameParagraph.toString());

  const body = new Tag('body');
  body.addContent(containerDiv.toString());

  return body;
}

const generatePage = (letters) => {
  const html = new Tag('html');

  html.addContent(generateHead());
  html.addContent(generateBody(letters));

  return html.toString();
};

const addLetters = () => {
  const name = 'sourav';
  let index = 0;

  intervalId = setInterval(() => {
    index++;
    const html = generatePage(name.slice(0, index));
    fs.writeFileSync('./name.html', html, 'utf8');

    if (index >= name.length) {
      clearInterval(intervalId);
    }
  }, 1000);
}

exports.Tag = Tag;