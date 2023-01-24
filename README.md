# blackout

a tiny webpage to visualize the power outages schedule

==================

## Development

To serve from localhost: 
```
cd ..
python -m http.server 8000
../ngrok http 8000
```

To prevent page from auto-updating add #debug to url.

==================

## Plan:

 * [x] Basic data + highlight for the current day/time
 * [x] crossbrowser layout
 * [x] publish at github -> https://npavliuchenko.github.io/blackout/
 * [x] 3 groups + selection
 * [ ] configurable notifications ?
 * [x] Dark / light theme ?
 * [x] Icon packs
 * [ ] Better 'now' highlight