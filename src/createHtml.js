const fs = require('fs');

class Tag {
  constructor(tag, closingTag = true) {
    this.tag = tag;
    this.attrs = [];
    this.content = [];
    this.closingTag = closingTag;
  }

  addAttr(attr, value) {
    this.attrs.push({ attr, value });
  }

  addContent(content) {
    this.content.push(content);
  }

  find(keyword) {
    if (this.tag === keyword) {
      return this;
    }
    let index = 0;
    while (this.content.length > index) {
      if (this.content[index] instanceof Tag) {
        const result = this.content[index].find(keyword);
        if (result) {
          return result;
        }
      }
      index++;
    }
  }

  attrToString() {
    return this.attrs.map(({ attr, value }) => {
      return `${attr}="${value}"`;
    }).join(' ');
  }

  toHTML() {
    const parsedContent = this.content.map((element) => {
      if (element instanceof Tag) {
        return element.toHTML();
      }
      return element;
    });
    if (!this.closingTag) {
      return `<${this.tag} ${this.attrToString()}/>`;
    }
    return `<${this.tag} ${this.attrToString()}>${parsedContent.join('')}</${this.tag}>`;
  }
}

const generateHead = () => {
  const head = new Tag('head');

  const title = new Tag('title');
  title.addContent('Word Animation');
  head.addContent(title);

  const meta = new Tag('meta', false);
  meta.addAttr('http-equiv', 'refresh');
  meta.addAttr('content', '1');
  head.addContent(meta);

  const link = new Tag('link ', false);
  link.addAttr('rel', 'stylesheet');
  link.addAttr('href', 'style.css');
  head.addContent(link);

  return head;
}

const generateBody = () => {
  const nameParagraph = new Tag('p');
  nameParagraph.addAttr('class', 'name');

  const containerDiv = new Tag('div');
  containerDiv.addAttr('class', 'container');
  containerDiv.addContent(nameParagraph);

  const body = new Tag('body');
  body.addContent(containerDiv);

  return body;
}

const generatePage = () => {
  const html = new Tag('html');

  html.addContent(generateHead());
  html.addContent(generateBody());

  return html;
};

const addName = (html, letter) => {
  const paragraph = html.find('p');
  paragraph.addContent(letter);
  return html;
}

const addLetters = () => {
  const name = 'sourav';
  const html = generatePage();
  let index = 0;

  intervalId = setInterval(() => {
    const modifiedHtml = addName(html, name[index]);
    index++;
    fs.writeFileSync('../name.html', modifiedHtml.toHTML(), 'utf8');

    if (index >= name.length) {
      clearInterval(intervalId);
    }
  }, 1000);
}

addLetters();
