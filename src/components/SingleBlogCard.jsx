import { Card, Typography } from "@material-tailwind/react";
import React from "react";
import BlogBg from "../assets/BlogBG.png";

const SingleBlogCard = () => {
  return (
    <Card className="flex flex-row">
      <div className="">
        <img src={BlogBg} alt="" className="w-56 h-full object-fill rounded-lg" />
      </div>
      <div className="w-4/5 p-4">
        <Typography className="text-5xl font-semibold text-gray-900">
          Lorem ipsum dolor sit amet.
        </Typography>
        <Typography className="text-lg text-gray-800">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi sequi,
          accusamus accusantium illo quos corrupti voluptatem, odit provident
          eius voluptatibus nostrum, numquam nisi ea quo inventore ad esse!
          Exercitationem eum non officia ipsa ad est voluptas ipsum quisquam
          facere doloremque veniam laboriosam omnis nisi quos recusandae,
          blanditiis assumenda nobis minima laudantium modi reprehenderit eaque?
          Voluptatum velit fugit quibusdam earum, vitae nemo placeat at minus
          maiores inventore ratione praesentium, sapiente molestiae dolorem a,
          consequuntur eos fuga. Dolores perferendis beatae quibusdam, totam
          ducimus similique pariatur voluptatibus soluta dolorem, sit quia
          voluptas ut consequuntur nisi harum unde repellendus? Assumenda, ipsum
          unde, totam tempore illo libero, facere quod atque deserunt ducimus
          laborum.
          <br /><br />  
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi sequi,
          accusamus accusantium illo quos corrupti voluptatem, odit provident
          eius voluptatibus nostrum, numquam nisi ea quo inventore ad esse!
          Exercitationem eum non officia ipsa ad est voluptas ipsum quisquam
          facere doloremque veniam laboriosam omnis nisi quos recusandae,
          blanditiis assumenda nobis minima laudantium modi reprehenderit eaque?
          Voluptatum velit fugit quibusdam earum, vitae nemo placeat at minus
          maiores inventore ratione praesentium, sapiente molestiae dolorem a,
          consequuntur eos fuga. Dolores perferendis beatae quibusdam, totam
          ducimus similique pariatur voluptatibus soluta dolorem, sit quia
          voluptas ut consequuntur nisi harum unde repellendus? Assumenda, ipsum
          unde, totam tempore illo libero, facere quod atque deserunt ducimus
          laborum.
          <br /><br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi sequi,
          accusamus accusantium illo quos corrupti voluptatem, odit provident
          eius voluptatibus nostrum, numquam nisi ea quo inventore ad esse!
          Exercitationem eum non officia ipsa ad est voluptas ipsum quisquam
          facere doloremque veniam laboriosam omnis nisi quos recusandae,
          blanditiis assumenda nobis minima laudantium modi reprehenderit eaque?
          Voluptatum velit fugit quibusdam earum, vitae nemo placeat at minus
          maiores inventore ratione praesentium, sapiente molestiae dolorem a,
          consequuntur eos fuga. Dolores perferendis beatae quibusdam, totam
          ducimus similique pariatur voluptatibus soluta dolorem, sit quia
          voluptas ut consequuntur nisi harum unde repellendus? Assumenda, ipsum
          unde, totam tempore illo libero, facere quod atque deserunt ducimus
          laborum.
          <br />
        </Typography>
      </div>
    </Card>
  );
};

export default SingleBlogCard;
