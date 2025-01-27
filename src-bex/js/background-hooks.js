// Hooks added here have a bridge allowing communication between the BEX Background Script and the BEX Content Script.
// Note: Events sent from this background script using `bridge.send` can be `listen`'d for by all client BEX bridges for this BEX

// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/background-hooks

export default function attachBackgroundHooks(
  bridge /* , allActiveConnections */
) {
  bridge.on('init', event => {
    chrome.bookmarks.getTree(results => {
      bridge.send(event.eventResponseKey, results);
    });
  });

  chrome.bookmarks.onCreated.addListener(() => {
    bridge.send('newBookMark', { hello: 123 });
  });
  //  */
}
