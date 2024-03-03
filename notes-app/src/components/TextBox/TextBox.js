import React, { useRef , useState} from 'react';
import axios from "axios";
import { Editor } from '@tinymce/tinymce-react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function TextBox() {
  const editorRef = useRef(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [gptContent, setGPTContent] = useState("");
  const [googleURLs, setGoogleURLs] = useState(null);
  const [youtubeURLs, setYoutubeURLs] = useState(null);

  return (
    <Container>
      <Row>
        <Col>
          <Editor
            apiKey={process.env.REACT_APP_TINYMCE_API}
            onInit={(evt, editor) => editorRef.current = editor}
            initialValue="<p>Delete this line and begin typing your notes here!</p>"
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help | myCustomButton',
              setup: editor => {
                editor.ui.registry.addButton('myCustomButton', {
                text: 'Search',
                onAction: async () => {
                  var search_content = editor.selection.getContent();
                  console.log(search_content)
                  setSearchQuery(search_content)
                  if (search_content == "" || search_content == " ") {
                    setGPTContent("");
                    setGoogleURLs(null);
                    setYoutubeURLs(null);
                    return;
                  }

                  axios.post("/search", {"search": search_content})
                  .then(response => {
                    console.log(response.data)
                    setGPTContent(response.data.answer);

                  })
                  
                  var googleApi = process.env.REACT_APP_GOOGLE_API
                  var cx = process.env.REACT_APP_CX_API
                  var googleURL = "https://www.googleapis.com/customsearch/v1?num=1&key=" + googleApi + "&cx=" + cx + "&q=" + search_content
                  
                  axios.get(googleURL)
                  .then(response => {
                    console.log(response)
                    console.log(googleURL)
                    setGoogleURLs(response.data.items);
                  });

                  var youtubeURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q="+ search_content + "&type=video&key=" + googleApi

                  axios.get(youtubeURL)
                  .then(response => {
                    console.log(response)
                    console.log(youtubeURL)
                    setYoutubeURLs(response.data.items);
                  });

                }
              });
              },
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col>
        <div>
          <h5>Searched: {searchQuery}</h5>
          <p>{gptContent}</p>
          <p>{googleURLs != null && googleURLs.map(function(data) {
            return (
              <>
                <a href = {data.link}>{data.snippet}</a>
                <br></br>
                <br></br>
              </>
            )
          })}</p>
          <p>{youtubeURLs != null && youtubeURLs.map(function(data) {
            return (
              <>
                <iframe width = "420" height = "315" src = {`https://www.youtube.com/embed/${data.id.videoId}`} />
                <br></br>
                <br></br>
              </>
            )
          })}</p>
        </div>
        </Col>
      </Row>
    </Container>
  );
}