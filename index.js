var ExclusiveCanonicalisation = require("./lib/algorithm/exclusive-canonicalisation");
var C14nCanonicalization = require("./lib/algorithm/c14n-canonicalisation").C14nCanonicalization;
var C14nCanonicalizationWithComments = require("./lib/algorithm/c14n-canonicalisation").C14nCanonicalizationWithComments;

var builtIn = {
  algorithms: {
    "http://www.w3.org/2001/10/xml-exc-c14n#": function(options) {
      return new ExclusiveCanonicalisation(options);
    },
    "https://www.w3.org/2001/10/xml-exc-c14n#": function(options) {
      return new ExclusiveCanonicalisation(options);
    },
    "http://www.w3.org/2001/10/xml-exc-c14n#WithComments": function(options) {
      options = Object.create(options || null);
      options.includeComments = true;
      return new ExclusiveCanonicalisation(options);
    },
    "https://www.w3.org/2001/10/xml-exc-c14n#WithComments": function(options) {
      options = Object.create(options || null);
      options.includeComments = true;
      return new ExclusiveCanonicalisation(options);
    },
    "http://www.w3.org/TR/2001/REC-xml-c14n-20010315": function() {
      return new C14nCanonicalization();
    },
    "https://www.w3.org/TR/2001/REC-xml-c14n-20010315": function() {
      return new C14nCanonicalization();
    },
    "http://www.w3.org/TR/2001/REC-xml-c14n-20010315#WithComments": function() {
      return new C14nCanonicalizationWithComments();
    },
    "https://www.w3.org/TR/2001/REC-xml-c14n-20010315#WithComments": function() {
      return new C14nCanonicalizationWithComments();
    }
  },
};

var CanonicalisationFactory = module.exports = function CanonicalisationFactory() {
  if (!(this instanceof CanonicalisationFactory)) {
    return new CanonicalisationFactory();
  }

  this.algorithms = Object.create(builtIn.algorithms);
};

CanonicalisationFactory.prototype.registerAlgorithm = function registerAlgorithm(uri, implementation) {
  this.algorithms[uri] = implementation;

  return this;
};

CanonicalisationFactory.prototype.getAlgorithm = function getAlgorithm(uri) {
  return this.algorithms[uri];
};

CanonicalisationFactory.prototype.createCanonicaliser = function createCanonicaliser(uri, options) {
  return this.algorithms[uri](options);
};
