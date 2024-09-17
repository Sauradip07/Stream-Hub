import AuthPage from "./pages/auth";
import Room from "./pages/room"; // Websocket for live sreaming
import VideoPlayer from "./pages/videoplayer";
import YouTubeHome from "./pages/youtubehome"; // all videos gona render using map function
import UploadForm from "./upload/page";

export default function Home() {
  return (
    <div>
      <YouTubeHome/>
    </div>
  );
}
