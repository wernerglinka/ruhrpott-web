module.exports = function renderLogosListBlock(block, client) {
  const logosList = [];
  // by convention a list with logo references must start with "logos", like in logosCity or logosFootballClubs
  // Object.keys(block).filter(k => k.startsWith('logos')) finds this object property
  block[Object.keys(block).filter(k => k.startsWith('logos'))].map( (logo, i) => {
    logosList.push(logo._ref);
  });
  
  return {
    name: 'logos-list',
    title: block.title ? block.title : '',
    subTitle: block.subTitle ? block.subTitle : '',
    description: block.description ? block.description : '',
    listSource: block.listSource ? block.listSource : '',
    logoWidth: block.logoWidth ? block.logoWidth : '',
    scope:  block.scope ? block.scope : 'all',
    selections: logosList ? logosList : [],
    cta: block.cta ? block.cta : '',
  }
};