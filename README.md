# hack-day-automated-alt-text
Wellcome Trust Hack Day - Automated Alt Text

##Aim

To automatically add alt text to images on Wellcome sites, using object recognition technology, to ensure that no information or functionality is lost if an image is not available to the reader.

##What is alt text?

Alt text (alternative text) allows us to describe a content item, such as an image, on a webpage. For example, the alt text for a photograph of a tabby cat lying down, can be set as ‘Photograph of a tabby cat lying down’.

##Why is alt text useful?

According to Wikipedia, “In situations where the image is not available to the reader, perhaps because they have turned off images in their web browser or are using a screen reader due to a visual impairment, the alternative text ensures that no information or functionality is lost.”

HOWEVER, alt text is sometimes left blank on purpose, so that a screen reader skips over the image. This could be if, for instance, an image was present for purely design reasons.

##What we did

We used Google’s Vision API, which uses object recognition technology to analyse images. The API can also be used for detecting and extracting text within images, as well as face detection, including emotions. We took a selection of images, some with alt text and some without. We targeted those without alt text and if objects in the image were identified, and had a score of more than 50%, the alt text attribute was updated to ’This image may contain: x, y, z’.
