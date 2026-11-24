# Progress is saved behind a ProgressStore interface

v1 has no accounts (ruled out of scope), so progress lives in the browser's `localStorage`. All reads and writes go through a `ProgressStore` interface rather than touching storage directly, so adding accounts later means writing a second implementation, not editing pages. A future reader may find the interface heavier than v1 needs; it is the deliberate seam for accounts.
