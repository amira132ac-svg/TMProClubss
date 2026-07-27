# Security Specification for Firestore Rules

## Data Invariants
1. A prediction record is tied to the authenticated user or user document ID.
2. User names must be non-empty strings with a maximum length of 50 characters.
3. Points, exactScores, and correctOutcomes must be non-negative numbers.
4. Users can only edit their own prediction document (`/predictions/{userId}`).
5. Unauthenticated read access to public leaderboard entries is allowed so users can see current rankings.

## The "Dirty Dozen" Attack Vectors
1. Injecting 100KB string into name field (Denial of Wallet).
2. Updating points field without valid schema.
3. Overwriting another user's prediction document.
4. Setting non-numeric or negative scores.
5. Setting ghost/shadow fields outside defined schema.
6. Deleting predictions of another user.
7. Attempting to write unauthenticated.
8. Bypassing user verification checks.
9. Injecting invalid characters into document path IDs.
10. Attempting list operations without proper filtering.
11. Modifying system fields.
12. Attempting to spoof user identity via client payload manipulation.

## Test Verification Summary
All rules validate user ownership, schema constraints, and path variable limits before write approval.
