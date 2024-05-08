## Weekday Job Listing Assignment - Search Job Section (React, Next.js, Material UI)

### Prerequisites : Requirements

* npm - Node Package Manager
* GitHub CLI - git

## Getting Started

* First, clone this repository to your local machine.

```bash
git clone https://github.com/rajeshchoudharyt/weekday-search-job
```

* Second, install dependencies:

```bash
npm i
```

* Third, run the development server:

```bash
npm run dev
```

* Finally, visit [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Additional information for evaluation

As per the assignment guidelines,

* Out of total 6 filter option, _"location"_ and _"remote"_ are dependent to each other, so merged to one option.

* _"Tech stack"_ filter option ignored (Guideline: Ignore if API doesn't have the required data).

* App is responsive to all different screen sizes including "Mobile".

* Redux is replaced with built-in React hooks logic. Since the app data is dependent only to one single component and the data flow throughout the app is not complex. (Guideline: Creating own logic is better implementation then using 3rd party libraries).

* Infinite scrolling implemented.


**Basic optimization and performance techniques**

While running the app locally in 'development', Next.js renders the App component twice. To render only once set below flag to next.config.js file.

```bash
const nextConfig = {
    reactStrictMode: false
}
 ```

In production, component is rendered only once.
