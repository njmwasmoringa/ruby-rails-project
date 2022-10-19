class MembersController < ApplicationController
    def index
        render json: Member.all
    end

    def show
        member = Member.find_by(id:params[:id]);
        # member[:contributions] = member.contributions;
        if member
            render json: member, status: :ok
        else
            render json: {error: "Member not found"}, status: :not_found
        end
    end

    def create
        is_existing_member = Member.find_by(email:params[:email]);
        if !is_existing_member
            member = Member.create({
                name: params[:name],
                email: params[:email],
                phone: params[:phone],
                physical_address: params[:physical_address]
            })

            render json: member, status: :created
        else
            render json:{error:"The email is already used"}, status: :not_found
        end
    end

    def update
        pp params
        member = Member.find_by(id: params[:id])
        if member
            member.update(self.pemitted_params)
            render json:member, status: :ok
        else
            render json:{error: "Member not found"}, status: :no_content
        end
    end

    def destroy
        Member.destroy(id: params[:id])
    end

    def contributions
        member = Member.find_by(id:params[:member_id])
        render json: member.contributions, status: :ok
    end

    private
    def pemitted_params
        params.permit(:name, :email, :phone, :physical_address)
    end
end
