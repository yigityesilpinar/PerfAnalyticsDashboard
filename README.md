# PerfAnalyticsDashboard

PerfAnalytics.Dashboard is a dashboard which shows perf related metrics in a visualized way.

Acceptance Criteria
- It should be written using React
- It should have component based architecture
- It should have a responsive layout
- It should show the last 30 minutes of TTFB, FCP, Dom Load, and Window Load as in charts
- It should get data from PerfAnalytics.API
- It should be rendered within 2 seconds

# Summary

- Developed with typescript
- CI & CD with github workflows 
- using eslint with eslint-compat-plugin and browserslist to avoid browser support issues
- Generates and uses its API with types with swagger script from API docs using swagger-typescript-api
- available at https://yy-perf-analytics-dashboard.herokuapp.com/
  