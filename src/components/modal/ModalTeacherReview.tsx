import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Box, Rating } from "@mui/material";
import { translate } from "@i18n";
import StarIcon from "@mui/icons-material/Star";
import moment from "moment";
import "./Modal.scss";

interface IModalTeacherReviewProps {
  isOpen: boolean;
  cbCloseModal: () => void;
  review: {
    rating: number;
    title: string;
    plus: string;
    minus: string;
    date: string;
    user: string;
  };
}

const ModalTeacherReview = ({ isOpen, cbCloseModal, review }: IModalTeacherReviewProps) => {
  const { t } = translate("translate", { keyPrefix: "teacherPage" });

  const handleClose = () => {
    cbCloseModal();
  };

  return (
    <Dialog open={isOpen} scroll={"paper"} className="modalTeacherReview">
      <DialogTitle className="reviewTitle">{review.title}</DialogTitle>
      <DialogContent dividers={true}>
        <Box className="ratingBox">
          <Rating
            value={review.rating}
            readOnly
            emptyIcon={<StarIcon className="emptyIcon" />}
            icon={<StarIcon className="fillIcon" />}
            className="ratingReview"
          />
        </Box>
        <Box>
          <Box className="descriptionReviewBox">
            <p className="titleDescription">{t("pros")}</p>
            <p className="textDescription">{review.plus}</p>
          </Box>
          <Box className="descriptionReviewBox">
            <p className="titleDescription">{t("cons")}</p>
            <p className="textDescription">{review.minus}</p>
          </Box>
          <Box className="userDateBox">
            <p>{moment(review.date, "YYYY-MM-DD").format("DD MMMM YYYY")}</p>
            <p>{review.user}</p>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions className="actionsBox">
        <Button type="button" onClick={handleClose}>
          {t("close")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalTeacherReview;
