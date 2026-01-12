# API Data Specification

This document outlines the data structure required from the API to power the Rust Nation UK conference app.

---

## 1. Schedule Configuration

### Tracks
```json
{
  "tracks": [
    {
      "id": 1,
      "name": "Main Stage"
    },
    {
      "id": 2,
      "name": "Workshop Room A"
    }
  ]
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | number | Yes | Unique track identifier |
| `name` | string | Yes | Display name for the track |

---

## 2. Breaks

```json
{
  "breaks": [
    {
      "time": "10:30",
      "duration": 30,
      "type": "coffee",
      "label": "Coffee Break"
    },
    {
      "time": "12:30",
      "duration": 60,
      "type": "lunch",
      "label": "Lunch"
    }
  ]
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `time` | string | Yes | Start time in 24hr format (HH:MM) |
| `duration` | number | Yes | Duration in minutes |
| `type` | string | Yes | `"coffee"` or `"lunch"` (determines icon) |
| `label` | string | Yes | Display text |

---

## 3. Talks

```json
{
  "talks": [
    {
      "id": 1,
      "track": 1,
      "time": "09:00",
      "duration": 60,
      "title": "Opening Keynote: The Future of Rust",
      "speaker": "Ashley Williams",
      "speakerPhoto": "https://example.com/photos/ashley.jpg",
      "synopsis": "Join us for an exciting look at where Rust is headed...",
      "tag": "keynote",
      "social": {
        "twitter": "ag_dubs",
        "github": "ashleygwilliams",
        "website": "https://ashley.is"
      }
    }
  ]
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | number | Yes | Unique talk identifier |
| `track` | number | Yes | Track ID this talk belongs to |
| `time` | string | Yes | Start time in 24hr format (HH:MM) |
| `duration` | number | Yes | Duration in minutes |
| `title` | string | Yes | Talk title |
| `speaker` | string | Yes | Speaker's full name |
| `speakerPhoto` | string | Yes | URL to speaker photo (square, min 200x200px recommended) |
| `synopsis` | string | Yes | Talk description (shown when expanded) |
| `tag` | string | Yes | `"keynote"`, `"talk"`, or `"tutorial"` |
| `social` | object | No | Speaker's social links |
| `social.twitter` | string | No | Twitter/X username (without @) |
| `social.github` | string | No | GitHub username |
| `social.website` | string | No | Full URL to personal website |

---

## 4. Sponsors

```json
{
  "sponsors": [
    {
      "id": 1,
      "name": "Ferrous Systems",
      "tier": "platinum",
      "logo": "https://example.com/logos/ferrous.svg",
      "website": "https://ferrous-systems.com",
      "bio": "Ferrous Systems is a Rust consultancy founded by members of the Rust project..."
    }
  ]
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | number | Yes | Unique sponsor identifier |
| `name` | string | Yes | Company name |
| `tier` | string | Yes | `"platinum"`, `"gold"`, `"silver"`, or `"bronze"` |
| `logo` | string | Yes | URL to logo image (transparent PNG/SVG recommended) |
| `website` | string | Yes | Full URL to sponsor website |
| `bio` | string | Yes | Company description |

---

## 5. Sponsor Ads (Toast Popups)

These are shown as timed popups on the schedule page.

```json
{
  "ads": [
    {
      "id": 1,
      "name": "Ferrous Systems",
      "tier": "platinum",
      "logo": "https://example.com/logos/ferrous-square.png",
      "message": "World-class Rust training and consulting",
      "url": "https://ferrous-systems.com"
    }
  ]
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | number | Yes | Unique ad identifier |
| `name` | string | Yes | Sponsor name |
| `tier` | string | Yes | `"platinum"`, `"gold"`, `"silver"`, or `"bronze"` |
| `logo` | string | Yes | URL to logo (square format, min 100x100px) |
| `message` | string | Yes | Short tagline/message (keep under 50 chars) |
| `url` | string | Yes | Link opened when ad is tapped |

---

## Summary

| Endpoint | Mock Count | Purpose |
|----------|------------|---------|
| Tracks | 4 | Conference track/room names |
| Breaks | 3 | Coffee and lunch breaks |
| Talks | 15 | All sessions across all tracks |
| Sponsors | 12 | Sponsor page listings |
| Ads | 2 | Popup advertisements |

---

## Notes

- All times should be in 24-hour format (HH:MM)
- Image URLs should be HTTPS
- The app currently loads all data client-side from JSON files in `src/lib/data/`
- To connect to a live API, update the imports in the page components to fetch from your endpoints
