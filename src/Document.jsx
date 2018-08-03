import React from 'react';
import Root from './Root.jsx';

const Document = ({ assets, html, data, helmet, styles }) => {
  const htmlAttrs = helmet.htmlAttributes.toComponent();
  const bodyAttrs = helmet.bodyAttributes.toComponent();

  return (
    <html {...htmlAttrs}>
      <head>
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {styles}
      </head>
      <body {...bodyAttrs}>
        <Root html={html} data={data} assets={assets} />
      </body>
    </html>
  );
};

export default Document;
