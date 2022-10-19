class ContributionsController < ApplicationController
    
    # def index
    #     if params[:id]
    #         contributions = Contribution.find_by(member_id:params[:id]);
    #         render json: contributions, status: :ok
    #     else
    #         render json: {error: "No member selected"}, status: :not_found
    #     end
    # end

    def show
        contribution = Contribution.find_by(id:params[:id]);
        if member
            render json: contribution, status: :ok
        else
            render json: {error: "Contribution not found"}, status: :not_found
        end
    end

    def create
        if params[:member_id]
           contribution = Contribution.create(self.pemitted_params);
           member = Member.find_by(id:params[:member_id]);
           newTotalContribution = member[:total_contribution] + contribution[:amount];
           member.update(total_contribution: newTotalContribution)
            render json: contribution, status: :ok
        else
            render json:{error:"Please select a member"}, status: :not_found
        end
    end

    private
    def pemitted_params
        params.permit(:member_id, :amount, :date)
    end
end
