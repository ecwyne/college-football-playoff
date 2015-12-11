Package.describe({
  name: 'bowls',
  version: '0.0.1',
  summary: 'Bowls collection and helpers etc',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use(['underscore', 'ecmascript', 'mongo', 'ecwyne:bottomline', 'ramda:ramda', 'momentjs:moment']);
  api.addFiles('common.js');
  api.addFiles(['publish.js', 'permissions.js', 'bottomline.js'], 'server');
  api.addFiles('bowl-data.js', 'server');
  api.export('Bowls');
});
