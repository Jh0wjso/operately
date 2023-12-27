//
// Automatically generated with mix operate.gen.notification.items.index
// Do not edit this file manually
//

import * as React from "react";

import GoalArchived from "./GoalArchived"
import GoalCheckIn from "./GoalCheckIn"
import GoalCheckInAcknowledgement from "./GoalCheckInAcknowledgement"
import GoalCreated from "./GoalCreated"
import ProjectArchived from "./ProjectArchived"
import ProjectClosed from "./ProjectClosed"
import ProjectContributorAddition from "./ProjectContributorAddition"
import ProjectCreated from "./ProjectCreated"
import ProjectDiscussionCommentSubmitted from "./ProjectDiscussionCommentSubmitted"
import ProjectDiscussionSubmitted from "./ProjectDiscussionSubmitted"
import ProjectGoalConnection from "./ProjectGoalConnection"
import ProjectGoalDisconnection from "./ProjectGoalDisconnection"
import ProjectMilestoneCommented from "./ProjectMilestoneCommented"
import ProjectMoved from "./ProjectMoved"
import ProjectRenamed from "./ProjectRenamed"
import ProjectReviewAcknowledged from "./ProjectReviewAcknowledged"
import ProjectReviewCommented from "./ProjectReviewCommented"
import ProjectReviewRequestSubmitted from "./ProjectReviewRequestSubmitted"
import ProjectReviewSubmitted from "./ProjectReviewSubmitted"
import ProjectStatusUpdateAcknowledged from "./ProjectStatusUpdateAcknowledged"
import ProjectStatusUpdateCommented from "./ProjectStatusUpdateCommented"
import ProjectStatusUpdateSubmitted from "./ProjectStatusUpdateSubmitted"
import ProjectTimelineEdited from "./ProjectTimelineEdited"

export default function NotificationItem({notification}) {
  const activityType = notification.activity.content.__typename;

  switch (activityType) {
    case "ActivityContentGoalArchived":
      return <GoalArchived notification={notification} />;
    
    case "ActivityContentGoalCheckIn":
      return <GoalCheckIn notification={notification} />;
    
    case "ActivityContentGoalCheckInAcknowledgement":
      return <GoalCheckInAcknowledgement notification={notification} />;
    
    case "ActivityContentGoalCreated":
      return <GoalCreated notification={notification} />;
    
    case "ActivityContentProjectArchived":
      return <ProjectArchived notification={notification} />;
    
    case "ActivityContentProjectClosed":
      return <ProjectClosed notification={notification} />;
    
    case "ActivityContentProjectContributorAddition":
      return <ProjectContributorAddition notification={notification} />;
    
    case "ActivityContentProjectCreated":
      return <ProjectCreated notification={notification} />;
    
    case "ActivityContentProjectDiscussionCommentSubmitted":
      return <ProjectDiscussionCommentSubmitted notification={notification} />;
    
    case "ActivityContentProjectDiscussionSubmitted":
      return <ProjectDiscussionSubmitted notification={notification} />;
    
    case "ActivityContentProjectGoalConnection":
      return <ProjectGoalConnection notification={notification} />;
    
    case "ActivityContentProjectGoalDisconnection":
      return <ProjectGoalDisconnection notification={notification} />;
    
    case "ActivityContentProjectMilestoneCommented":
      return <ProjectMilestoneCommented notification={notification} />;
    
    case "ActivityContentProjectMoved":
      return <ProjectMoved notification={notification} />;
    
    case "ActivityContentProjectRenamed":
      return <ProjectRenamed notification={notification} />;
    
    case "ActivityContentProjectReviewAcknowledged":
      return <ProjectReviewAcknowledged notification={notification} />;
    
    case "ActivityContentProjectReviewCommented":
      return <ProjectReviewCommented notification={notification} />;
    
    case "ActivityContentProjectReviewRequestSubmitted":
      return <ProjectReviewRequestSubmitted notification={notification} />;
    
    case "ActivityContentProjectReviewSubmitted":
      return <ProjectReviewSubmitted notification={notification} />;
    
    case "ActivityContentProjectStatusUpdateAcknowledged":
      return <ProjectStatusUpdateAcknowledged notification={notification} />;
    
    case "ActivityContentProjectStatusUpdateCommented":
      return <ProjectStatusUpdateCommented notification={notification} />;
    
    case "ActivityContentProjectStatusUpdateSubmitted":
      return <ProjectStatusUpdateSubmitted notification={notification} />;
    
    case "ActivityContentProjectTimelineEdited":
      return <ProjectTimelineEdited notification={notification} />;
    
    default:
      throw "unhandled activity type " + activityType + " in assets/js/pages/NotificationsPage/NotificationItem/index.tsx";
  }
}
