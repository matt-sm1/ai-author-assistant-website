# Acceptance scenarios (BDD)

## FAQ accordion
```gherkin
Feature: FAQ accordion
  Scenario: Visitor expands an answer
    Given the FAQ section is rendered with questions
    When they activate the first question
    Then that item has aria-expanded true
    And the matching panel is available
```

## Mobile navigation
```gherkin
Feature: Mobile menu
  Scenario: Visitor opens and closes with Escape
    Given the header is rendered at a mobile viewport
    When they open the menu
    Then aria-expanded is true
    When they press Escape
    Then the menu closes
```

## Button primitive
```gherkin
Feature: Button
  Scenario: Link vs button
    Given a Button with href
    Then it renders as a link
    Given a Button without href
    Then it renders as a button
```

## Home semantics and CTA
```gherkin
Feature: Home page
  Scenario: Single h1 and hero CTA
    Given the landing page is loaded
    Then there is exactly one h1
    And the hero CTA links to #contact
```
