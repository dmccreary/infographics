# About the Infographics for Interactive Intelligent Textbooks

This interactive intelligent textbook covers the topic
of creating interactive infographic diagrams for use in
intelligent textbooks.  

## Definitions of Interactive Infographic Terms

For the context of this book, we define an interactive
infographic as:

**Interactive Infographic:** a detailed diagram with named regions
that allows the student to interacts with individuals regions of the diagram.

The detailed drawing often have several named regions that
each have a region name or label.  The student will use
their pointing device (mouse or tablet) to hover over or
select a region to interact with the infographic.

Interactive infographics must not be static images.  Student
interaction is a requirement to allow feedback on how the
students interact with the infographic.

In this course, all interactive infographics are subtypes
of `MicroSims` - which are web-based interactive 
programs that run within an iframe.  Many MicroSims
are focused on running small simulations of the world.
In this book, all our interactive infographics use
the same MicroSim standards for things such as titles,
metadata and file structure.

We will also use the term `infobox` in this course.  We
define an infobox as a panel that appears above the drawing
when a region is hovered over or selected.  Infoboxes
are usually rectangular and contain descriptive text
about the region selected.  Carful consideration is given
so that the infobox stays within the drawing canvas but
does not cover the region selected.

## Iframe Design

The interactive infographics in this book are designed to
be reused using the iframe HTML element within an intelligent
textbook.  As a result, they are designed to appear within
a width-responsive column used when scrolling through a chapter
of a textbook.  We call this the central content area or
the main context area.  To the left of the content window a site
navigation menu is often present if there is sufficient screen
width.  To the right of the central content window there is
often a table of content for a chapter.  The iframe must
therefore work well in a central content window that is
as narrow as 600 pixels and as wide as 1,400 pixels.  So
a width-responsive design is critical, despite the need
for a detailed diagram with clear labeled regions.  These
are demanding design constraints requiring techniques such
as variable font sizes and adjustable positioning of elements
as the iframe is placed in new web designs.

Width-responsive iframe designs is a key factor that differentiates our
designs from many other free tools.

## MicroSim Conventions

MicroSims have standard conventions that place a drawing
region above a control region.  The background of the
drawing region has an aliceblue background and the
control region at the bottom have a white background.
Both regions have a 1 pixel wide sliver solid boarder
so that the iframe can be sized to contain the infographic.
Some versions of infographics can report their size to the
containing region so that the iframe height can be calculated
automatically.  To use these automatically height calculations
the website that contains the iframes must have a javascript
program that uses this iframe height information.

## Tools to Create Interactive Infographics

Although drawing programs such as p5.js are frequently used
to draw regions of the infographic, some versions also use
a text-to-image LLM to generate the underlying images which
is usually free from all text, labels or region names.
A Javascript program loads a JSON file of named regions
and labels to interact with the drawing using a event
capture overlayment process.  These formats are called
Overlayment Patterns

## Overlayment Interactive Infographic Types

We will be reviewing several different patterns of Overlayment Interactive Infographics

### Type 1: Simple Non-overlapping rectangles

This is when the underlying image
has regular rectangles that the user will hover over an click on.  This
is ideal for vertical or horizontal panels or a regular array of regions (2x3, 3X2, 3X3 etc)
When the user hovers or clicks within a rectangle, an appropriate event occurs.
The edit mode allows the user to change the edges and corners of the rectangles.
Each region is sometimes called a "Panel", and the regions all MUST be named.
By default, a title usually appears at the top of the region or panels.

A variation of the regular grid is where the rectangular regions are
not evenly spaced vertically and horizontally.  In this case
a `overlay.json` file will hold the list of rectangular non-overlapping regions.
The user interface will highly the region extents when the user hovers over
a region and an infobox panel on the right or bottom of the infographic may
appear.  For complex regions the infobox may appear to the right or left
of the selected region.

### Type 2: Complex Polygons
In this design the underlying image can not
be decomposed into non-overlapping rectangles.  For example,
the wedges of a pie-chart can't be easily be highlighted with
simple rectangles.

In this example, polygons with
three to many edges must be stored in an `overlay.json` overlay file. 

The a diagram overlay driver called `/docs/sims/shared-libs/overlay-diagram.js` fires the correct event for each region the the user is hovering
over or clicking on.  The edit mode allows the user to move the existing
points in the polygon, remove an edge point or add a new edge point.

### Type 3: Callout Points to Edge Regions

In this mode, different regions of
the image have points that also have lines to the edges of the diagram
where the labels of the points give the name of the point.  The user
can go into edit mode and move the points around the drawing and also
reorder the labels around the edges.  The user can place a checkbox
in the control region called "Show Numbers" that will toggle numbers
at the callout points.  The default is "Show Numbers" on.

### Type 4: Callout Points to Floating Labels
In this mode, the user can have a callout line to a label that is placed anywhere
in the diagram.  In the edit mode, the user can change the location
of the callout points and the location of the labels by dragging
them anywhere over the diagram.

## Related Textbooks

The textbook is related to the
[MicroSims](https://dmccreary.github.io/microsims/) textbook and
the [Automating Instructional Design](https://dmccreary.github.io/automating-instructional-design/)

## References

### Sample JavaScript iframe resize Code

```javascript
// Automatically resize iframes based on MicroSim height messages
// Every MicroSim must have a function at the end of the setup() like this:
// window.parent.postMessage({type: 'microsim-resize', height: height}, '*');

window.addEventListener('message', function(event) {
    // Verify this is a MicroSim resize message
    if (event.data && event.data.type === 'microsim-resize') {
        // Find all iframes and check which one sent the message
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach(function(iframe) {
            try {
                // Check if this iframe's window matches the message source
                if (iframe.contentWindow === event.source) {
                    // Set the iframe height to match the MicroSim
                    iframe.style.height = event.data.height + 'px';
                }
            } catch (e) {
                // Ignore cross-origin security errors
            }
        });
    }
});
```

